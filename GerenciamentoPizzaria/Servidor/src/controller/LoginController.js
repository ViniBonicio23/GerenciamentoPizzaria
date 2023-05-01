const LoginModel =  require('../model/LoginModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class LoginController {
    async auth(req, res) {
        const { email, senha } = req.body
        console.log(email)
        console.log(senha)
        const user = await LoginModel.findOne({ "email": email })

        if (!user) {
            console.log('passou aqui ' + user)
            return res.status(400).json({ error: 'Usuário não encontrado!'})
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta!'})
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        
        return res.json({ user, token })
    }

    async create(req, res) {
        const log = new LoginModel(req.body)
        await log.save().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }
}

module.exports = new LoginController
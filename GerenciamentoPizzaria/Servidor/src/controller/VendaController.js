const VendaModel = require('../model/VendaModel')

class VendaController {
    async create(req, res) {
        const venda = new VendaModel(req.body)
        await venda.save().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async getAll(req, res) {
        await VendaModel.find().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }
}

module.exports = new VendaController
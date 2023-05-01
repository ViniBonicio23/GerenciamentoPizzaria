const CategoriaModel = require('../model/CategoriaModel')

class CategoriaController {
    async create(req, res) {
        const categoria = new CategoriaModel(req.body)
        await categoria.save().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async getAll(req, res) {
        await CategoriaModel.find().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async get(req, res) {
        await CategoriaModel.findOne({ "idCat": req.params.idCat }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async update(req, res) {
        await CategoriaModel.findOneAndUpdate({ "idCat": req.params.idCat }, req.body, { new: true }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async delete(req, res) {
        await CategoriaModel.findOneAndDelete({ "idCat": req.params.idCat }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }
}

module.exports = new CategoriaController
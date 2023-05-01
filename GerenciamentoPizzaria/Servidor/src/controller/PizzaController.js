const PizzaModel = require('../model/PizzaModel')

class PizzaController {
    async create(req, res) {
        const pizza = new PizzaModel(req.body)
        await pizza.save().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async getAll(req, res) {
        await PizzaModel.find().then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async get(req, res) {
        await PizzaModel.findOne({ "id": req.params.id }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async update(req, res) {
        await PizzaModel.findOneAndUpdate({ "id": req.params.id }, req.body, { new: true }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }

    async delete(req, res) {
        await PizzaModel.findOneAndDelete({ "id": req.params.id }).then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            return res.status(500).json(error)
        })
    }
}

module.exports = new PizzaController
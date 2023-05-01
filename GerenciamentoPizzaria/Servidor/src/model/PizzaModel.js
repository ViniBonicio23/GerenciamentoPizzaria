const mongoose = require('../config/database');

const PizzaSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        descricao: { type: String, required: true },
        categoria: { type: String, required: true },
        precoUnitario: { type: Number, required: true }   
    }
)

module.exports = mongoose.model('Pizza', PizzaSchema);
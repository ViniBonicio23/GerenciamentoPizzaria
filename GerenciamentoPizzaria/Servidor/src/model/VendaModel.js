const mongoose = require('../config/database');

const VendaSchema = new mongoose.Schema(
    {
        idVenda: { type: String, required: true },
        produtosVendidos: { type: String, required: true },
        precosPizza: { type: Number, required: true },
        dataVenda: { type: Date, required: true },
        precoTotal: { type: Number, required: true }
    }
)

module.exports = mongoose.model('Venda', VendaSchema);
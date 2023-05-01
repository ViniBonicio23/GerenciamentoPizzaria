const mongoose = require('../config/database');

const CategoriaSchema = new mongoose.Schema(
    {
        idCat: { type: String, required: true },
        categoria: { type: String, required: true }
    }
)

module.exports = mongoose.model('Categoria', CategoriaSchema);
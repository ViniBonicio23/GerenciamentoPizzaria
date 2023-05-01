const mongoose = require('../config/database');

const LoginSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        senha: { type: String, required: true }
    }
)

module.exports = mongoose.model('Login', LoginSchema);
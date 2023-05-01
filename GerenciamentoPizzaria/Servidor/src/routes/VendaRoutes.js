const express = require('express');
const router = express.Router();

const VendaController = require('../controller/VendaController')

router.post('/', VendaController.create)
router.get('/list/getAll', VendaController.getAll)

module.exports = router
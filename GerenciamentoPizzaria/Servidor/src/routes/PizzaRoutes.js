const express = require('express');
const router = express.Router();

const PizzaController = require('../controller/PizzaController')

router.post('/', PizzaController.create)
router.put('/:id', PizzaController.update)
router.delete('/:id', PizzaController.delete)
router.get('/:id', PizzaController.get)
router.get('/list/getAll', PizzaController.getAll)

module.exports = router
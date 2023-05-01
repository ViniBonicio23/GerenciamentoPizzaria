const express = require('express');
const router = express.Router();

const CategoriaController = require('../controller/CategoriaController')

router.post('/', CategoriaController.create)
router.put('/:idCat', CategoriaController.update)
router.delete('/:idCat', CategoriaController.delete)
router.get('/:id', CategoriaController.get)
router.get('/list/getAll', CategoriaController.getAll)

module.exports = router
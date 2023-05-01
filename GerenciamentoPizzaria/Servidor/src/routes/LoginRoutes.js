const express = require('express');
const router = express.Router();

const LoginController = require('../controller/LoginController')

router.post('/login', LoginController.auth)
router.post('/', LoginController.create)

module.exports = router
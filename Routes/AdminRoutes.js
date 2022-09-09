const express = require('express')
const router = express.Router()
const AdminController = require('../Controller/AdminController')

router.post('/adminRegisterPlataform', AdminController.register)
router.post('/adminLoginPlataform', AdminController.login)

module.exports = router;
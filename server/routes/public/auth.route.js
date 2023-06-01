const express = require('express')

// controller functions
const { loginUserCtrl, signupUserCtrl } = require('../../controllers/auth.controller')

const router = express.Router()

// login route
router.post('/login', loginUserCtrl)

// signup route
router.post('/signup', signupUserCtrl)

module.exports = router
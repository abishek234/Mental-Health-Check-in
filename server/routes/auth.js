const express = require('express');
const authcontroller = require('../controllers/authController');
const router = express.Router();

// Register User
router.post('/register',authcontroller.register);


// Login User
router.post('/login',authcontroller.login);

module.exports = router;
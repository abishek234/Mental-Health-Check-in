const express = require('express');
const checkincontroller = require('../controllers/checkinController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create Check-In Entry
router.post('/', authMiddleware, checkincontroller.createcheckin);


// Get Check-Ins for User
router.get('/:userId', authMiddleware,checkincontroller.getcheckin);

module.exports = router;
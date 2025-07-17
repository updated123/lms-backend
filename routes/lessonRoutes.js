const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createLesson } = require('../controllers/lessonController');

router.post('/', protect, createLesson); // Admin-only in real setup

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createQuiz, getQuizById } = require('../controllers/quizController');

router.post('/', protect, createQuiz); // Admin-only
router.get('/:id', protect, getQuizById); // Enrolled users

module.exports = router;

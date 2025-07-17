const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  markLessonComplete,
  submitQuizAttempt,
  getProgress
} = require('../controllers/progressController');

router.post('/complete', protect, markLessonComplete);
router.post('/quiz', protect, submitQuizAttempt);
router.get('/:courseId', protect, getProgress);

module.exports = router;

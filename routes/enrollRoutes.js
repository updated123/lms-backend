const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { enrollInCourse } = require('../controllers/enrollController');

router.post('/:courseId', protect, enrollInCourse);

module.exports = router;

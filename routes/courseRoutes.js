const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createCourse,
  getAllCourses,
  getCourseById
} = require('../controllers/courseController');

router.post('/', protect, createCourse); // Admin-only in real setup
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;

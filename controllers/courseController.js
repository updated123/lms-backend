const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = new Course({ title, description, instructor, price });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons quizzes');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons quizzes');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

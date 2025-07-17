const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

exports.createLesson = async (req, res) => {
  try {
    const { courseId, title, videoUrl, resourceLinks } = req.body;
    const lesson = new Lesson({ courseId, title, videoUrl, resourceLinks });
    await lesson.save();

    // Push to course
    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id }
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

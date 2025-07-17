const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: String,
  videoUrl: String,
  resourceLinks: [String]
});

module.exports = mongoose.model('Lesson', lessonSchema);

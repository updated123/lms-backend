const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

module.exports = mongoose.model('Quiz', quizSchema);

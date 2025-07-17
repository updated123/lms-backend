const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  quizAttempts: [{
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    score: Number,
    attemptDate: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Progress', progressSchema);

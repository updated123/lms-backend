const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  text: String,
  options: [String],
  correctAnswerIndex: Number
});

module.exports = mongoose.model('Question', questionSchema);

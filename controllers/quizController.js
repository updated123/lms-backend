const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Course = require('../models/Course');

exports.createQuiz = async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    
    const quiz = new Quiz({ courseId, title });
    await quiz.save();

    // Save questions
    for (const q of questions) {
      const question = new Question({ ...q, quizId: quiz._id });
      await question.save();
      quiz.questions.push(question._id);
    }
    
    await quiz.save();
    await Course.findByIdAndUpdate(courseId, {
      $push: { quizzes: quiz._id }
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Progress = require('../models/Progress');

exports.markLessonComplete = async (req, res) => {
  const { courseId, lessonId } = req.body;
  const userId = req.user._id;

  try {
    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId, completedLessons: [lessonId] });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitQuizAttempt = async (req, res) => {
  const { courseId, quizId, score } = req.body;
  const userId = req.user._id;

  try {
    let progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      progress = new Progress({ userId, courseId, quizAttempts: [] });
    }

    progress.quizAttempts.push({ quizId, score });
    await progress.save();

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user._id,
      courseId: req.params.courseId
    }).populate('completedLessons quizAttempts.quizId');

    if (!progress) return res.json({ message: 'No progress yet' });

    const totalLessons = progress.completedLessons.length;
    const totalAttempts = progress.quizAttempts.length;

    res.json({ progress, totalLessons, totalAttempts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const User = require('../models/User');
const Course = require('../models/Course');

// const enrollInCourse = async (req, res) => {
//   const { courseId } = req.params;
//   const userId = req.user.id;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     const user = await User.findById(userId);

//     if (user.enrolledCourses.includes(courseId)) {
//       return res.status(400).json({ message: 'Already enrolled in course' });
//     }

//     user.enrolledCourses.push(courseId);
//     await user.save();

//     res.status(200).json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
//   } catch (err) {
//     res.status(500).json({ message: 'Enrollment failed', error: err.message });
//   }
// };

// module.exports = { enrollInCourse };



const enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ensure enrolledCourses is initialized
    if (!Array.isArray(user.enrolledCourses)) {
      user.enrolledCourses = [];
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed', error: err.message });
  }
};
module.exports = { enrollInCourse };
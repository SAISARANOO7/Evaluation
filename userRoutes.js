const express = require ('express');
const User = require('../models/userModel');
const Course = require('../models/courseModel');
const router = express.Router();

router.post('/enroll', async (req, res, next) => {
    try { 
        const { courseId } = req.body;
        const user = await  User.findById(req.user.id);

        if(!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId);

            await user.save();
            res.json({ message: 'Enrollment successful' });
        } else {
            res.status(400).json({ message: 'Already enrolled in this course' });
        }
      }  catch(error) {
            next (error);
        }

});

router.post('/cancel-enrollment', async(req, res, next) => {
    try {
        const { courseId } = req.body;
        const user = await User.findById(req.user.id);

        const index = user.enrolledCourses.indexOf(courseId);
        if(index > -1) {
            user.enrolledCourses.splice(index, 1);
            await user.save();
            res.json({ message: 'Cancellation successful' });

        } else {
            res.status(400).json({ message: 'Not enrolled in this course' });
        }
        } catch (error) {
            next(error);
        }
});

router.get('/my-courses', async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('enrolledCourses');
        res.json({ courses: user.enrolledCourses });
    } catch (error) {
        next (error);
    }
});
module.exports = router;
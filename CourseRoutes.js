const express = require('express');
const Course = require('../models/courseModel');
const router = express.Router();


router.get('/', async (req,res, next) => {
    try {
        const { page = 1, limit = 10, category, difficulty } = req.query;
        const filters = {};
        if(category) filters.category = category;
        if(difficulty) filters.difficulty = difficulty;

        const courses = await Course.find(filters)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        res.json({ courses });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
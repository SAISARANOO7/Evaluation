const mongoose = require ('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    category: String,
    difficulty: String,
    description: String
});

const course = mongoose.model('Course', courseSchema);

module.exports = Course;
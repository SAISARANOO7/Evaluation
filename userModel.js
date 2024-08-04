const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    enrolledCourses: [{ type: mongoose.schema.Types.ObjectId, ref: 'Course'}]
});

const user = mongoose.model('User', userSchema);

module.exports = User;
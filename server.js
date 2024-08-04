const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('mprgan');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const  { errorHandler } = require('./middlewares/errorHandler');
const { authenticateToken } = require('./middlewares/authenticateToken');

const app = express();

mongoose.connect('mongodb://localhost:27017/online-course', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

}).catch(err => {
    console.error('Failed to connect to MPngoDB', err);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/courses', courseRoutes);
app.use('/users', authRoutes);
app.use(authenticateToken);
app.use('/users', userRoutes);

app.use(errorHandler);

const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
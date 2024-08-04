const express = require ('express');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try { 
        const { username, password } = req.body;
        const hashedPassword = await brcypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByOne( username );
        if(!user) return res.status(401).json({ message: 'Invalid username or password' })

       const isMatch = await brcypt.compare(password, user.password);
       if(!isMatch) return res.status(401).json({ message: 'Invalid username or password'})

       const token = jwt.sign({ id: user.id_id }, 'your_jwt_secret');
       res.json({ token });
} catch (error) {
    next(error);
};
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// User signup
router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, phoneno } = req.body;
        const newUser = new User({ email, password, phoneno });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

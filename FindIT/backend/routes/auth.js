const express = require('express');
const router = express.Router();
const User = require('../models/User');

const phoneRegex = /^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@iittp\.ac\.in$/;

router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        let { email, password, phoneno } = req.body;
        email = email.trim();
        phoneno = phoneno.trim();
        password = password.trim();

        if (!phoneRegex.test(phoneno)) {
            return res.status(400).json({ error: 'Phone number must be exactly 10 digits long' });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email must end with @iittp.ac.in' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ email, password, phoneno });
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        let { email, password } = req.body;
        console.log(req.body);

        email = email.trim();
        password = password.trim();

        // let user;

        // Determine if the input is an email or phone number and find the user accordingly
        if (emailRegex.test(email)) {
            user = await User.findOne({ email: email });
        } else if (phoneRegex.test(email)) {
            user = await User.findOne({ phoneno: email });
        } else {
            return res.status(400).json({ error: 'Invalid email or phone number format' });
        }
        // console.log(email);
        // let user = await User.findOne({ email: email });
        // console.log(user);

        // Check if the user exists and if the password is correct
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

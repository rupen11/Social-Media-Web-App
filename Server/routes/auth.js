const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Generate Password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        // Create User
        const user = new User({ username, email, password: hashPass });

        // Save User
        const saveUser = await user.save();

        if (!saveUser) return res.status(400).json("User Account Not Created");
        const jwtToken = jwt.sign(saveUser._id, process.env.JWT_SECRETKEY);
        return res.status(200).json(jwtToken);
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json(error);
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    console.log(req.body.email);
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json("User Not Found");

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json("Password Invalid");

        const data = {
            id: user._id
        }

        const jwtToken = jwt.sign(data, process.env.JWT_SECRETKEY);
        console.log("Login Done");
        return res.status(200).json({ jwtToken, user });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json("Some error to login user " + error);
    }
})

module.exports = router;
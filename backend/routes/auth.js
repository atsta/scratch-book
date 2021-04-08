const router = require('express').Router(); 
const { restart } = require('nodemon');
const User = require('../models/User');
const {register_validation, login_validation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    //input validation
    const validation_result = register_validation(req.body); 
    if (validation_result.error) 
        return res.status(400).send(validation_result.error.details[0].message);

    //check if email already exists
    const exists = await User.findOne({email: req.body.email});
    if (exists) 
        return res.status(400).send("Email already exists");

    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: hashed
    });
    try {
        const user_save = await user.save();
        res.send({ user: user_save._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //input validation
    const validation_result = login_validation(req.body); 
    if (validation_result.error) 
        return res.status(400).send(validation_result.error.details[0].message);

    //check if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) 
        return res.status(400).send("User does not exist");

    //check if password is correct
    const is_valid = await bcrypt.compare(req.body.password, user.password);
    if(!is_valid) 
        return res.status(400).send("Invalid password");

    //user token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    //return res.send("Logged in successfully!");
});

module.exports = router;
const router = require('express').Router(); 
const { restart } = require('nodemon');
const User = require('../models/User');
const {register_validation, login_validation} = require('../validation');


router.post('/register', async (req, res) => {
    //input validation
    const validation_result = register_validation(req.body); 
    if (validation_result.error) return res.status(400).send(validation_result.error.details[0].message);

    //check if email already exists
    const exists = await User.findOne({email: req.body.email});
    if (exists) return res.status(400).send("Email already exists");

    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    });
    try {
        const user_save = await user.save();
        res.send(user_save);
    } catch(err) {
        res.status(400).send(err);
    }
});

//router.post('/login')

module.exports = router;
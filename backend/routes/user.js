const router = require('express').Router(); 
const verify = require('./verification');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const removed_user = await User.deleteOne({ _id: req.params.userId });
        res.json(removed_user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:userId', async (req, res) => {
    try {
        const updated_user = await User.updateOne(
            { _id: req.params.userId }, 
            { $set: { name: req.body.name }}
        );
        res.json(updated_user);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
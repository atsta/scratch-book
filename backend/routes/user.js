const router = require('express').Router(); 
const verify = require('./verification');
const User = require('../models/User');
const { update } = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const verified = verify(req, res);

        const users = await User.find();

        return res.json(users);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const verified = verify(req, res);

        const user = await User.findById(req.params.userId);
        if (user == null) {
            return res.json({ message: "User does not exist" });
        }

        return res.json(user);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const verified = verify(req, res);

        const user = await User.findById(req.params.userId);
        if (user == null) {
            return res.json({ message: "User does not exist" });
        }

        const removed_user = await User.deleteOne({ _id: user._id });

        return res.json(removed_user);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const verified = verify(req, res);

        const user = await User.findById(req.params.userId);
        if (user == null) {
            return res.json({ message: "User does not exist" });
        }

        await User.updateOne(
            { _id: user._id }, 
            { $set: { name: req.body.name }}
        );

        const updated_user = await User.findById(req.params.userId);

        return res.json( {id: updated_user._id, 
                    new_name: updated_user.name } );
    } catch (err) {
        return res.json({ message: err });
    }
});

module.exports = router;
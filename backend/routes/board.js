const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.status(400).send(validation_result.error.details[0].message);

    //check if title already exists
    const exists = await Board.findOne({title: req.body.title});
    if (exists) 
        return res.status(400).send("Title already exists");

    const board = new Board({
        title: req.body.title, 
        is_public: req.body.is_public
    });
    
    try {
        const board_save = await board.save();

        //connect new board to the user 
        await User.updateOne(
            { _id: verified._id },  
            { $push: { owned : board_save._id }}
        );

        res.send({ board: board_save._id });
        
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;
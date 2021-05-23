const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get the ratings of a board
router.get('/:boardId', async (req, res) => {  
    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        return res.json({ board_id: board._id,
            ratings: board.ratings });
    } catch (err) {
        return res.json(err);
    }
 });

 //add a rating to a board
router.post('/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        await Board.updateOne(
            { _id: board._id },  
            { $push: { ratings : {
                        user: verified.sub,
                        rating: req.body.rating
                    }
                }
            }
        );
                
        return res.json({ board_id: board._id});   
    } catch(err) {
        return res.json(err);
    }
});

 module.exports = router;
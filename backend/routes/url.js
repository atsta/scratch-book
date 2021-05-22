const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//add a url to a board
router.post('/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            res.json({ message: "Board does not exist" });

        //check if user owns the board
        const user = await User.findOne({_id: verified.sub});

        if (!user.owned.includes(board._id)) 
            return res.json({ message:"Does not own the board" });

        await Board.updateOne(
            { _id: board._id },  
            { $push: { webpages : {
                        url: req.body.url,
                        comment: req.body.comment
                    }
                }
            }
        );
                
        res.json({ board_id: board._id});   
    } catch(err) {
        res.json(err);
    }
});

//get the urls of a board
router.get('/:boardId', async (req, res) => {  
    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            res.json({ message: "Board does not exist" });

        res.json({ board_id: board._id,
            URLS: board.webpages });
    } catch (err) {
        res.json(err);
    }
 });

module.exports = router;
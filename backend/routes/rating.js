const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get the ratings of a board
router.get('/:boardId', async (req, res) => {  
    const verified = verify(req, res);

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

 //get the rating of a board for the user
router.get('/user/:boardId', async (req, res) => {  
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });
        if (user == null) 
            return res.json({ message: "User does not exist" });

        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });
        
        var user_rating = 0;
        for(var board_rating of board.ratings) {
            if(board_rating.user == user._id) {
                user_rating = board_rating.rating;
                break;
            }
        }

        return res.json({ board_id: board._id,
            rating: user_rating });
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
        
        const board_ratings = board.ratings;
        for (i = 0; i < board_ratings.length; i++) {
            if(board_ratings[i].user == verified.sub) {
                board_ratings[i].rating = req.body.rating;

                await Board.updateOne(
                    { _id: board._id },  
                    { ratings: board_ratings });
                
                return res.json({ board_id: board._id});   
            }
        }        
        
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

//get total rating of a board
router.get('/total/:boardId', async (req, res) => {  
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        var sum = 0;
        for(var board_rating of board.ratings) {
            sum = sum + board_rating.rating;
        }

        return res.json({ board_id: board._id,
            total: sum/board.ratings.length });
    } catch (err) {
        return res.json(err);
    }
 });

 module.exports = router;
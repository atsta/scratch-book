const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//add new board
router.post('/add', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.status(400).send(validation_result.error.details[0].message);

    try {
        //check if title already exists
        const exists = await Board.findOne({ title: req.body.title });
        if (exists) 
            return res.status(400).send("Title already exists");

        const board = new Board({
            title: req.body.title, 
            is_public: req.body.is_public
        });

        const board_save = await board.save();

        //connect new board to the user 
        await User.updateOne(
            { _id: verified.sub },  
            { $push: { owned : board_save._id }}
        );

        res.send({ board: board_save._id, user: verified.sub });
        
    } catch(err) {
        res.status(400).send(err);
    }
});

router.delete('/delete', async (req, res) => {    
    const verified = verify(req, res);

    try {
        //check if title already exists
        const board = await Board.findOne({ title: req.body.title });
        if (!board) 
            return res.status(400).send("Board does not exist");
    
        const board_delete = await board.deleteOne({ title: req.body.title });

        //todo: remove references and check ownership
        
    } catch(err) {
        res.status(400).send(err);
    }
});

router.patch('/update/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.status(400).send(validation_result.error.details[0].message);

    //todo: remove references and check ownership
    
    // if (!verified.owned.includes(req.params.boardId)) 
    //     return res.status(400).send("Does not own this board");

    try {
        //check if title already exists
        const board = await Board.findOne({ _id: req.params.boardId });
        if (!board) 
            return res.status(400).send("Board does not exist");
    
        const board_update = await board.updateOne(
                            { title: req.body.title }, 
                            { is_public: req.body.is_public});
 
        res.send({ board: board_update._id });
        
    } catch(err) {
        res.status(400).send(err);
    }
});

//follow a board
router.post('/follow', async (req, res) => {    
    const verified = verify(req, res);

    try {
    //check if title already exists
    const board = await Board.findOne({title: req.body.title});

    if (!board)
        return res.status(400).send("Board does not exist");

    const user = await User.findOne({_id: verified.sub});

    if (user.followed.includes(board._id)) 
        return res.status(400).send("Already following this board");

    //connect new board to the user 
    await User.updateOne(
        { _id: verified.sub },  
        { $push: { followed : board._id }}
    );
    
    res.send({ board: board._id, user: verified.sub });
    
    } catch(err) {
        res.status(400).send(err);
    }
});

//boards followed by a user
router.get('/followed', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({_id: verified.sub});

        if (!user.followed)
            res.send("Does not follow any board");

        res.send({ following: user.followed });

    } catch (err) {
        res.json({ message: err });
    }
});

//boards owned by a user
router.get('/owned', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({_id: verified.sub});
        
        if (!user.owned)
            res.send("Does not own any board");

        res.send({ owning: user.owned });

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
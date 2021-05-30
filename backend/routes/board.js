const router = require('express').Router(); 
const { new_board_validation } = require('../validation');
const verify = require('./verification');
const Board = require('../models/Board');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get a board by id
router.get('/get/:boardId', async (req, res) => {
    const verified = verify(req, res);

    try {
        const verified = verify(req, res);

        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        return res.json({  title: board.title, 
                    is_public: board.is_public, 
                    comment: board.comment,
                    webpages: board.webpages, 
                    ratings: board.ratings });

    } catch (err) {
        return res.json({ error: err });
    }
});

//add new board
router.post('/', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.json({ message: validation_result.error.details[0].message });

    try {
        //check if title already exists
        const exists = await Board.findOne({ title: req.body.title });
        if (exists) 
            return res.json({ message: "Title already exists" });

        const board = new Board({
            title: req.body.title, 
            is_public: req.body.is_public,
            comment: req.body.comment
        });

        const board_save = await board.save();

        //connect new board to the user 
        await User.updateOne(
            { _id: verified.sub },  
            { $push: { owned : board_save._id }}
        );

        return res.json({ board: board_save._id, 
                    user: verified.sub });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

router.delete('/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (!board) 
            return res.json({ message: "Board does not exist" });
        
        const user = await User.findOne({ _id: verified.sub });
        if(!user.owned.includes(board._id)) {
            return res.json({ message: "Does not own the board" });
        }

        const board_delete = await board.deleteOne({ _id: req.params.boardId });
        return res.json({ deleted_id: req.params.boardId });

        //todo: remove references
        
    } catch(err) {
        return res.json({ error: err });
    }
});

router.put('/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    //input validation 
    const validation_result = new_board_validation(req.body); 
    if (validation_result.error) 
        return res.json({ message: validation_result.error.details[0].message });
    //todo: remove references and check ownership
    
    // if (!verified.owned.includes(req.params.boardId)) 
    //     return res.status(400).send("Does not own this board");

    try {
        //check if title already exists
        var board = await Board.findOne({ title: req.body.title });
        if (board) 
            return res.json({ message: "Title already exists" });

        board = await Board.findOne({ _id: req.params.boardId });

        var board_update = await board.updateOne( {
                                title: req.body.title,
                                is_public: req.body.is_public, 
                                comment: req.body.comment});

        return res.json({ board: board._id });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

//follow a board
router.post('/follow', async (req, res) => {    
    const verified = verify(req, res);

    try {
        //check if title already exists
        const board = await Board.findOne({title: req.body.title});

        if (!board)
            return res.json({ message: "Board does not exist" });

        const user = await User.findOne({_id: verified.sub});

        if (user.followed.includes(board._id)) 
            return res.json({ message: "Already following this board" });

        //connect new board to the user 
        await User.updateOne(
            { _id: verified.sub },  
            { $push: { followed : board._id }}
        );
        
        return res.json({ board: board._id, 
                    user: verified.sub });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

//unfollow a board
router.post('/unfollow', async (req, res) => {    
    const verified = verify(req, res);

    try {
        //check if title already exists
        const board = await Board.findOne({ title: req.body.title });

        if (!board)
            return res.json({ message: "Board does not exist" });

        const user = await User.findOne({_id: verified.sub});

        const followed_boards = user.followed;

        if (!followed_boards.includes(board._id)) 
            return res.json({ message: "User does not follow this board" });
                
        for (i = 0; i < followed_boards.length; i++) {
            if (followed_boards[i].equals(board._id)) {
                followed_boards.splice(i, 1); 
                break;
            }
        }

        await User.updateOne(
            { _id: verified.sub },  
            {  followed : followed_boards }
        );
        
        return res.json({ board: board._id, 
                    user: verified.sub });
        
    } catch(err) {
        return res.json({ error: err });
    }
});

//boards followed by a user
router.get('/followed', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });

        if (!user.followed)
            return res.json({ message: "Does not follow any board" });
        
        const followed_boards = [];
        for (const board_id of user.followed) {
            const board = await Board.findOne({ _id: board_id });
            if (board != null)
                followed_boards.push(board);
        }

        return res.json({ following: followed_boards });


    } catch (err) {
        return res.json({ message: err });
    }
});

//boards owned by a user
router.get('/owned', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });
        
        if (!user.owned)
            return res.json({ message: "Does not own any board" });

        const owning_boards = [];
        for (const board_id of user.owned) {
            const board = await Board.findOne({ _id: board_id });
            if (board != null)
                owning_boards.push(board);
        }

        return res.json({ owning: owning_boards});

    } catch (err) {
        return res.json({ message: err });
    }
});

//boards shared with a user
router.get('/shared', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });
        
        if (!user.owned)
            return res.json({ message: "Does not own any board" });

        const shared_boards = [];
        for (const board_id of user.shared_with) {
            const board = await Board.findOne({ _id: board_id });
            if (board != null)
                shared_boards.push(board);
        }

        return res.json({ shared_with: shared_boards});

    } catch (err) {
        return res.json({ message: err });
    }
});

//share a board with a user 
router.put('/share/:boardId', async (req, res) => {
    const verified = verify(req, res);

    try {
        const user = await User.findOne({ _id: verified.sub });
        if (!user.owned)
            return res.json({ message: "Does not own any board" });
        
        const receiver = await User.findOne({ email: req.body.email });
        if (receiver == null)
            return res.json({ message: "Receiver user does not exist" });
        
        if(receiver.shared_with.includes(req.params.boardId))
            return res.json({ message: "Board already shared with this user" });

        board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });
    
        await User.updateOne(
            { _id: receiver._id },  
            { $push: { shared_with : board._id }}
        );

        return res.json({ board_shared: req.params.boardId });

    } catch (err) {
        return res.json({ message: err });
    }
});

//get public boards
router.get('/public', async (req, res) => {
    const verified = verify(req, res);

    try {
        const public_boards = await Board.find({ is_public: true });
        
        return res.json(public_boards);
    } catch (err) {
        return res.json(err);
    }
});

//search by title, case sensitive
router.get('/search', async (req, res) => {  
    const verified = verify(req, res);

    try {
        const title_param = req.query.title;

        const search_result = [];
        const public_boards = await Board.find({ is_public: true });
        for(var board of public_boards) {
            if(board.title.includes(title_param)) {
                search_result.push(board);
            }
        }

        return res.json(search_result);
    } catch (err) {
        return res.json(err);
    }
 });

module.exports = router;
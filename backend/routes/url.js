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
            return res.json({ message: "Board does not exist" });

        //check if user owns the board
        const user = await User.findOne({ _id: verified.sub });

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
                
        return res.json({ board_id: board._id});   
    } catch(err) {
        return res.json(err);
    }
});

//get the urls of a board
router.get('/:boardId', async (req, res) => {  
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        return res.json({ board_id: board._id,
            URLS: board.webpages });
    } catch (err) {
        return res.json(err);
    }
 });

 //remove a url from a board 
 router.put('/:boardId', async (req, res) => {  
    const verified = verify(req, res);

    try {
        var board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });
        
        const pos = req.body.position;
        if(pos >= board.webpages.length)
            return res.json({ message: "Webpage out of bounds"});

        var urls = board.webpages;
        urls.splice(req.body.position, 1); 

        await Board.updateOne(
            { _id: board._id },  
            { webpages : urls }
        );
        
        board = await Board.findOne({ _id: req.params.boardId });

        return res.json({ board_id: board._id,
                        URLS: board.webpages });
    } catch (err) {
        return res.json(err);
    }
 });

 //update a url
router.put('/editUrl/:boardId', async (req, res) => {    
    const verified = verify(req, res);

    try {
        const board = await Board.findOne({ _id: req.params.boardId });
        if (board == null) 
            return res.json({ message: "Board does not exist" });

        const user = await User.findOne({ _id: verified.sub });
        if (!user.owned.includes(board._id)) 
            return res.json({ message:"Does not own the board" });

        const pos = req.body.position;
        if(pos >= board.webpages.length)
            return res.json({ message: "Webpage out of bounds"});

        var edited_webpages = board.webpages;
        edited_webpages[pos].url = req.body.url;
        edited_webpages[pos].comment = req.body.comment;

        await Board.updateOne(
            { _id: board._id },  
            { webpages: edited_webpages}
        );
                
        return res.json({ board_id: board._id});   
    } catch(err) {
        return res.json(err);
    }
});

module.exports = router;
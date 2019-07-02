const Board = require('../../models/feedback_forum/Board');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

createBoard = (req, res) => {
    const { name, productID, url } = req.body;
    let board = new Board(
        {
            name,
            created: new Date(),
            numPosts: 0
        }
    );
    if (productID) board.product = ObjectId(productID) 
    if (url) board.url = url;
    board.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

getBoard = (req, res) => {
    Board.findById(req.params.id, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

editBoard = (req, res) => {
    const { name, productID, id } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (productID) update.product = ObjectId(productID);
    Board.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

deleteBoard = (req, res) => {
    const { id } = req.params;
    Board.findByIdAndRemove(id, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}



module.exports = {createBoard, getBoard, editBoard, deleteBoard}
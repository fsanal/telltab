const Board = require('../../models/feedback_forum/Board');
var mongoose = require('mongoose')

createBoard = (req, res) => {
    const { boardName, roadmapIDs, url } = req.body;
    let board = new Board(
        {
            name: boardName,
            created: new Date(),
            numPosts: 0
        }
    );
    if (roadmapIDs !== undefined) {
        board.roadmapIDs = roadmapIDs;
    }
    if (url !== undefined) {
        board.url = url;
    }

    board.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

getBoard = (req, res) => {
    Board.findById(req.query.boardID, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

editBoard = (req, res) => {
    const { boardName, boardID } = req.body;
    let update = {};
    if (boardName) update.boardName = boardName; 
    Board.findByIdAndUpdate(req.query.boardID, {$set: update}, {new: true}, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

deleteBoard = (req, res) => {
    const { boardID } = req.param;
    Board.findByIdAndRemove(boardID, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

addRoadMap = (req, res) => {
    const { boardID } = req.param;
    const { roadmapID } = req.query.roadmapID;
    let update = {};
    if (roadmapID) update.roadmapIDs = roadmapID;
    Board.findByIdAndUpdate(req.query.boardID, {$push: update}, {new: true}, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}

deleteRoadMap = (req, res) => {
    const { boardID } = req.param;
    const { roadmapID } = req.query.roadmapID;
    let update = {};
    if (roadmapID) update.roadmapIDs = roadmapID;
    Board.findByIdAndUpdate(req.query.boardID, {$pull: update}, {new: true}, (err, board) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(board);
    });
}


module.exports = {createBoard, getBoard, editBoard, deleteBoard, addRoadMap, deleteRoadMap}
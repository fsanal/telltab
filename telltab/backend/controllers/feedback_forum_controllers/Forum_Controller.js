const Forum = require('../../models/feedback_forum/Forum');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

createForum = (req, res) => {
    const { name, productID, url } = req.body;
    let forum = new Forum(
        {
            name,
            created: new Date(),
            numPosts: 0
        }
    );
    if (productID) forum.product = ObjectId(productID) 
    if (url) forum.url = url;
    forum.save((err, forum) => {
        if (err) return res.json({ success: false, error: err });
        forum.populate('product', (err, forum) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(forum);
        });
    });
}

getForum = (req, res) => {
    Forum.findById(req.params.id).populate('product').exec(function(err, forum) {
        if (err) return res.json({ success: false, error: err });
        return res.json(forum);
    });
}

getProductForum = (req, res) => {
    const { productID } = req.body;
    let query = Forum.find();
    query.where('product').equals(productID);
    query.exec((err, forum) => {
		if (err) return res.json({success: false, error: err });
		forum.populate('product', (err, forum) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(forum);
        });
	});
}

editForum = (req, res) => {
    const { id } = req.params;
    const { name, productID } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (productID) update.product = ObjectId(productID);
    Forum.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, forum) => {
        if (err) return res.json({ success: false, error: err });
        forum.populate('product', (err, forum) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(forum);
        });
    });
}

deleteForum = (req, res) => {
    const { id } = req.params;
    Forum.findByIdAndRemove(id, (err, forum) => {
        if (err) return res.json({ success: false, error: err });
        forum.populate('product', (err, forum) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(forum);
        });
    });
}



module.exports = {createForum, getForum, editForum, deleteForum, getProductForum }
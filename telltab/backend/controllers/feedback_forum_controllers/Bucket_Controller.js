const Bucket = require('../../models/feedback_forum/Bucket');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

createBucket = (req, res) => {
    const { name, forumID, url } = req.body;
    let bucket = new Bucket(
        {
            name: name,
            forum: ObjectId(forumID),
            created: new Date(),
            numPosts: 0
        }
    );
    if (url) bucket.url = url;
    bucket.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}


getBucket = (req, res) => {
    Bucket.findById(req.params.id).populate('forum').exec(function(err, bucket) {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

editBucket = (req, res) => {
    const { id } = req.params;
    const { name, url } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (url) update.url = url
    Bucket.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, bucket) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

deleteBucket = (req, res) => {
    const { id } = req.params;
    Bucket.findByIdAndRemove(id, (err, bucket) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

module.exports = { createBucket, getBucket, editBucket, deleteBucket }
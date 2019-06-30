const Bucket = require('../../models/feedback_forum/Bucket');
var mongoose = require('mongoose')

createBucket = (req, res) => {
    const { bucketName, boardID, url } = req.body;
    let bucket = new Bucket(
        {
            name: bucketName,
            boardID: boardID,
            created: new Date(),
            numPosts: 0
        }
    );
    if (url !== undefined) bucket.url = url;
    bucket.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}


getBucket = (req, res) => {
    Bucket.findById(req.param.bucketID, (err, bucket) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

editBucket = (req, res) => {
    const { bucketName, bucketID, url } = req.body;
    let update = {};
    if (bucketName) update.bucketName = bucketName; 
    if (url) update.url = url
    Bucket.findByIdAndUpdate(bucketID, {$set: update}, {new: true}, (err, bucket) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

deleteBucket = (req, res) => {
    const { bucketID } = req.param;
    Bucket.findByIdAndRemove(bucketID, (err, bucket) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(bucket);
    });
}

module.exports = { createBucket, getBucket, editBucket, deleteBucket }
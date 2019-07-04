const Post = require('../../models/feedback_forum/Post');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;
const mongoosastic = require('mongoosastic');
const fetch = require('node-fetch');

createPost = (req, res) => {
    const { forumID, bucketID, authorID, visibilityIDs, personaID, tagIDs, assignmentIDs,
        title, body, progress, requirementIDs, url } = req.body;
    let post = new Post(
        {
            title,
            forum: ObjectId(forumID),
            author: ObjectId(authorID),
            created: new Date(),
            numComments: 0,
            numVotes: 0
        }
    );
    if (url) post.url = url;
    if (body) post.body = body;
    if (bucketID) post.bucket = ObjectId(bucketID);
    if (visibilityIDs) {
        post.visibility = visibilityIDs.map(visibilityID => ObjectId(visibilityID))
    }
    if (personaID) post.persona = ObjectId(personaID);
    if (tagIDs) {
        post.tags = tagIDs.map(tagID => ObjectId(tagID));
    }
    if (assignmentIDs) {
        post.assignments = assignmentIDs.map(assignmentID => ObjectId(assignmentID));
    } 
    if (progress) post.progress = progress;
    if (requirementIDs) {
        post.requirements = requirementIDs.map(requirementID => ObjectId(requirementID));
    }
    post.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

getPost = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

/// What if the bucket is not in the forumID specified?

editPost = (req, res) => {
    const { id } = req.params;
    const { title, body, progress, forumID, bucketID, personaID, url } = req.body;
    let update = {};
    if (title) update.title = title;
    if (body) update.body = body;
    if (progress) update.progress = progress;
    if (forumID) update.forum = ObjectId(forumID);
    if (bucketID) update.bucket = ObjectId(bucketID); 
    if (personaID) update.persona = ObjectId(personaID);
    if (url) update.url = url
    Post.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.remove((err) => {
            if (err) return res.json({ success: false, error: err });
        });
        return res.json(post);
    });
}

retrievePosts = (req, res) => {
    let { forumID, authorID, bucketID,
    search, personaID, visibilityIDs, tagIDs, assignmentIDs, 
    sort, progress, limit, skip } = req.query;
    let data = { "query": { "query_string" : { "query" : "please" }}};
    var url = 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443/posts/_search';
    
    fetch(url, {method: 'post', 
                body: JSON.stringify(data), 
                headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
    .then((response) => {return console.log('Success:', JSON.stringify(response))})
    .catch(error => console.error('Error:', error));
    

/*
 $.ajax({
      url: {endpoint}/_search,
      dataType: 'jsonp',
      success: function(data) {
        alert('Total results found: ' + data.hits.total)
      }
    });


$.ajax({
    type: "POST",
    url: "https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:44/posts/_search",
    data: {
      api_key: "xxxxxxxx"
    },
    success: function(data) {
      console.log(data);
      //do something when request is successfull
    },
    dataType: "json"
  });

Post.search(null, (err,results) => {
    if (err) return res.json(err);
    return res.json(results)
});
*/
    /*

    Post.search(
        { query_string: { query: "please" }}, (err,results) => {
        if (err) return res.json(err);
        return res.json(results)
    });
    */
    /*
    Post.search(null, {
        suggest: {
            "post-suggest": {
                "text": search,
                "completion": {
                    "fields": ["title", "body"]
                }
            }
        },
        "size" : 0
    }, (err, results) => {
        if (err) return res.json({ success: false, error: err });;
        return console.log(JSON.stringify(results, null, 4));
    });
    */
    /*
    let query;
    console.log(search);
    if (search) query = Post.find({
        "$or": [
            { "title" : { "$regex": search, "$options":"i"} },
            { "body" :   { "$regex": search, "$options":"i"} }
        ]
    }); else query = Post.find();
    */
    /*
     "$or": [
            { "title" : { "$regex": search, "$options":"i"} },
            { "body" :   { "$regex": search, "$options":"i"} }
        ]
{ $text: {$search: "/" + search + "/"}},
        { score: {$meta: "textScore"}}

    if (forumID) query.where('forum').equals(forumID);
    if (authorID) query.where('author').equals(authorID);
    if (bucketID) query.where('bucket').equals(bucketID);
    //if (personaID) query.where('persona').equals(personaID);
    if (visibilityIDs) query.where('visibility').all(visibilityIDs);
    if (tagIDs) query.where('tags').all(tagIDs);
    if (assignmentIDs) query.where('assignments').all(assignmentIDs);
    if (progress) query.where('progress').equals(progress);
    if (limit) query.limit(limit);
    if (skip) query.skip(skip);
    */
   /*
    query.exec( (err, posts) => {
        if (err) return res.json({success: false, error: err });
        return res.json(posts);
    });
    */
}

addVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

removeVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}


addTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

assignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deassignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

addRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}


module.exports = { createPost, getPost, editPost, deletePost, 
    addVisibility, removeVisibility, addTag, deleteTag, addRequirement, 
    deleteRequirement, assignPost, deassignPost, retrievePosts }
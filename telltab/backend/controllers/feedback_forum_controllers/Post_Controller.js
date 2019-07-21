const { Post, esClient } = require('../../models/feedback_forum/Post');
const Comment = require('../../models/Comment');
const Vote = require('../../models/feedback_forum/Vote');
const Tag = require('../../models/Tag');
const Requirement = require('../../models/roadmap/Requirement');
const CustomField = require('../../models/CustomField');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const mongoosastic = require('mongoosastic');
const fetch = require('node-fetch');

createPost = (req, res) => {
    const { forumID, bucketID, authorID, visibilityIDs, personaIDs, tagIDs, assignmentIDs,
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
    if (personaIDs) post.personas = personaIDs.map(personaID =>ObjectId(personaID));
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
    post.save((err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

getPost = (req, res) => {
    Post.findById(req.params.id).populate('forum').populate('bucket').populate('personas')
    .populate('author').populate('visibility').populate('requirements').populate('assignments')
    .populate('tags').populate('roadmap').exec(function(err, post) {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

/// What if the bucket is not in the forumID specified?

editPost = (req, res) => {
    const { id } = req.params;
    const { title, body, progress, forumID, bucketID, personaIDs, url, numVotes } = req.body;
    let update = {};
    if (title) update.title = title;
    if (body) update.body = body;
    if (progress) update.progress = progress;
    if (forumID) update.forum = ObjectId(forumID);
    if (bucketID) update.bucket = ObjectId(bucketID); 
    if (numVotes !== undefined) update.numVotes = numVotes;
    if (url) update.url = url
    Post.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas')
        .populate('author').populate('visibility').populate('requirements').populate('assignments')
        .populate('tags').populate('roadmap', (err, post) => {
            if (err) return res.json(err);
            return res.json(post);
        });
    });
}

deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            fields = post.customFields;
            for (const fieldID of fields) {
                CustomField.findByIdAndRemove(fieldID, (err, field) => {
                    if (err) return res.json({ success: false, error: err });
                });
            }
            return res.json(post);
        });
    });
}



retrievePosts = (req, res) => {
    let { forumID, authorID, bucketID, personas, 
        visibilityIDs, tagIDs, assignmentIDs, 
        sort, progress, limit, skip, search } = req.body;
    let query, aggregate;
    
    if ( search ) {
        let body = {};
        body.query = {
            "bool": {
                "should": [
                    { "match": 
                        { "title": 
                            { "query": search,
                            "fuzziness": "AUTO",
                            "max_expansions": 10,
                            "boost": 2.0
                            }
                        }
                    },
                    { "match": 
                        { "body": 
                            { "query": search,
                            "fuzziness": "AUTO",
                            "max_expansions": 10
                            }
                        }
                    },
                ],
                minimum_should_match: 1
            }
        };
        body.query.bool.filter = [];
        if (forumID) body.query.bool.filter.push({ "term": { "forum": forumID }});
        if (authorID) body.query.bool.filter.push({ "term": { "author": authorID }});
        if (bucketID) body.query.bool.filter.push({ "term": { "bucket": bucketID }});
        if (visibilityIDs) body.query.bool.filter.push({ "terms": { "visibility": visibilityIDs }});
        if (tagIDs) body.query.bool.filter.push({  "terms": { "tags": tagIDs }});
        if (personas) body.query.bool.filter.push({  "terms": { "personas": personaIDs }});
        if (assignmentIDs) body.query.bool.filter.push({  "terms": { "assignments": assignmentIDs }});
        if (progress) body.query.bool.filter.push({ "term": { "progress": progress }});
        if (skip) body.from = Number(skip);
        if (limit) body.size = Number(limit);  
        esClient.search({
            index: 'posts',
            body: body
        }, (err, response, status) => {
            if (err) return res.json(err)
            idArr = response.hits.hits.map(hit => ObjectId(hit._id));   
            aggregate = Post.aggregate();
            aggregate.match({ _id : { $in: idArr }});
            aggregate.addFields({ ordering : { $indexOfArray : [ idArr, "$_id" ]}});
            aggregate.sort({ ordering : 1 });
            aggregate.exec( (err, posts) => {
                if (err) return res.json({success: false, error: err });
                Post.populate(posts, {path: "forum bucket personas author visibility requirements assignments tags roadmap"}, (err, posts) => {
                    if (err) return res.json({success: false, error: err });
                    return res.json(posts);
                });
            });
        });
    } else {
        query = Post.find();
        if (forumID) query.where('forum').equals(forumID);
        if (authorID) query.where('author').equals(authorID);
        if (bucketID) query.where('bucket').equals(bucketID);
        //if (personaID) query.where('persona').equals(personaID);
        if (visibilityIDs) query.where('visibility').all(visibilityIDs);
        if (tagIDs) query.where('tags').all(tagIDs);
        if (assignmentIDs) query.where('assignments').all(assignmentIDs);
        if (progress) query.where('progress').equals(progress);
        if (limit) query.limit(Number(limit));
        if (skip) query.skip(Number(skip));
        query.populate('forum').populate('bucket').populate('personas')
        .populate('author').populate('visibility').populate('requirements').populate('assignments')
        .populate('tags').populate('roadmap').exec( (err, posts) => {
            if (err) return res.json({success: false, error: err });
            return res.json(posts);
        });
    }
}

addPersona = (req, res) => {
    const { id } = req.params;
    const { personaID } = req.body;
    let update = {};
    if (personaID) update.personas = ObjectId(personaID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

deletePersona = (req, res) => {
    const { id } = req.params;
    const { personaID } = req.body;
    let update = {};
    if (personaID) update.personas = ObjectId(personaID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}


addVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

removeVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}


addTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas')
        .populate('author').populate('visibility').populate('requirements').populate('assignments')
        .populate('tags').populate('roadmap', (err, post) => {
            if (err) return res.json(err);
            return res.json(post);
        });
    });
}

deleteTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas')
        .populate('author').populate('visibility').populate('requirements').populate('assignments')
        .populate('tags').populate('roadmap', (err, post) => {
            if (err) return res.json(err);
            return res.json(post);
        });
    });
}

assignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

deassignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

addRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

deleteRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

createCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(post);
        });
    });
}

deleteCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.populate('forum').populate('bucket').populate('personas').populate('author')
        .populate('visibility').populate('requirements').populate('assignments').populate('tags')
        .populate('roadmap', (err, post) => {
            if (err) return res.json({ success: false, error: err });
            CustomField.findByIdAndRemove(fieldID, (err, field) => {
                if (err) return res.json({ success: false, error: err });
                return res.json(post);
            });
        });
    });
}

//Create 2 posts
//Test that number of votes works correctly
createMergedPost = (req, res) => {
    const { id } = req.params;
    const { parentPostID } = req.body

    var numChildVotes = 0;

    Post.findById(id, (err, childPost) => {
        if (err) {
            return res.json({ success1: false, error: err });
        }
        let comment = new Comment({
		    author: ObjectId(childPost.author),
		    created: new Date(),
            content: childPost.body,
            numVotes: 0,
            source: ObjectId(id),
            post: ObjectId(parentPostID)
        })
        
        if (id) {
            updatePost = {};
            updatePost.post = parentPostID;
            Comment.updateMany({post: id}, {$set: updatePost}, {new: true}, (err, comments) => {
                if (err) return res.json({success2: false, error: err})
            })
        }
	    comment.save((err) => {
            if (err) return res.json({success3: false, error: err})
        });

        let update = {};
        update.parent = parentPostID;
        Post.findByIdAndUpdate(id, {$set: update}, {new: true}, (err) => {
            if (err) return res.json({ success4: false, error: err });
        });

        //Assume working, check later because no way to see numVotes for post
        numChildVotes = childPost.numVotes;
    });

    Post.findById(parentPostID, (err, parentPost) => {
        if (err) return res.json({ success5: false, error: err });
        let updateNumVotes = {};
        updateNumVotes.votes = parentPost.numVotes + numChildVotes;
        Post.findByIdAndUpdate(parentPostID, {$set: updateNumVotes}, {new: true}, (err) => {
            if (err) return res.json({ success6: false, error: err });
        });
    });

    updateVotes = {};
    updateVotes.post = parentPostID;
    Vote.updateMany({post: id}, {$set: updateVotes}, (err) => {
        if (err) return res.json({success2: false, error: err})
    })

}

autoTag = (req, res) => {
    let { secret, postID } = req.body;
    Post.findById(postID).exec(function(err, post) {
        if (err) return res.json({success: false, error: err});
        Tag.find().exec(function(err, tag) {
            if (err) return res.json({success: false, error: err});
            
            var tagsObj = {};
            var tags = [];
            var title = '';
            var body = '';

            for (var i in tag) {
                let obj = tag[i];
                if (obj.name) {
                    tagsObj[obj.name] = obj._id;
                    tags.push(obj.name);
                }
            }
            if (post.title) title = post.title;
            if (post.body) body = post.body;
            let data = {
                'tags': tags,
                'title': title,
                'body': body
            };

            result = postData('http://localhost:5000/autotag', data);
            result.then((autotag) => {
                if (autotag.error) return res.json(autotag);
                return res.json({success: true, tag: autotag.autotag, tagID: tagsObj[autotag.autotag]});
            });
        });
    });
}

findSimilarRequirements = (req, res) => {
    let { secret, postID } = req.body;
    Post.findById(postID).exec(function(err, post) {
        if (err) return res.json({success: false, error: err});
        Requirement.find().exec(function(err, requirement) {
            if (err) return res.json({success: false, error: err});

            var scores = {};
            var ids = [];
            var doc1 = '';
            var doc2 = [];

            if (post.title) doc1 += (post.title + ' ');
            if (post.body) doc1 += post.body;

            for (var i in requirement) {
                var reqs = '';
                let obj = requirement[i];
                let id = obj._id;

                if (obj.purpose) reqs += (obj.purpose + ' ');
                if (obj.title) reqs += (obj.title + ' ');
                if (obj.body) reqs += obj.body;
                
                ids.push(id);
                doc2.push(reqs);
            }

            let data = {
                'doc1': doc1,
                'doc2': doc2
            };

            result = postData('http://localhost:5000/similarity', data);
            result.then((similarities) => {
                if (similarities.error) return res.json(similarities);
                
                for (var i in similarities.similarity) {
                    score = similarities.similarity[i];
                    scores[ids[i]] = score;
                }

                return res.json({success: true, scores: scores});
            });
        });
    });
}

function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }

module.exports = { createPost, getPost, editPost, deletePost, 
    addVisibility, removeVisibility, addTag, deleteTag, addRequirement, 
    deleteRequirement, assignPost, deassignPost, retrievePosts, createCustomField,
    deleteCustomField, createMergedPost, autoTag, findSimilarRequirements }
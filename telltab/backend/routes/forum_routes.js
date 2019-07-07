const express = require('express');
const router = express.Router();

const forum_controller = require('../controllers/feedback_forum_controllers/Forum_Controller');
router.get('/forums/get/:id', forum_controller.getForum);
router.post('/forums/create', forum_controller.createForum);
router.put('/forums/edit/:id', forum_controller.editForum);
router.delete('/forums/delete/:id', forum_controller.deleteForum);

const bucket_controller = require('../controllers/feedback_forum_controllers/Bucket_Controller');
router.get('/buckets/get/:id', bucket_controller.getBucket);
router.post('/buckets/create', bucket_controller.createBucket);
router.put('/buckets/edit/:id', bucket_controller.editBucket);
router.delete('/buckets/delete/:id', bucket_controller.deleteBucket);

const newrelease_controller = require('../controllers/feedback_forum_controllers/NewRelease_Controller');
router.get('/newreleases/get/:id', newrelease_controller.getNewRelease);
router.post('/newreleases/create', newrelease_controller.createNewRelease);
router.put('/newreleases/edit/:id', newrelease_controller.editNewRelease);
router.delete('/newreleases/delete/:id', newrelease_controller.deleteNewRelease);
router.post('/newreleases/retrieve', newrelease_controller.retrieveNewReleases);

const post_controller = require('../controllers/feedback_forum_controllers/Post_Controller');
router.get('/posts/get/:id', post_controller.getPost);
router.post('/posts/retrieve', post_controller.retrievePosts);
router.post('/posts/create', post_controller.createPost);
router.put('/posts/edit/:id', post_controller.editPost);
router.delete('/posts/delete/:id', post_controller.deletePost);
router.put('/posts/add_visibility/:id', post_controller.addVisibility);
router.put('/posts/remove_visibility/:id', post_controller.removeVisibility);
router.put('/posts/add_tag/:id', post_controller.addTag);
router.put('/posts/delete_tag/:id', post_controller.deleteTag);
router.put('/posts/assign_post/:id', post_controller.assignPost);
router.put('/posts/deassign_post/:id', post_controller.deassignPost);
router.put('/posts/add_requirement/:id', post_controller.addRequirement);
router.put('/posts/delete_requirement/:id', post_controller.deleteRequirement);
router.put('/posts/add_customfield/:id', post_controller.createCustomField);
router.put('/posts/delete_customfield/:id', post_controller.deleteCustomField);
router.put('/posts/mergepost/:id', post_controller.createMergedPost); //can have all these functionalities in one put method?
router.post('/posts/auto_tag', post_controller.autoTag);

const vote_controller = require('../controllers/feedback_forum_controllers/Vote_Controller');
router.get('/votes/get/:id', vote_controller.getVote);
router.post('/votes/create', vote_controller.createVote);
router.delete('/votes/delete/:id', vote_controller.deleteVote);
router.post('/votes/retrieve', vote_controller.retrieveVotes);
// Export API routes
module.exports = router;
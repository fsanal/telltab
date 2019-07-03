const express = require('express');
const router = express.Router();

const forum_controller = require('../controllers/feedback_forum_controllers/Forum_Controller');
router.get('/forum/get/:id', forum_controller.getForum);
router.post('/forum/create', forum_controller.createForum);
router.put('/forum/edit', forum_controller.editForum);
router.delete('/forum/delete/:id', forum_controller.deleteForum);

const bucket_controller = require('../controllers/feedback_forum_controllers/Bucket_Controller');
router.get('/bucket/get/:id', bucket_controller.getBucket);
router.post('/bucket/create', bucket_controller.createBucket);
router.put('/bucket/edit', bucket_controller.editBucket);
router.delete('/bucket/delete/:id', bucket_controller.deleteBucket);

const newrelease_controller = require('../controllers/feedback_forum_controllers/NewRelease_Controller');
router.get('/newrelease/get/:id', newrelease_controller.getNewRelease);
router.post('/newrelease/create', newrelease_controller.createNewRelease);
router.put('/newrelease/edit', newrelease_controller.editNewRelease);
router.delete('/newrelease/delete/:id', newrelease_controller.deleteNewRelease);

const post_controller = require('../controllers/feedback_forum_controllers/Post_Controller');
router.get('/post/get/:id', post_controller.getPost);
router.post('/post/create', post_controller.createPost);
router.put('/post/edit', post_controller.editPost);
router.delete('/post/delete/:id', post_controller.deletePost);
router.put('/post/add_visibility', post_controller.addVisibility); 
router.put('/post/remove_visibility', post_controller.removeVisibility);
router.put('/post/add_tag', post_controller.addTag);
router.put('/post/delete_tag', post_controller.deleteTag);
router.put('/post/assign_post', post_controller.assignPost);
router.put('/post/deassign_post', post_controller.deassignPost);
router.put('/post/add_requirement', post_controller.addRequirement);
router.put('/post/delete_requirement', post_controller.deleteRequirement);

const vote_controller = require('../controllers/feedback_forum_controllers/Vote_Controller');
router.get('/vote/get/:id', vote_controller.getVote);
router.post('/vote/create', vote_controller.createVote);
router.delete('/vote/delete/:id', vote_controller.deleteVote);

// Export API routes
module.exports = router;
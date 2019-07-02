const express = require('express');
const router = express.Router();

const board_controller = require('../controllers/feedback_forum_controllers/Board_Controller');
router.get('/board/get', board_controller.getBoard);
router.post('/board/create', board_controller.createBoard);
router.put('/board/edit', board_controller.editBoard);
router.delete('/board/delete', board_controller.deleteBoard);
router.post('/board/add_roadmap', board_controller.addRoadMap);
router.delete('/board/delete_roadmap', board_controller.deleteRoadMap);

const bucket_controller = require('../controllers/feedback_forum_controllers/Bucket_Controller');
router.get('/bucket/get', bucket_controller.getBucket);
router.post('/bucket/create', bucket_controller.createBucket);
router.put('/bucket/edit', bucket_controller.editBucket);
router.delete('/bucket/delete', bucket_controller.deleteBucket);

const newrelease_controller = require('../controllers/feedback_forum_controllers/NewRelease_Controller');
router.get('/newrelease/get', newrelease_controller.getNewRelease);
router.post('/newrelease/create', newrelease_controller.createNewRelease);
router.put('/newrelease/edit', newrelease_controller.editNewRelease);
router.delete('/newrelease/delete', newrelease_controller.deleteNewRelease);

const post_controller = require('../controllers/feedback_forum_controllers/Post_Controller');
router.get('/post/get', post_controller.getPost);
router.post('/post/create', post_controller.createPost);
router.put('/post/edit', post_controller.editPost);
router.delete('/post/delete', post_controller.deletePost);
router.post('/post/add_visibility', post_controller.addVisibility);
router.delete('/post/remove_visibility', post_controller.removeVisibility);
router.post('/post/add_tag', post_controller.addTag);
router.delete('/post/delete_tag', post_controller.deleteTag);
router.post('/post/assign_post', post_controller.assignPost);
router.delete('/post/deassign_post', post_controller.deassignPost);
router.post('/post/add_requirement', post_controller.addRequirement);
router.delete('/post/delete_requirement', post_controller.deleteRequirement);

const vote_controller = require('../controllers/feedback_forum_controllers/Vote_Controller');
router.get('/vote/get', vote_controller.getVote);
router.post('/vote/create', vote_controller.createVote);
router.delete('/vote/delete', vote_controller.deleteVote);

// Export API routes
module.exports = router;
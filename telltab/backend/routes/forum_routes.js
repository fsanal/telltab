const express = require('express');
const router = express.Router();

const board_controller = require('../controllers/feedback_forum_controllers/Board_Controller');
router.get('/getboard', board_controller.getBoard);
router.post('/createboard', board_controller.createBoard);
router.put('/editboard', board_controller.editBoard);
router.delete('/deleteboard', board_controller.deleteBoard);
router.post('/addroadmap', board_controller.addRoadMap);
router.delete('/deleteroadmap', board_controller.deleteRoadMap);

const bucket_controller = require('../controllers/feedback_forum_controllers/Bucket_Controller');
router.get('/getbucket', bucket_controller.getBucket);
router.post('/createbucket', bucket_controller.createBucket);
router.put('/editbucket', bucket_controller.editBucket);
router.delete('/deletebucket', bucket_controller.deleteBucket);

const newrelease_controller = require('../controllers/feedback_forum_controllers/NewRelease_Controller');
router.get('/getnewrelease', newrelease_controller.getNewRelease);
router.post('/createnewrelease', newrelease_controller.createNewRelease);
router.put('/editnewrelease', newrelease_controller.editNewRelease);
router.delete('/deletenewrelease', newrelease_controller.deleteNewRelease);

const post_controller = require('../controllers/feedback_forum_controllers/Post_Controller');
router.get('/getpost', post_controller.getPost);
router.post('/createpost', post_controller.createPost);
router.put('/editpost', post_controller.editPost);
router.delete('/deletepost', post_controller.deletePost);
router.post('/addvisibility', post_controller.addVisibility);
router.delete('/removevisibility', post_controller.removeVisibility);
router.post('/addtag', post_controller.addTag);
router.delete('/deletetag', post_controller.deleteTag);
router.post('/assignpost', post_controller.assignPost);
router.delete('/deassignpost', post_controller.deassignPost);
router.post('/addrequirement', post_controller.addRequirement);
router.delete('/deleterequirement', post_controller.deleteRequirement);

const vote_controller = require('../controllers/feedback_forum_controllers/Vote_Controller');
router.get('/getvote', vote_controller.getVote);
router.post('/createvote', vote_controller.createVote);
router.delete('/deletevote', votek_controller.deleteVote);

// Export API routes
module.exports = router;
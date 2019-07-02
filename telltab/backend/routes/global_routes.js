const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/Comment_Controller');
router.get('/comment/get', comment_controller.getComment);
router.post('/comment/create', comment_controller.createComment);
router.put('/comment/edit', comment_controller.editComment);
router.delete('/comment/delete', comment_controller.deleteComment);

const notification_controller = require('../controllers/Notification_Controller');
router.get('/notification/get', notification_controller.getNotification);
router.post('/notification/create', notification_controller.createNotification);
router.delete('/notification/delete', notification_controller.deleteNotification);

const persona_controller = require('../controllers/Persona_Controller');
router.get('/persona/get', persona_controller.getPersona);
router.post('/persona/create', persona_controller.createPersona);
router.put('/persona/edit', persona_controller.editPersona);
router.delete('/persona/delete', persona_controller.deletePersona);
router.post('/persona/add_tag', persona_controller.addTag);
router.delete('/persona/delete_tag', persona_controller.deleteTag);

const tag_controller = require('../controllers/Tag_Controller');
router.get('/tag/get', tag_controller.getTag);
router.post('/tag/create', tag_controller.createTag);
router.delete('/tag/delete', tag_controller.deleteTag);

const user_controller = require('../controllers/User_Controller');
router.get('/user/get', user_controller.getUser);
router.post('/user/create', user_controller.createUser);
router.put('/user/edit', user_controller.editUser);
router.delete('/user/delete', user_controller.deleteUser);
router.post('/user/add_persona', user_controller.addPersona);
router.delete('/user/delete_persona', user_controller.deletePersona);

// Export API routes
module.exports = router;
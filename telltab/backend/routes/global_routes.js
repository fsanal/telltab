const express = require('express');
const router = express.Router();


const comment_controller = require('../controllers/Comment_Controller');
router.get('/comment/get/:id', comment_controller.getComment);
router.post('/comment/create', comment_controller.createComment);
router.put('/comment/edit/:id', comment_controller.editComment);
router.delete('/comment/delete/:id', comment_controller.deleteComment);

const notification_controller = require('../controllers/Notification_Controller');
router.get('/notification/get/:id', notification_controller.getNotification);
router.post('/notification/create', notification_controller.createNotification);
router.delete('/notification/delete/:id', notification_controller.deleteNotification);

const persona_controller = require('../controllers/Persona_Controller');
router.get('/persona/get/:id', persona_controller.getPersona);
router.post('/persona/create', persona_controller.createPersona);
router.put('/persona/edit/:id', persona_controller.editPersona);
router.delete('/persona/delete/:id', persona_controller.deletePersona);
router.put('/persona/add_tag/:id', persona_controller.addTag);
router.put('/persona/delete_tag/:id', persona_controller.deleteTag);

const tag_controller = require('../controllers/Tag_Controller');
router.get('/tag/get/:id', tag_controller.getTag);
router.post('/tag/create', tag_controller.createTag);
router.delete('/tag/delete/:id', tag_controller.deleteTag);

const user_controller = require('../controllers/User_Controller');
router.get('/user/get/:id', user_controller.getUser);
router.post('/user/create', user_controller.createUser);
router.put('/user/edit/:id', user_controller.editUser);
router.delete('/user/delete/:id', user_controller.deleteUser);
router.put('/user/add_persona/:id', user_controller.addPersona);
router.put('/user/delete_persona/:id', user_controller.deletePersona);

const product_controller = require('../controllers/Product_Controller');
router.get('/product/get/:id', product_controller.getProduct);
router.post('/product/create', product_controller.createProduct);
router.put('/product/edit/:id', product_controller.editProduct);
router.delete('/product/delete/:id', product_controller.deleteProduct);

const customfield_controller = require('../controllers/CustomField_Controller');
router.put('/customfield/add/post', customfield_controller.createPostCustomField);
router.get('/customfield/get/:id', customfield_controller.getCustomField);
router.put('/customfield/delete/:id', customfield_controller.deletePostCustomField);

// Export API routes
module.exports = router;
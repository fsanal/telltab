const express = require('express');
const router = express.Router();


const comment_controller = require('../controllers/Comment_Controller');
router.get('/comments/get/:id', comment_controller.getComment);
router.post('/comments/create', comment_controller.createComment);
router.put('/comments/edit/:id', comment_controller.editComment);
router.delete('/comments/delete/:id', comment_controller.deleteComment);
router.post('/comments/retrieve', comment_controller.retrieveComments);

const notification_controller = require('../controllers/Notification_Controller');
router.get('/notifications/get/:id', notification_controller.getNotification);
router.post('/notifications/create', notification_controller.createNotification);
router.delete('/notifications/delete/:id', notification_controller.deleteNotification);

const persona_controller = require('../controllers/Persona_Controller');
router.get('/personas/get/:id', persona_controller.getPersona);
router.post('/personas/create', persona_controller.createPersona);
router.put('/personas/edit/:id', persona_controller.editPersona);
router.delete('/personas/delete/:id', persona_controller.deletePersona);
router.put('/personas/add_tag/:id', persona_controller.addTag);
router.put('/personas/delete_tag/:id', persona_controller.deleteTag);
router.post('/personas/retrieve', persona_controller.retrievePersonas);

const tag_controller = require('../controllers/Tag_Controller');
router.get('/tags/get/:id', tag_controller.getTag);
router.post('/tags/create', tag_controller.createTag);
router.delete('/tags/delete/:id', tag_controller.deleteTag);
router.post('/tags/retrieve', tag_controller.retrieveTags);

const user_controller = require('../controllers/User_Controller');
router.get('/users/get/:id', user_controller.getUser);
router.post('/users/create', user_controller.createUser);
router.put('/users/edit/:id', user_controller.editUser);
router.delete('/users/delete/:id', user_controller.deleteUser);
router.put('/users/add_persona/:id', user_controller.addPersona);
router.put('/users/delete_persona/:id', user_controller.deletePersona);
router.put('/users/add_customfield/:id', user_controller.createCustomField);
router.put('/users/delete_customfield/:id', user_controller.deleteCustomField);

const product_controller = require('../controllers/Product_Controller');
router.get('/products/get/:id', product_controller.getProduct);
router.post('/products/create', product_controller.createProduct);
router.post('/products/retrieve', product_controller.retrieveProducts);
router.put('/products/edit/:id', product_controller.editProduct);
router.delete('/products/delete/:id', product_controller.deleteProduct);

const customfield_controller = require('../controllers/CustomField_Controller');
router.post('/customfields/create', customfield_controller.createCustomField);
router.get('/customfields/get/:id', customfield_controller.getCustomField);
router.put('/customfields/delete/:id', customfield_controller.deleteCustomField);

// Export API routes
module.exports = router;
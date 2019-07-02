const express = require('express');
const router = express.Router();

const embeddable_controller = require('../controllers/widget_controllers/Embeddable_Controller');
router.get('/embeddable/get', embeddable_controller.getEmbeddable);
router.post('/embeddable/create', embeddable_controller.createEmbeddable);
router.put('/embeddable/edit', embeddable_controller.editEmbeddable);
router.delete('/embeddable/delete', embeddable_controller.deleteEmbeddable);

const form_controller = require('../controllers/widget_controllers/Form_Controller');
router.get('/form/get', form_controller.getForm);
router.post('/form/create', form_controller.createForm);
router.put('/form/edit', form_controller.editForm);
router.delete('/form/delete', form_controller.deleteForm);
router.post('/form/add/form_element', form_controller.addFormElement);
router.delete('/form/delete/form_element', form_controller.deleteFormElement);

const form_element_controller = require('../controllers/widget_controllers/FormElement_Controller');
router.get('/form_element/get', form_element_controller.getFormElement);
router.post('/form_element/create', form_element_controller.createFormElement);
router.put('/form_element/edit', form_element_controller.editFormElement);
router.delete('/form_element/delete', form_element_controller.deleteFormElement);

const widget_controller = require('../controllers/widget_controllers/Widget_Controller');
router.get('/widget/get', widget_controller.getWidget);
router.post('/widget/create', widget_controller.createWidget);
router.put('/widget/edit', widget_controller.editWidget);
router.delete('/widget/delete', widget_controller.deleteWidget);
router.post('/wiget/add_embeddable', widget_controller.addEmbeddable);
router.delete('/widget/delete_embeddable', widget_controller.deleteEmbeddable);

// Export API routes
module.exports = router;
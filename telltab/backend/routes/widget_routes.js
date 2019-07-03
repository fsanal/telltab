const express = require('express');
const router = express.Router();

const embeddable_controller = require('../controllers/widget_controllers/Embeddable_Controller');
router.get('/embeddable/get/:id', embeddable_controller.getEmbeddable);
router.post('/embeddable/create', embeddable_controller.createEmbeddable);
router.put('/embeddable/edit/:id', embeddable_controller.editEmbeddable);
router.delete('/embeddable/delete/:id', embeddable_controller.deleteEmbeddable);

const form_controller = require('../controllers/widget_controllers/Form_Controller');
router.get('/form/get/:id', form_controller.getForm);
router.post('/form/create', form_controller.createForm);
router.put('/form/edit/:id', form_controller.editForm);
router.delete('/form/delete/:id', form_controller.deleteForm);
router.put('/form/add/form_element/:id', form_controller.addFormElement);
router.put('/form/delete/form_element/:id', form_controller.deleteFormElement);

const form_element_controller = require('../controllers/widget_controllers/FormElement_Controller');
router.get('/form_element/get/:id', form_element_controller.getFormElement);
router.post('/form_element/create', form_element_controller.createFormElement);
router.put('/form_element/edit/:id', form_element_controller.editFormElement);
router.delete('/form_element/delete/:id', form_element_controller.deleteFormElement);

const widget_controller = require('../controllers/widget_controllers/Widget_Controller');
router.get('/widget/get/:id', widget_controller.getWidget);
router.post('/widget/create', widget_controller.createWidget);
router.put('/widget/edit/:id', widget_controller.editWidget);
router.delete('/widget/delete/:id', widget_controller.deleteWidget);
router.put('/widget/add_embeddable/:id', widget_controller.addEmbeddable);
router.put('/widget/delete_embeddable/:id', widget_controller.deleteEmbeddable);

// Export API routes
module.exports = router;
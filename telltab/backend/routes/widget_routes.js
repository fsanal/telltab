const express = require('express');
const router = express.Router();

const embeddable_controller = require('../controllers/widget_controllers/Embeddable_Controller');
router.get('/embeddables/get/:id', embeddable_controller.getEmbeddable);
router.post('/embeddables/create', embeddable_controller.createEmbeddable);
router.put('/embeddables/edit/:id', embeddable_controller.editEmbeddable);
router.delete('/embeddables/delete/:id', embeddable_controller.deleteEmbeddable);

const form_controller = require('../controllers/widget_controllers/Form_Controller');
router.get('/forms/get/:id', form_controller.getForm);
router.post('/forms/create', form_controller.createForm);
router.put('/forms/edit/:id', form_controller.editForm);
router.delete('/forms/delete/:id', form_controller.deleteForm);
router.put('/forms/add/form_element/:id', form_controller.addFormElement);
router.put('/forms/delete/form_element/:id', form_controller.deleteFormElement);
router.post('/forms/retrieve', form_controller.retrieveFormElements);

const form_element_controller = require('../controllers/widget_controllers/FormElement_Controller');
router.get('/form_elements/get/:id', form_element_controller.getFormElement);
router.post('/form_elements/create', form_element_controller.createFormElement);
router.put('/form_elements/edit/:id', form_element_controller.editFormElement);
router.delete('/form_elements/delete/:id', form_element_controller.deleteFormElement);

const widget_controller = require('../controllers/widget_controllers/Widget_Controller');
router.get('/widgets/get/:id', widget_controller.getWidget);
router.post('/widgets/create', widget_controller.createWidget);
router.put('/widgets/edit/:id', widget_controller.editWidget);
router.delete('/widgets/delete/:id', widget_controller.deleteWidget);
router.put('/widgets/add_embeddable/:id', widget_controller.addEmbeddable);
router.put('/widgets/delete_embeddable/:id', widget_controller.deleteEmbeddable);
router.post('/widgets/retrieve', widget_controller.retrieveEmbeddables);

// Export API routes
module.exports = router;
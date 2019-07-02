const express = require('express');
const router = express.Router();

const embeddable_controller = require('../controllers/widget_controllers/Embeddable_Controller');
router.get('/initiative/get', initiative_controller.getInitiative);
router.post('/initiative/create', initiative_controller.createInitiative);
router.put('/initiative/edit', initiative_controller.editInitiative);
router.delete('/initiative/delete', initiative_controller.deleteInitiative);

// Export API routes
module.exports = router;
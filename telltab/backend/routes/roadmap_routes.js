const express = require('express');
const router = express.Router();

const initiative_controller = require('../controllers/roadmap_controllers/Initiative_Controller');
router.get('/initiative/get', initiative_controller.getInitiative);
router.post('/initiative/create', initiative_controller.createInitiative);
router.put('/initiative/edit', initiative_controller.editInitiative);
router.delete('/initiative/delete', initiative_controller.deleteInitiative);

const requirement_controller = require('../controllers/roadmap_controllers/Requirement_Controller');
router.get('/requirement/get', requirement_controller.getInitiative);
router.post('/requirement/create', requirement_controller.createInitiative);
router.put('/requirement/edit', requirement_controller.editInitiative);
router.delete('/requirement/delete', requirement_controller.deleteInitiative);
router.post('/requirement/add_visibility', requirement_controller.addVisibility);
router.delete('/requirement/remove_visibility', requirement_controller.removeVisibility);
router.post('/requirement/add_tag', requirement_controller.addTag);
router.delete('/requirement/delete_tag', requirement_controller.deleteTag);
router.post('/requirement/add_assignment', requirement_controller.addAssignment);
router.delete('/requirement/delete_assignment', requirement_controller.deleteAssignment);

const roadmap_controller = require('../controllers/roadmap_controllers/RoadMap_Controller');
router.get('/roadmap/get', roadmap_controller.getRoadMap);
router.post('/roadmap/create', roadmap_controller.createRoadMap);
router.put('/roadmap/edit', roadmap_controller.editRoadMap);
router.delete('/roadmap/delete', roadmap_controller.deleteRoadMap);

const timeblock_controller = require('../controllers/roadmap_controllers/TimeBlock_Controller');
router.get('/timeblock/get', timeblock_controller.getTimeBlock);
router.post('/timeblock/create', timeblock_controller.createTimeBlock);
router.put('/timeblock/edit', timeblock_controller.editTimeBlock);
router.delete('/timeblock/delete', timeblock_controller.deleteTimeBlock);

// Export API routes
module.exports = router;
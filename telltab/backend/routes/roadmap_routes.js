const express = require('express');
const router = express.Router();

const initiative_controller = require('../controllers/roadmap_controllers/Initiative_Controller');
router.get('/initiative/get/:id', initiative_controller.getInitiative);
router.post('/initiative/create', initiative_controller.createInitiative);
router.put('/initiative/edit', initiative_controller.editInitiative);
router.delete('/initiative/delete/:id', initiative_controller.deleteInitiative);

const requirement_controller = require('../controllers/roadmap_controllers/Requirement_Controller');
router.get('/requirement/get/:id', requirement_controller.getRequirement);
router.post('/requirement/create', requirement_controller.createRequirement);
router.put('/requirement/edit', requirement_controller.editRequirement);
router.delete('/requirement/delete/:id', requirement_controller.deleteRequirement);
router.put('/requirement/add_visibility', requirement_controller.addVisibility);
router.put('/requirement/remove_visibility', requirement_controller.removeVisibility);
router.put('/requirement/add_tag', requirement_controller.addTag);
router.put('/requirement/delete_tag', requirement_controller.deleteTag);
router.put('/requirement/add_assignment', requirement_controller.addAssignment);
router.put('/requirement/delete_assignment', requirement_controller.deleteAssignment);

const roadmap_controller = require('../controllers/roadmap_controllers/RoadMap_Controller');
router.get('/roadmap/get/:id', roadmap_controller.getRoadMap);
router.post('/roadmap/create', roadmap_controller.createRoadMap);
router.put('/roadmap/edit', roadmap_controller.editRoadMap);
router.delete('/roadmap/delete/:id', roadmap_controller.deleteRoadMap);

const timeblock_controller = require('../controllers/roadmap_controllers/TimeBlock_Controller');
router.get('/timeblock/get/:id', timeblock_controller.getTimeBlock);
router.post('/timeblock/create', timeblock_controller.createTimeBlock);
router.put('/timeblock/edit', timeblock_controller.editTimeBlock);
router.delete('/timeblock/delete/:id', timeblock_controller.deleteTimeBlock);

// Export API routes
module.exports = router;
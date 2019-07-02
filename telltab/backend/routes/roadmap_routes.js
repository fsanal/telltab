const express = require('express');
const router = express.Router();

const initiative_controller = require('../controllers/roadmap_controllers/Initiative_Controller');
router.get('/getinitiative', initiative_controller.getInitiative);
router.post('/createinitiative', initiative_controller.createInitiative);
router.put('/editinitiative', initiative_controller.editInitiative);
router.delete('/deleteinitiative', initiative_controller.deleteInitiative);

const requirement_controller = require('../controllers/roadmap_controllers/Requirement_Controller');
router.get('/getrequirement', requirement_controller.getInitiative);
router.post('/createrequirement', requirement_controller.createInitiative);
router.put('/editrequirement', requirement_controller.editInitiative);
router.delete('/deleterequirement', requirement_controller.deleteInitiative);
router.get('/addvisibility', requirement_controller.addVisibility);
router.get('/removevisibility', requirement_controller.removeVisibility);
router.get('/addtag', requirement_controller.addTag);
router.get('/deletetag', requirement_controller.deleteTag);
router.get('/addassignment', requirement_controller.addAssignment);
router.get('/deleteassignment', requirement_controller.deleteAssignment);

const roadmap_controller = require('../controllers/roadmap_controllers/RoadMap_Controller');
router.get('/getroadmap', roadmap_controller.getRoadMap);
router.post('/createroadmap', roadmap_controller.createRoadMap);
router.put('/editroadmap', roadmap_controller.editRoadMap);
router.delete('/deleteroadmap', roadmap_controller.deleteRoadMap);

const timeblock_controller = require('../controllers/roadmap_controllers/TimeBlock_Controller');
router.get('/gettimeblock', timeblock_controller.getTimeBlock);
router.post('/createtimeblock', timeblock_controller.createTimeBlock);
router.put('/edittimeblock', timeblock_controller.editTimeBlock);
router.delete('/deletetimeblock', timeblock_controller.deleteTimeBlock);

// Export API routes
module.exports = router;
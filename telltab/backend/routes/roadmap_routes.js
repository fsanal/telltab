const express = require('express');
const router = express.Router();

//TESTING ALL

const initiative_controller = require('../controllers/roadmap_controllers/Initiative_Controller');
router.get('/initiatives/get/:id', initiative_controller.getInitiative);
router.post('/initiatives/create', initiative_controller.createInitiative);
router.put('/initiatives/edit/:id', initiative_controller.editInitiative);
router.delete('/initiatives/delete/:id', initiative_controller.deleteInitiative);
router.post('/initiatives/retrieve', initiative_controller.retrieveInitiatives);

const requirement_controller = require('../controllers/roadmap_controllers/Requirement_Controller');
router.get('/requirements/get/:id', requirement_controller.getRequirement);
router.post('/requirements/create', requirement_controller.createRequirement);
router.put('/requirements/edit/:id', requirement_controller.editRequirement);
router.delete('/requirements/delete/:id', requirement_controller.deleteRequirement);
router.put('/requirements/add_visibility/:id', requirement_controller.addVisibility);
router.put('/requirements/remove_visibility/:id', requirement_controller.removeVisibility);
router.put('/requirements/add_tag/:id', requirement_controller.addTag);
router.put('/requirements/delete_tag/:id', requirement_controller.deleteTag);
router.put('/requirements/add_assignment/:id', requirement_controller.addAssignment);
router.put('/requirements/delete_assignment/:id', requirement_controller.deleteAssignment);
router.put('/requirements/add_customfield/:id', requirement_controller.createCustomField);
router.put('/requirements/delete_customfield/:id', requirement_controller.deleteCustomField);
router.post('/requirements/retrieve', requirement_controller.retrieveRequirements);

const roadmap_controller = require('../controllers/roadmap_controllers/Roadmap_Controller');
router.get('/roadmaps/get/:id', roadmap_controller.getRoadmap);
router.post('/roadmaps/create', roadmap_controller.createRoadmap);
router.put('/roadmaps/edit/:id', roadmap_controller.editRoadmap);
router.delete('/roadmaps/delete/:id', roadmap_controller.deleteRoadmap);
router.post('/roadmaps/get_product_roadmap', roadmap_controller.getProductRoadmap);

const timeblock_controller = require('../controllers/roadmap_controllers/Timeblock_Controller');
router.get('/timeblocks/get/:id', timeblock_controller.getTimeblock);
router.post('/timeblocks/create', timeblock_controller.createTimeblock);
router.put('/timeblocks/edit/:id', timeblock_controller.editTimeblock);
router.delete('/timeblocks/delete/:id', timeblock_controller.deleteTimeblock);
router.post('/timeblocks/retrieve', timeblock_controller.retrieveTimeblocks);
router.post('/timeblocks/change_requirements/:id', timeblock_controller.changeRequirements);

// Export API routes
module.exports = router;
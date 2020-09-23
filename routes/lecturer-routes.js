const express=require('express');
const router=express.Router();
const LecturerController=require('../controllers/lecturer-controller');
//validators
const { AddLecturerValidator } = require('../validators/lecturer-validator');
const { runValidation } = require('../validators/validator');

router.post('/',AddLecturerValidator,runValidation,LecturerController.addLecturer);
router.get('/:lid',LecturerController.getLecturerById);
router.get('/',LecturerController.getAllLecturers);
router.delete('/:lid',LecturerController.deleteLecturer);
router.patch('/:lid',LecturerController.updateLecturer);
router.patch('/room/:lid',LecturerController.setRoomForLecturer);
module.exports=router;
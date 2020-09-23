const express=require('express');
const router=express.Router();
const SubjectController = require('../controllers/subject-controller');
//validators
const { AddSubjectValidator } = require('../validators/subject-validator');
const { runValidation } = require('../validators/validator');

router.post('/',AddSubjectValidator,runValidation,SubjectController.addSubject);
router.get('/',SubjectController.getAllSubjects);
router.get('/:sid',SubjectController.getSubjectById);
router.delete('/:sid',SubjectController.deleteSubject);
router.patch('/:sid',SubjectController.updateSubject);
router.patch('/room/:sid',SubjectController.setRoomForSubjects);
module.exports=router;
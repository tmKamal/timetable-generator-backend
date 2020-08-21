const express=require('express');
const router=express.Router();
const LecturerController=require('../controllers/lecturer-controller');
//validators
const { AddBuildingValidator } = require('../validators/building-validator');
const { runValidation } = require('../validators/validator');


router.get('/',LecturerController.getAllLecturers);
router.post('/',AddBuildingValidator,LecturerController.addLecturer);

router.get('/test',((req,res)=>{
    res.status(200).json({
        error:"we are up!!"
    });
}));
module.exports=router;
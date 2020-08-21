const express=require('express');
const router=express.Router();
const BuildingController=require('../controllers/building-controller');
//validators
const { AddBuildingValidator } = require('../validators/building-validator');
const { runValidation } = require('../validators/validator');


router.get('/:bid',BuildingController.getBuildingById);
router.get('/',BuildingController.getAllBuildings);
router.post('/',AddBuildingValidator,runValidation,BuildingController.addBuilding);
router.delete('/:bid',BuildingController.deleteBuilding);
router.patch('/:bid',BuildingController.updateBuilding);
router.get('/test',((req,res)=>{
    res.status(200).json({
        error:"we are up!!"
    });
}));
module.exports=router;
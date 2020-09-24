const express=require('express');
const router=express.Router();
const SessionController = require('../controllers/session-controller');
const { AddSessionValidator} = require("../validators/session-validator");
const { runValidation } = require('../validators/validator');

router.post('/',SessionController.addSession);
router.get('/',SessionController.getAllSessions);
router.patch('/room/:sid',SessionController.setRoomForSession);

router.get('/test',((req,res)=>{
    res.status(200).json({
        error:"we are up!!"
    });
}));
module.exports=router;


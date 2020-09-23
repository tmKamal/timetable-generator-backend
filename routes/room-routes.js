const express=require('express');
const router=express.Router();
const RoomController=require('../controllers/room-controller');
//validators
const { runValidation } = require('../validators/validator');
const { AddRoomValidator } = require('../validators/room-validator');


router.get('/:rid',RoomController.getRoomById);
router.get('/',RoomController.getAllRooms);
router.post('/',AddRoomValidator,runValidation,RoomController.addRoom);
router.delete('/:rid',RoomController.deleteRoom);
router.patch('/:rid',RoomController.updateRoom);
router.patch('/not-available/:rid',RoomController.setNotAvailableTime);

module.exports=router;
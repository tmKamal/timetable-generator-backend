const {check}=require('express-validator');

const AddRoomValidator=[
    check('roomName').not().isEmpty().withMessage('Room name is required'),
    check('roomCapacity').not().isEmpty().withMessage('Room capacity is required'),
    check('roomCapacity').isNumeric().withMessage('Room capacity must be a number'),
    check('roomType').not().isEmpty().withMessage('Room type is required'),
];
exports.AddRoomValidator=AddRoomValidator;
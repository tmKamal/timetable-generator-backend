const {check}=require('express-validator');

const AddBuildingValidator=[
    check('buildingName').not().isEmpty().withMessage('Building name is required'),
    check('lecHallCapacity').not().isEmpty().withMessage('Lecture hall capacity is required'),
    check('lecHallCapacity').isNumeric().withMessage('Lec hall capacity must be a number'),
    check('labCapacity').not().isEmpty().withMessage('Laboratory Capacity is required'),
    check('labCapacity').isNumeric().withMessage('value must be a number'),
    check('description').not().isEmpty().withMessage('Description must not be empty'),
];
exports.AddBuildingValidator=AddBuildingValidator;
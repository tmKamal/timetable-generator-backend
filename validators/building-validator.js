const {check}=require('express-validator');

const AddBuildingValidator=[
    check('buildingName').not().isEmpty().withMessage('Building name is required'),
    check('lecHallCapacity').not().isEmpty().withMessage('Lecture hall capacity is required'),
    check('buildingName').not().isEmpty().withMessage('Laboratory Capacity is required'),
    check('description').not().isEmpty().withMessage('Description must not be empty'),
];
exports.AddBuildingValidator=AddBuildingValidator;
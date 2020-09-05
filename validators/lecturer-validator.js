const {check}=require('express-validator');

const AddLecturerValidator=[
    check('lecturerName').not().isEmpty().withMessage('lecturerName is required'),
    check('empId').isNumeric().withMessage('empId must be a number'),
    check('faculty').not().isEmpty().withMessage('faculty is required'),
    check('department').not().isEmpty().withMessage('department must not be empty'),
    check('center').not().isEmpty().withMessage('center is required'),
    check('building').not().isEmpty().withMessage('building must not be empty'),
    check('level').isNumeric().withMessage('level must be a number'),
];
exports.AddLecturerValidator=AddLecturerValidator;

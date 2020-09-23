const {check}=require('express-validator');

const AddSessionValidator=[
    //check('lecturers').not().isEmpty().withMessage('lecturerName is required'),
    check('tag').not().isEmpty().withMessage('tag is required'),
    check('studentGroup').not().isEmpty().withMessage('group must not be empty'),
    check('subject').not().isEmpty().withMessage('subject is required'),
    check('studentCount').isNumeric().withMessage('level must be a number'),
    check('duration').isNumeric().withMessage('level must be a number'),
    
];
exports.AddSessionValidator=AddSessionValidator;
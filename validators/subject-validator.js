const {check}=require('express-validator');

const AddSubjectValidator=[
    check('subjectName').not().isEmpty().withMessage('subjectName is required'),
    check('subjectCode').not().isEmpty().withMessage('subjectCode is required'),
    check('offeredYear').not().isEmpty().withMessage('offeredYear is required'),
    check('offeredSemester').not().isEmpty().withMessage('offeredSemester is required'),
    check('lectureHours').not().isEmpty().withMessage('lectureHours is required'),
    check('tutorialHours').not().isEmpty().withMessage('tutorialHours is required'),
    check('labHours').not().isEmpty().withMessage('labHours is required'),
    check('evaluationHours').not().isEmpty().withMessage('evaluationHours is required'),
    
];
exports.AddSubjectValidator=AddSubjectValidator;



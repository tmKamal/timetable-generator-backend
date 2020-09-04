const { check } = require("express-validator");

const AddStudentValidator = [
  check("academicYearSem")
    .not()
    .isEmpty()
    .withMessage("Academic Year and Semester is required"),
  check("programme").not().isEmpty().withMessage("Programme is required"),
  check("groupNumber").not().isEmpty().withMessage("Group Number is required"),
  check("subGroupNumber")
    .not()
    .isEmpty()
    .withMessage("Sub Group Number is required"),
];
exports.AddStudentValidator = AddStudentValidator;

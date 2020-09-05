const { check } = require("express-validator");

const AddTagValidator = [
  check("tagType").not().isEmpty().withMessage("Tag type is required"),
];
exports.AddTagValidator = AddTagValidator;

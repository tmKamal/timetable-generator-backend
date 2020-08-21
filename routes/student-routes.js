const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/student-controller");
//validators
const { AddStudentValidator } = require("../validators/student-validator");
const { runValidation } = require("../validators/validator");

router.get("/", StudentController.getAllStudents);
router.post(
  "/",
  AddStudentValidator,
  runValidation,
  StudentController.addStudent
);

router.get("/test", (req, res) => {
  res.status(200).json({
    error: "we are up!!",
  });
});
module.exports = router;

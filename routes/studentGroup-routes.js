const express = require("express");
const router = express.Router();
const StudentGroupController = require("../controllers/studentGroup-controller");
//validators
// const { AddStudentValidator } = require("../validators/student-validator");
// const { runValidation } = require("../validators/validator");

router.get("/:sid", StudentGroupController.getStudentGroupById);
router.get("/", StudentGroupController.getAllStudentGroups);
router.post("/", StudentGroupController.addStudentGroup);
router.delete("/:sid", StudentGroupController.deleteStudentGroup);
router.patch("/:sid", StudentGroupController.updateStudentGroup);
router.get("/test", (req, res) => {
  res.status(200).json({
    error: "we are up!!",
  });
});
module.exports = router;

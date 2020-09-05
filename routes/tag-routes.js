const express = require("express");
const router = express.Router();
const TagController = require("../controllers/tag-controller");
//validators
const { AddTagValidator } = require("../validators/tag-validator");
const { runValidation } = require("../validators/validator");

router.get("/:tagid", TagController.getTagById);
router.get("/", TagController.getAllTags);
router.post("/", AddTagValidator, runValidation, TagController.addTag);
router.delete("/:tagid", TagController.deleteTag);
router.patch("/:tagid", TagController.updateTag);
router.get("/test", (req, res) => {
  res.status(200).json({
    error: "we are up!!",
  });
});
module.exports = router;

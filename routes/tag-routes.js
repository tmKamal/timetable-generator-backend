const express = require("express");
const router = express.Router();
const TagController = require("../controllers/tag-controller");

router.get("/", TagController.getAlltags);
router.post("/", TagController.addTag);

router.get("/test", (req, res) => {
  res.status(200).json({
    error: "we are up!!",
  });
});
module.exports = router;

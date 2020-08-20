const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tagType: { type: String, required: true },
});

module.exports = mongoose.model("Tag", TagSchema);

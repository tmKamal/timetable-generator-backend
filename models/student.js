const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  academicYearSem: { type: String, required: true },
  programme: { type: String, required: true },
  groupNumber: { type: Number, required: true },
  subGroupNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Student", BuildingSchema);

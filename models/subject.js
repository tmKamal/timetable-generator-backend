const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  offeredYear: { type: Number, required: true },
  offeredSemester: { type: Number, required: true },
  lectureHours: { type: Number, required: true },
  tutorialHours: { type: Number, required: true },
  labHours: { type: Number, required: true },
  evaluationHours: { type: Number, required: true },
  favRoom: [
    {
      room: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
      },
      tag: {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      }
    }
  ]
});

module.exports = mongoose.model("Subject", SubjectSchema);

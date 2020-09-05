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
    evaluationHours: { type: Number, required: true }
});

module.exports=mongoose.model('Subject',SubjectSchema);

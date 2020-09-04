const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LectererSchema = new Schema({
    lecturerName: { type: String, required: true },
    empId: { type: Number, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    center: { type: String, required: true },
    building: { type: String, required: true },
    level: { type: Number, required: true }
});

module.exports=mongoose.model('Lecturer',LectererSchema);

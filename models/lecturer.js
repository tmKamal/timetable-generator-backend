const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    lecturerName: { type: String, required: true },
    empId: { type: Number, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    center: { type: String, required: true },
    building: { type: mongoose.Types.ObjectId, ref:'Building', required: true },
    level: { type: Number, required: true },
    rank: { type: String },
});

module.exports=mongoose.model('Lecturer',LecturerSchema);

//lecturerName,empId,faculty,department,center,building,level
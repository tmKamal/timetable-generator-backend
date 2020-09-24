const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    lecturers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Lecturer'
        }
    ],
    selectedLecturer: {
        type: mongoose.Types.ObjectId,
        ref: 'Lecturer'
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    },
    studentGroup: {
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    subGroup: {
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject'
    },
    subjectCode: {
        type:String
    },
    day: {
        type: String,
        
    },
    startTime: {
        hours: {
            type: Number,
            
        },
        minutes: {
            type: Number,
           
        }
    },
    duration: {
        type: Number,
        required: true
    },
    studentCount: {
        type: Number,
        required: true
    },
    favRoom:[{type:mongoose.Types.ObjectId,ref:'Room'}]
});

module.exports = mongoose.model('Session', SessionSchema);

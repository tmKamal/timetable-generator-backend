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
    subject: {
        type: mongoose.Types.ObjectId,
        ref: 'Subject'
    },
    day: {
        type: String,
        required: true
    },
    startTime: {
        hours: {
            type: Number,
            required: true
        },
        minutes: {
            type: Number,
            required: true
        }
    },
    duration: {
        type: Number,
        default: 1
    },
    room: {
        type: mongoose.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = mongoose.model('Session', SessionSchema);

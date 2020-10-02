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
        ref: 'StudentGroup'
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
        type: String
    },
    groupId: {
        type: String
    },
    day: {
        type: String
    },
    startTime: {
        hours: {
            type: Number
        },

        minutes: {
            type: Number
        }
    },
    duration: {
        type: Number
    },
    studentCount: {
        type: Number
    },
    notAvailable: [
        {
            day: {
                type: String,
                required: true
            },
            time: {
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
            }
        }
    ],
    favRoom: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
    selectedRoom: { type: mongoose.Types.ObjectId, ref: 'Room' },
    alive: { type: Boolean, default: true },
    type: { type: String, default: 'normal' },
    consecutive: {
        sessionOne: {
            type: mongoose.Types.ObjectId,
            ref: 'Session'
        },
        sessionTwo: {
            type: mongoose.Types.ObjectId,
            ref: 'Session'
        }
    },
    parallel: {
        sessions: [{ type: mongoose.Types.ObjectId, ref: 'Session' }]
    }
});

module.exports = mongoose.model('Session', SessionSchema);

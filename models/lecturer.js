const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    lecturerName: { type: String, required: true },
    empId: { type: Number, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    center: { type: String, required: true },
    building: {
        type: mongoose.Types.ObjectId,
        ref: 'Building',
        required: true
    },
    level: { type: Number, required: true },
    rank: { type: String },
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
    nextAvailable: {
        day: {
            type: Number,
            default: 0
        },
        stRow: {
            type: Number,
            default: 0
        }
    },
    availablility: [
        {
            column: {
                type: Number
            },
            stRow: {
                type: Number
            },
            endRow: {
                type: Number
            }
        }
    ],
    timetable: [
        {
            column: {
                type: Number
            },
            stRow: {
                type: Number
            },
            endRow: {
                type: Number
            },
            session1: {
                type: mongoose.Types.ObjectId,
                ref: 'Session'
            },
            session2: {
                type: mongoose.Types.ObjectId,
                ref: 'Session'
            }
        }
    ]
});

module.exports = mongoose.model('Lecturer', LecturerSchema);

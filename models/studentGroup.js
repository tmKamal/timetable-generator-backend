const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentGroupSchema = new Schema({
    academicYearSem: { type: String, required: true },
    programme: { type: String, required: true },
    groupNumber: { type: Number, required: true },
    groupId: { type: String, required: true },
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
    ],
    favRoom: [{ type: mongoose.Types.ObjectId, ref: 'Room' }]
});

module.exports = mongoose.model('StudentGroup', StudentGroupSchema);

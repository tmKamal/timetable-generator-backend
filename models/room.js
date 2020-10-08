const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const RoomSchema = new Schema({
    roomName: { type: String, required: true },
    roomType: { type: String, required: true },
    roomCapacity: { type: Number, required: true },
    roomTags: [{ type: ObjectId, ref: 'Tag' }],
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
    buildingId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Building'
    },
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

module.exports = mongoose.model('Room', RoomSchema);

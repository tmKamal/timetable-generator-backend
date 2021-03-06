const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    academicYearSem: { type: String, required: true },
    programme: { type: String, required: true },
    groupNumber: { type: Number, required: true },
    subGroupNumber: { type: Number, required: true },
    groupId:{type:String,required:true},
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
    favRoom: [{ type: mongoose.Types.ObjectId, ref: "Room" }],
});

module.exports = mongoose.model('Student', StudentSchema);

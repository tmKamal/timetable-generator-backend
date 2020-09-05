const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkdaySchema = new Schema({
    days: [
        {
            monday: {
                type: Boolean,
                default: false
            },
            tuesday: {
                type: Boolean,
                default: false
            },
            wednesday: {
                type: Boolean,
                default: false
            },
            thursday: {
                type: Boolean,
                default: false
            },
            friday: {
                type: Boolean,
                default: false
            },
            saturday: {
                type: Boolean,
                default: false
            },
            sunday: {
                type: Boolean,
                default: false
            }
        }
    ],
    countDays: { type: Number, required: true }
});

module.exports = mongoose.model('Workday', WorkdaySchema);

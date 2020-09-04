const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkTimeSchema = new Schema({
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
    slot: { type: Number, required: true }
});

module.exports = mongoose.model('WorkTime', WorkTimeSchema);

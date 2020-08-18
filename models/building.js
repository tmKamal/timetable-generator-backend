const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  buildingName: { type: String, required: true },
  lecHallCapacity: { type: Number, required: true },
  labCapacity: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports=mongoose.model('Building',BuildingSchema);
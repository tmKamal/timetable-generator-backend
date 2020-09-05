const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomName: { type: String, required: true },
  roomType: { type: String, required: true },
  roomCapacity: { type: Number, required: true },
  buildingId:{type:mongoose.Types.ObjectId,required:true,ref:'Building'}
});

module.exports=mongoose.model('Room',RoomSchema);
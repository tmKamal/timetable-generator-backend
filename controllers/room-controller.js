const Room = require('../models/room');
const HttpError = require('../models/http-error');

const getRoomById = async (req, res, next) => {
    const rid = req.params.rid;
    let room;
    try {
        room = await Room.findById(rid)
            .populate('buildingId')
            .populate({
                path: 'timetable.session1',
                populate: [
                    { path: 'subject' },
                    { path: 'tag' },
                    { path: 'favRoom' },
                    { path: 'selectedLecturer', select: 'lecturerName' }
                ]
            });
    } catch (err) {
        const error = new HttpError('Something went wrong on DB side', 500);
        return next(error);
    }

    if (!room) {
        return next(new HttpError('No room found for the given id!!', 404));
    }
    res.json({ room: room.toObject({ getters: true }) });
};

const getAllRooms = async (req, res) => {
    let rooms;
    try {
        rooms = await Room.find()
            .populate('buildingId')
            .populate({
                path: 'timetable.session1',
                populate: [
                    { path: 'subject' },
                    { path: 'tag' },
                    { path: 'favRoom' },
                    { path: 'selectedLecturer', select: 'lecturerName' }
                ]
            });
    } catch (err) {
        const error = new HttpError('Something went wrong on DB', 500);
        return next(error);
    }
    if (!rooms) {
        const error = new HttpError('No rooms found', 404);
        return next(error);
    }
    res.json({ rooms: rooms.map((b) => b.toObject({ getters: true })) });
};

const addRoom = async (req, res, next) => {

  const { roomName, roomType, roomCapacity, buildingId, roomTags } = req.body;

  let roomTaken;
  try {
    roomTaken = await Room.findOne({roomName:roomName});
  } catch (err) {
    const error = new HttpError("something went wrong on our side! DB error", 500);
    return next(error);
  }
  if(roomTaken){
    const error = new HttpError("Room name is already taken.", 500);
    return next(error);
  }

  const newRoom = new Room({
    roomName,
    roomType,
    roomCapacity,
    roomTags,
    buildingId,
  });

  try {
    await newRoom.save();
  } catch (err) {
    console.log(newRoom);
    const error = new HttpError(
      "Room has not created successfully, error on db",
      500
    );
    return next(error);
  }

  res.status(201).json({ msg: "Room has been added successfully!" });

};

const updateRoom = async (req, res, next) => {
    const roomId = req.params.rid;
    const { roomName, roomType, roomCapacity, buildingId } = req.body;
    let selectedRoom;
    try {
        selectedRoom = await Room.findById(roomId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the room id',
            500
        );
        return next(error);
    }
    selectedRoom.roomName = roomName;
    selectedRoom.roomCapacity = roomCapacity;
    selectedRoom.roomType = roomType;
    selectedRoom.buildingId = buildingId;

    try {
        await selectedRoom.save();
    } catch (err) {
        const error = new HttpError('something went wrong on db side', 500);
        return next(error);
    }

    res.status(200).json({
        room: selectedRoom.toObject({ getters: true }),
        msg: 'Room has updated successfully!!'
    });
};

const setNotAvailableTime = async (req, res, next) => {
    const roomId = req.params.rid;
    const { day, hours, minutes, duration } = req.body;
    let selectedRoom;
    try {
        selectedRoom = await Room.findById(roomId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the room id',
            500
        );
        return next(error);
    }
    const notAvailableTime = {
        day,
        time: { hours, minutes },
        duration
    };
    selectedRoom.notAvailable.push(notAvailableTime);

    try {
        await selectedRoom.save();
    } catch (err) {
        const error = new HttpError('something went wrong on db side', 500);
        return next(error);
    }

    res.status(200).json({
        room: selectedRoom.toObject({ getters: true }),
        msg: 'Not Available time has successfully recorded in the selected room'
    });
};

const deleteRoom = async (req, res, next) => {
    const roomId = req.params.rid;
    let selectedRoom;
    try {
        selectedRoom = await Room.findById(roomId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the given room id'
        );
        return next(error);
    }

    if (!selectedRoom) {
        return next(
            new HttpError('there is no record for the given room id', 404)
        );
    }

    try {
        await selectedRoom.remove();
    } catch (err) {
        const error = new HttpError(
            'couldnt delete the record, something went wrong on db side'
        );
        return next(error);
    }

    res.status(200).json({ room: 'Room has been deleted' });
};
exports.getAllRooms = getAllRooms;
exports.getRoomById = getRoomById;
exports.addRoom = addRoom;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
exports.setNotAvailableTime = setNotAvailableTime;

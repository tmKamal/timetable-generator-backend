const Lecturer = require('../models/lecturer');
const Session = require('../models/session');
const Room = require('../models/room');
const StudentGroup = require('../models/studentGroup');

const generateForGroup = async (groupId, subGroups) => {
    //console.log('Im in group function');

    let tempsessions;
    let consective;
    let normal;
    let parallel;
    let group;
    let room;

    try {
        group = await StudentGroup.findById(groupId);

        tempsessions = await Session.find({
            groupId: { $regex: '.*' + group.groupId + '.*' }
        });

        consective = tempsessions.filter(
            (s) => s.type == 'consecutive' && s.alive == true
        );
        normal = tempsessions.filter(
            (s) => s.type == 'normal' && s.alive == true
        );
        parallel = tempsessions.filter(
            (s) => s.type == 'parallel' && s.alive == true
        );

        consective.forEach(async function (s) {
            console.log('incon');
            try {
                let session1 = await Session.findById(
                    s.consecutive.sessionOne
                ).populate('lecturers');
                let session2 = await Session.findById(
                    s.consecutive.sessionTwo
                ).populate('lecturers');
                let tempLec1 = await Lecturer.findById(
                    session1.lecturers[0]._id
                );
                let tempLec2 = await Lecturer.findById(
                    session2.lecturers[0]._id
                );

                session1.selectedLecturer = session1.lecturers[0]._id;
                session2.selectedLecturer = session1.lecturers[0]._id;
                if (tempLec1.favRoom.lenght > 0) {
                    room = await Room.findById(tempLec1.favRoom[0]);
                    session1.favRoom = tempLec1.favRoom[0];
                } else if (group.favRoom.length > 0) {
                    room = await Room.findById(group.favRoom[0]);
                    session1.favRoom = group.favRoom[0];
                } else {
                    let arr = [0, 1, 2, 3];

                    let rooms = await Room.find();

                    room = rooms[arr[Math.floor(Math.random() * arr.length)]];
                    session1.favRoom = room;
                }
                var timetable = {};
                var timetable2 = {};
                var time = {};
                time.day = group.nextAvailable.day;
                time.stRow = group.nextAvailable.stRow;

                if (time.day >= tempLec1.nextAvailable.day) {
                    if (time.stRow <= tempLec1.nextAvailable.stRow) {
                        time.day = tempLec1.nextAvailable.day;
                        time.stRow = tempLec1.nextAvailable.stRow;
                    }
                    if (time.stRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow =
                            time.stRow +
                            session1.duration +
                            session2.duration +
                            1;
                    }
                    timetable.column = time.day;
                    timetable.stRow = time.stRow;
                    timetable.endRow =
                        timetable.stRow + (session1.duration - 1);
                    timetable.session1 = session1._id;
                    timetable2.column = time.day;
                    timetable2.stRow = timetable.endRow + 1;
                    timetable2.endRow =
                        timetable2.stRow + (session2.duration - 1);
                    timetable2.session1 = session2._id;

                    if (timetable2.endRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow =
                            time.stRow +
                            session1.duration +
                            session2.duration +
                            1;
                    }
                    tempLec1.nextAvailable = time;
                    tempLec1.timetable.unshift(timetable2);
                    tempLec1.timetable.unshift(timetable);
                    group.nextAvailable = time;
                    group.timetable.unshift(timetable2);
                    group.timetable.unshift(timetable);
                    s.alive = false;
                } else {
                    if (time.stRow <= tempLec1.nextAvailable.stRow) {
                        time.stRow = tempLec1.nextAvailable.stRow;
                    }
                    if (time.stRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow =
                            time.stRow +
                            session1.duration +
                            session2.duration +
                            1;
                    }
                    timetable.column = time.day;
                    timetable.stRow = time.stRow;
                    timetable.endRow =
                        timetable.stRow + (session1.duration - 1);
                    timetable.session1 = session1._id;
                    timetable2.column = time.day;
                    timetable2.stRow = timetable.endRow + 1;
                    timetable2.endRow =
                        timetable2.stRow + (session2.duration - 1);
                    timetable2.session1 = session2._id;

                    if (timetable2.endRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow =
                            time.stRow +
                            session1.duration +
                            session2.duration +
                            1;
                    }
                    tempLec1.nextAvailable = time;
                    tempLec1.timetable.unshift(timetable2);
                    tempLec1.timetable.unshift(timetable);
                    group.nextAvailable = time;
                    room.timetable.unshift(timetable2);
                    room.timetable.unshift(timetable);
                    group.timetable.unshift(timetable2);
                    group.timetable.unshift(timetable);
                    s.alive = false;
                }
                await room.save();
                await s.save();
                await group.save();
                await session1.save();
                await session2.save();
                await tempLec1.save();
            } catch (error) {
                console.log(error);
                return 500;
            }
        });

        normal.forEach(async function (s) {
            try {
                var timetable = {};
                var time = {};
                time.day = group.nextAvailable.day;
                time.stRow = group.nextAvailable.stRow;
                let tempLec1 = await Lecturer.findById(s.lecturers[0]);
                s.selectedLecturer = s.lecturers[0];
                if (tempLec1.favRoom.lenght > 0) {
                    room = await Room.findById(tempLec1.favRoom[0]);
                    session1.favRoom = tempLec1.favRoom[0];
                } else if (group.favRoom.length > 0) {
                    room = await Room.findById(group.favRoom[0]);
                    session1.favRoom = group.favRoom[0];
                } else {
                    let arr = [0, 1, 2, 3];

                    let rooms = await Room.find();

                    room =
                        rooms[arr[Math.floor(Math.random() * arr.length)]]._id;
                    session1.favRoom = room;
                }
                if (time.day >= tempLec1.nextAvailable.day) {
                    if (time.stRow <= tempLec1.nextAvailable.stRow) {
                        time.day = tempLec1.nextAvailable.day;
                        time.stRow = tempLec1.nextAvailable.stRow;
                    }
                    if (time.stRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow = time.stRow + s.duration + 1;
                    }
                } else {
                    if (time.stRow <= tempLec1.nextAvailable.stRow) {
                        time.stRow = tempLec1.nextAvailable.stRow;
                    }
                    if (time.stRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow = time.stRow + s.duration + 1;
                    }
                }
                timetable.column = time.day;
                timetable.stRow = time.stRow;
                timetable.endRow = timetable.stRow + (s.duration - 1);
                timetable.session1 = s._id;
                group.nextAvailable = time;
                group.timetable.unshift(timetable);
                tempLec1.timetable.unshift(timetable);
                tempLec1.nextAvailable = time;
                s.alive = false;
                room.timetable.unshift(timetable);
                await group.save();
                await s.save();
                await tempLec1.save();
            } catch (error) {
                console.log(error);
                return 500;
            }
        });
        return 200;
    } catch (error) {
        console.log(error);
        return 500;
    }
    return 500;
};

exports.generateForGroup = generateForGroup;

const Lecturer = require('../models/lecturer');
const Session = require('../models/session');
const StudentGroup = require('../models/studentGroup');

const generateForGroup = async (group, subGroups) => {
    // console.log('Im in group function');
    //console.log(group);

    let tempsessions;
    let consective;
    let normal;
    let parallel;

    try {
        tempsessions = await Session.find({
            groupId: { $regex: '.*' + group.groupId + '.*' }
        }).populate('tag');
        consective = tempsessions.filter((s) => s.type == 'consecutive');
        normal = tempsessions.filter((s) => s.type == 'normal');
        parallel = tempsessions.filter((s) => s.type == 'parallel');

        consective.forEach(async function (s) {
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
                session2.selectedLecturer = session2.lecturers[0]._id;

                var timetable = {};
                var time = {};
                time.day = group.nextAvailable.day;
                time.stRow = group.nextAvailable.stRow;

                if (time.day == tempLec1.nextAvailable.day) {
                    timetable.column = time.day;
                    timetable.stRow = time.stRow;
                    timetable.endRow = time.stRow + session1.duration;
                    timetable.sessions = [];
                    if (time.stRow >= 7) {
                        time.day = time.day + 1;
                        time.stRow = 0;
                    } else {
                        time.stRow = time.stRow + session1.duration;
                    }
                    console.log(timetable);
                    tempLec1.nextAvailable = time;
                    group.nextAvailable = time;

                    group.timetable.unshift(timetable);
                    await group.save();

                    //tempGroup.timetable.sessions.unshift(
                    //  s.consecutive.sessionOne
                    // );
                    await tempLec1.save();

                    console.log(group);
                }
            } catch (error) {
                console.log(error);
            }
        });

        return group;
    } catch (error) {
        console.log(error);
    }
};

exports.generateForGroup = generateForGroup;

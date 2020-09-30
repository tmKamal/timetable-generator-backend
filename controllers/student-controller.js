const Student = require("../models/student");
const HttpError = require("../models/http-error");

const getStudentById = async (req, res, next) => {
  const sid = req.params.sid;
  let student;
  try {
    student = await Student.findById(sid);
  } catch (err) {
    const error = new HttpError("Something went wrong on DB side", 500);
    return next(error);
  }

  if (!student) {
    return next(new HttpError("No student found for the given id!!", 404));
  }
  res.json({ student: student.toObject({ getters: true }) });
};

const getAllStudents = async (req, res) => {
  let students;
  try {
    students = await Student.find();
  } catch (err) {
    const error = new HttpError("Something went wrong on DB", 500);
    return next(error);
  }
  if (!students) {
    const error = new HttpError("No Students found", 404);
    return next(error);
  }
  res.json({ students: students.map((b) => b.toObject({ getters: true })) });
};

const addStudent = async (req, res, next) => {
  const { academicYearSem, programme, groupNumber, subGroupNumber } = req.body;
  const groupId=academicYearSem+'.'+programme+'.'+groupNumber+'.'+subGroupNumber;
  const newStudent = new Student({
    academicYearSem,
    programme,
    groupNumber,
    subGroupNumber,
    groupId
  });
  

  try {
    await newStudent.save();
  } catch (err) {
    console.log(newStudent);
    const error = new HttpError(
      "Student has not created successfully, error on db",
      500
    );
    return next(error);
  }

  res.status(201).json({ msg: "Student has been added successfully!" });
};

const updateStudent = async (req, res, next) => {
  const studentId = req.params.sid;
  const { academicYearSem, programme, groupNumber, subGroupNumber } = req.body;
  let selectedStudent;
  try {
    selectedStudent = await Student.findById(studentId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong on db side, when finding the Stdudent id",
      500
    );
    return next(error);
  }
  selectedStudent.academicYearSem = academicYearSem;
  selectedStudent.programme = programme;
  selectedStudent.groupNumber = groupNumber;
  selectedStudent.subGroupNumber = subGroupNumber;

  try {
    await selectedStudent.save();
  } catch (err) {
    const error = new HttpError("something went wrong on db side", 500);
    return next(error);
  }

  res.status(200).json({
    student: selectedStudent.toObject({ getters: true }),
    msg: "Student has updated successfully!!",
  });
};

const setNotAvailableTime = async (req, res, next) => {
  const studentId = req.params.sid;
  const { day, hours, minutes, duration } = req.body;
  let selectedStudent;
  try {
    selectedStudent = await Student.findById(studentId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong on DB side, when finding the Student ID",
      500
    );
    return next(error);
  }
  const notAvailableTime = {
    day,
    time: { hours, minutes },
    duration,
  };
  selectedStudent.notAvailable.push(notAvailableTime);

  try {
    await selectedStudent.save();
  } catch (err) {
    const error = new HttpError("Something went wrong on DB side", 500);
    return next(error);
  }

  res.status(200).json({
    students: selectedStudent.toObject({ getters: true }),
    msg:
      "Not Available time has been successfully recorded in to the Selected Student",
  });
};

const deleteStudent = async (req, res, next) => {
  const studentId = req.params.sid;
  let selectedStudent;
  try {
    selectedStudent = await Student.findById(studentId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong on db side, when finding the given student id"
    );
    return next(error);
  }

  if (!selectedStudent) {
    return next(
      new HttpError("there is no record for the given student id", 404)
    );
  }

  try {
    await selectedStudent.remove();
  } catch (err) {
    const error = new HttpError(
      "couldnt delete the record, something went wrong on db side"
    );
    return next(error);
  }

  res.status(200).json({ student: "Student has been deleted" });
};

const setRoomForSubGroup = async (req, res, next) => {
  const groupId = req.params.gid;
  const { roomId } = req.body;
  let selectedGroup;
  try {
    selectedGroup = await Student.findById(groupId);
  } catch (e) {
    const error = new HttpError(
      "something went wrong on db side, when finding the group id",
      500
    );
    return next(error);
  }

  selectedGroup.favRoom.push(roomId);
  try {
    await selectedGroup.save();
  } catch (e) {
    const error = new HttpError("something went wrong on db side", 500);
    return next(error);
  }
  res.status(200).json({
    subGroup: selectedGroup.toObject({ getters: true }),
    msg: "Room has been marked as preferred for the selected Sub Group.",
  });
};

exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudentById = getStudentById;
exports.setNotAvailableTime = setNotAvailableTime;
exports.setRoomForSubGroup = setRoomForSubGroup;

const StudentGroup = require("../models/studentGroup");
const HttpError = require("../models/http-error");

const getStudentGroupById = async (req, res, next) => {
  const sid = req.params.sid;
  let studentGroup;
  try {
    studentGroup = await StudentGroup.findById(sid);
  } catch (err) {
    const error = new HttpError("Something went wrong on DB side", 500);
    return next(error);
  }

  if (!studentGroup) {
    return next(
      new HttpError("No student Group found for the given id!!", 404)
    );
  }
  res.json({ studentGroup: studentGroup.toObject({ getters: true }) });
};

const getAllStudentGroups = async (req, res) => {
  let students;
  try {
    students = await StudentGroup.find();
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

const addStudentGroup = async (req, res, next) => {
  const { academicYearSem, programme, groupNumber } = req.body;

  const newStudent = new StudentGroup({
    academicYearSem,
    programme,
    groupNumber,
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

const updateStudentGroup = async (req, res, next) => {
  const studentId = req.params.sid;
  const { academicYearSem, programme, groupNumber } = req.body;
  let selectedStudent;
  try {
    selectedStudent = await StudentGroup.findById(studentId);
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

  try {
    await selectedStudent.save();
  } catch (err) {
    const error = new HttpError("something went wrong on db side", 500);
    return next(error);
  }

  res.status(200).json({
    student: selectedStudent.toObject({ getters: true }),
    msg: "Student Group has updated successfully!!",
  });
};

const deleteStudentGroup = async (req, res, next) => {
  const studentId = req.params.sid;
  let selectedStudent;
  try {
    selectedStudent = await StudentGroup.findById(studentId);
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

exports.getAllStudentGroups = getAllStudentGroups;
exports.addStudentGroup = addStudentGroup;
exports.updateStudentGroup = updateStudentGroup;
exports.deleteStudentGroup = deleteStudentGroup;
exports.getStudentGroupById = getStudentGroupById;

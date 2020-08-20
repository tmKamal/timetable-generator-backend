const Student = require("../models/student");
const HttpError = require("../models/http-error");

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
  res.json({ students: students.toObject({ getters: true }) });
};

const addStudent = async (req, res, next) => {
  const { academicYearSem, programme, groupNumber, subGroupNumber } = req.body;

  const newStudent = new Building({
    academicYearSem,
    programme,
    groupNumber,
    subGroupNumber,
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

  res.status(201).json({ Location: newStudent.toObject({ getters: true }) });
};

exports.getAllStudents = getAllStudents;
exports.addStudent = addStudent;

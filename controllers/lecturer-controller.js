const Building = require("../models/lecturer");
const HttpError = require("../models/http-error");



const getAllLecturers =  async(req, res) => {
  let lecturers;
  try{
      lecturers =await Lecturer.find();
  }catch(err){
    const error=new HttpError('Something went wrong on DB',500);
    return next(error);
  }
  if(!lecturers){
    const error=new HttpError('No Lecturers found',404);  
    return next(error);
  }
  res.json({lecturers:lecturers.toObject({getters:true})});
  
};

const addLecturer = async (req, res, next) => {
 
  const { lecturerName,empId,faculty,department,center,building,level } = req.body;
  
  const newLecturer = new Lecturer({
    lecturerName,
    empId,
    faculty,
    department,
    center,
    building,
    level
  });

  try {
    await newLecturer.save();
  } catch (err) {
      console.log(newLecturer);
    const error = new HttpError("Lecturer has not created successfully, error on db", 500);
    return next(error);
  }

  res.status(201).json({Location:newLecturer.toObject({getters:true})});
};




exports.getAllLecturers=getAllLecturers;
exports.addLecturer=addLecturer;
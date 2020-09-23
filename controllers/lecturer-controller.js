const Lecturer = require("../models/lecturer");
const HttpError = require("../models/http-error");


const getLecturerById = async (req, res, next) => {
  const lid = req.params.lid;
  let lecturer;
  try {
      lecturer = await Building.findById(bid);
  } catch (err) {
      const error = new HttpError('Something went wrong on DB side', 500);
      return next(error);
  }

  if (!lecturer) {
      return next(new HttpError('No lecturer found for the given id!!', 404));
  }
  res.json({ lecturer: lecturer.toObject({ getters: true }) });
};

const getAllLecturers =  async(req, res) => {
  let lecturers;
  try{
    lecturers =await Lecturer.find().populate('building');
  }catch(err){
    const error=new HttpError('Something went wrong on DB',500);
    return next(error);
  }
  if(!lecturers){
    const error=new HttpError('No Lecturer found',404);  
    return next(error);
  }
  res.json({lecturers:lecturers.map((b)=>(b.toObject({getters:true})))});
  
};


const addLecturer = async (req, res, next) => {
 
    const { lecturerName,empId,faculty,department,center,building,level } = req.body;
    const rank = level + '.' + empId;
    
    const newLecturer = new Lecturer({
        lecturerName,
        empId,
        faculty,
        department,
        center,
        building,
        level,
        rank,
    });
  
    try {
      await newLecturer.save();
    } catch (err) {
        console.log(newLecturer);
      const error = new HttpError("Lecturer has not created successfully, error on db", 500);
      return next(error);
    }
  
    res.status(201).json({msg:'Lecturer has been added successfully!'});
  };

  const updateLecturer = async (req, res, next) => {
  
    const lecturerId = req.params.lid;
    const { lecturerName,empId,faculty,department,center,building,level } = req.body;
    let selectedLecturer;
    try {
      selectedLecturer = await Lecturer.findById(lecturerId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the lecturer id',
            500
        );
        return next(error);
    }
    selectedLecturer.lecturerName = lecturerName;
    selectedLecturer.empId = empId;
    selectedLecturer.faculty = faculty;
    selectedLecturer.department = department;
    selectedLecturer.center = center;
    selectedLecturer.building = building;
    selectedLecturer.level = level;
  
    try {
        await selectedLecturer.save();
    } catch (err) {
        const error = new HttpError('something went wrong on db side', 500);
        return next(error);
    }
  
    res.status(200).json({
        lecturer: selectedLecturer.toObject({ getters: true }),msg:'Lecturer has updated successfully!!'
    });
  };

  const deleteLecturer = async (req, res, next) => {
    const lecturerId = req.params.lid;
    let selectedLecturer;
    try {
      selectedLecturer = await Lecturer.findById(lecturerId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the given lecturer id'
        );
        return next(error);
    }
  
    if (!selectedLecturer) {
        return next(
            new HttpError('there is no record for the given lecturer id', 404)
        );
    }
  
    try {
        await selectedLecturer.remove();
    } catch (err) {
        const error = new HttpError(
            'could not delete the record, something went wrong on db side'
        );
        return next(error);
    }
  
    res.status(200).json({ lecturer: 'Building has been deleted' });
  };

  const setRoomForLecturer = async (req, res, next) => {
    const lecturerId = req.params.lid;
    const { roomId } = req.body;
    let selectedLecturer;
    try {
      selectedLecturer = await Lecturer.findById(lecturerId);
    } catch (e) {
      const error = new HttpError(
        "something went wrong on db side, when finding the lecturer id",
        500
      );
      return next(error);
    }
    
    selectedLecturer.favRoom.push(roomId);
    try {
      await selectedLecturer.save();
    } catch (e) {
      const error = new HttpError("something went wrong on db side", 500);
      return next(error);
    }
    res.status(200).json({
      lecturer: selectedLecturer.toObject({ getters: true }),
      msg: "Room has been marked as preferred for the selected lecturer.",
    });
  };

  exports.addLecturer=addLecturer;
  exports.getAllLecturers = getAllLecturers;
  exports.updateLecturer = updateLecturer;
  exports.deleteLecturer = deleteLecturer;
  exports.getLecturerById = getLecturerById;
  exports.setRoomForLecturer=setRoomForLecturer;
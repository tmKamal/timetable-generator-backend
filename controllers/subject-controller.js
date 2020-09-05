const Subject = require("../models/subject");
const HttpError = require("../models/http-error");


const getSubjectById = async (req, res, next) => {
  const sid = req.params.sid;
  let subject;
  try {
      subject = await Subject.findById(sid);
  } catch (err) {
      const error = new HttpError('Something went wrong on DB side getbyid', 500);
      return next(error);
  }

  if (!subject) {
      return next(new HttpError('No Subject found for the given id!!', 404));
  }
  res.json({ subject: subject.toObject({ getters: true }) });
};


const getAllSubjects =  async(req, res) => {
  let subjects;
  try{
      subjects =await Subject.find();
  }catch(err){
    const error=new HttpError('Something went wrong on DB getall',500);
    return next(error);
  }
  if(!subjects){
    const error=new HttpError('No Subject found',404);  
    return next(error);
  }
  res.json({subjects:subjects.map((b)=>(b.toObject({getters:true})))});
  
};


const addSubject = async (req, res, next) => {
 
    const { subjectName,subjectCode,offeredYear,offeredSemester,lectureHours,tutorialHours,labHours,evaluationHours } = req.body;
    
    const newSubject = new Subject({
        subjectName,
        subjectCode,
        offeredYear,
        offeredSemester,
        lectureHours,
        tutorialHours,
        labHours,
        evaluationHours,
    });
  
    try {
      await newSubject.save();
    } catch (err) {
        console.log(newSubject);
      const error = new HttpError("Subject has not created successfully, error on db", 500);
      return next(error);
    }
  
    res.status(201).json({msg:'Subject has been added successfully!'});
  };

  const updateSubject = async (req, res, next) => {
  
    const subjectId = req.params.sid;
    const { subjectName,subjectCode,offeredYear,offeredSemester,lectureHours,tutorialHours,labHours,evaluationHours } = req.body;
    let selectedSubject;
    try {
      selectedSubject = await Subject.findById(subjectId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the Subject id',
            500
        );
        return next(error);
    }
    selectedSubject.subjectName = subjectName;
    selectedSubject.subjectCode = subjectCode;
    selectedSubject.offeredYear = offeredYear;
    selectedSubject.offeredSemester = offeredSemester;
    selectedSubject.lectureHours = lectureHours;
    selectedSubject.tutorialHours = tutorialHours;
    selectedSubject.labHours = labHours;
    selectedSubject.evaluationHours = evaluationHours;

  
    try {
        await selectedSubject.save();
    } catch (err) {
        const error = new HttpError('something went wrong on db side updatesub', 500);
        return next(error);
    }
  
    res.status(200).json({
        subject: selectedSubject.toObject({ getters: true }),msg:'Subject has updated successfully!!'
    });
  };

  const deleteSubject = async (req, res, next) => {
    const subjectId = req.params.sid;
    let selectedSubject;
    try {
      selectedSubject = await Subject.findById(subjectId);
    } catch (err) {
        const error = new HttpError(
            'something went wrong on db side, when finding the given subject id'
        );
        return next(error);
    }
  
    if (!selectedSubject) {
        return next(
            new HttpError('there is no record for the given subject id', 404)
        );
    }
  
    try {
        await selectedSubject.remove();
    } catch (err) {
        const error = new HttpError(
            'couldnt delete the record, something went wrong on db side'
        );
        return next(error);
    }
  
    res.status(200).json({ subject: 'Subject has been deleted' });
  };
  

  exports.addSubject=addSubject;
  exports.getAllSubjects=getAllSubjects;
  exports.getSubjectById=getSubjectById;
  exports.updateSubject=updateSubject;
  exports.deleteSubject=deleteSubject;

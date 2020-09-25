const Session = require("../models/session");
const HttpError = require("../models/http-error");


const getAllSessions =  async(req, res) => {
    let sessions;
    try{
        sessions =await Session.find().populate('tag').populate('studentGroup').populate('subGroup');
    }catch(err){
      const error=new HttpError('Something went wrong on DB',500);
      return next(error);
    }
    if(!sessions){
      const error=new HttpError('No session found',404);  
      return next(error);
    }
    res.json({sessions:sessions.map((b)=>(b.toObject({getters:true})))});
    
  };

  const addSession = async (req, res, next) => {
 
    const { lecturers,tag,studentGroup,subGroup,subject,studentCount,duration,subjectCode,hours,minutes } = req.body;
    console.log(lecturers);
    let newSession;
    if(studentGroup !=''){
      newSession = new Session({
        lecturers,
        tag,
        studentGroup,
        subject,
        subjectCode,
        studentCount,
        startTime:{
          hours,minutes
        },
        duration
    });
    }else{
      newSession = new Session({
        lecturers,
        tag,
        subGroup,
        subject,
        subjectCode,
        studentCount,
        startTime:{
          hours,minutes
        },
        duration
    });
    }
    
    
  
    try {
      await newSession.save();
    } catch (err) {
        console.log(err);
      const error = new HttpError("session has not created successfully, error on db", 500);
      return next(error);
    }
  
    res.status(201).json({msg:'session has been added successfully!'});
  };

  const setRoomForSession = async (req, res, next) => {
    const sessionId = req.params.sid;
    const { roomId } = req.body;
    let selectedSession;
    try {
      selectedSession = await Session.findById(sessionId);
    } catch (e) {
      const error = new HttpError(
        "something went wrong on db side, when finding the session id",
        500
      );
      return next(error);
    }
    
    selectedSession.favRoom.push(roomId);
    try {
      await selectedSession.save();
    } catch (e) {
      const error = new HttpError("something went wrong on db side", 500);
      return next(error);
    }
    res.status(200).json({
      session: selectedSession.toObject({ getters: true }),
      msg: "Room has been marked as preferred for the selected Session.",
    });
  };

  exports.addSession=addSession;
  exports.getAllSessions = getAllSessions;
  exports.setRoomForSession=setRoomForSession;
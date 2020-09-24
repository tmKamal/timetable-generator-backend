const Session = require("../models/session");
const HttpError = require("../models/http-error");

const getAllSessions =  async(req, res) => {
    let sessions;
    try{
        sessions =await Session.find().populate('subjectId');
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
 
    const { lecturers,tag,studentGroup,subject,studentCount,duration,subjectCode,hours,minutes } = req.body;
    console.log(lecturers);
    
    const newSession = new Session({
        lecturers,
        tag,
        studentGroup,
        //subGroup,
        subject,
        subjectCode,
        studentCount,
        startTime:{
          hours,minutes
        },
        duration
    });
  
    try {
      await newSession.save();
    } catch (err) {
        console.log(err);
      const error = new HttpError("session has not created successfully, error on db", 500);
      return next(error);
    }
  
    res.status(201).json({msg:'session has been added successfully!'});
  };

  exports.addSession=addSession;
  exports.getAllSessions = getAllSessions;
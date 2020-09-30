const Session = require("../models/session");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");

const getAllSessions = async (req, res) => {
  let sessions;
  try {
    sessions = await Session.find()
      .populate("tag")
      .populate("studentGroup")
      .populate("lecturers")
      .populate("subjects")
      .populate("subGroup");
  } catch (err) {
    const error = new HttpError("Something went wrong on DB", 500);
    return next(error);
  }
  if (!sessions) {
    const error = new HttpError("No session found", 404);
    return next(error);
  }
  res.json({ sessions: sessions.map((b) => b.toObject({ getters: true })) });
};

const addSession = async (req, res, next) => {
  const {
    lecturers,
    tag,
    studentGroup,
    subGroup,
    subject,
    studentCount,
    duration,
    subjectCode,
    hours,
    minutes,
  } = req.body;
  console.log(lecturers);
  let newSession;
  if (studentGroup != "") {
    newSession = new Session({
      lecturers,
      tag,
      studentGroup,
      subject,
      subjectCode,
      studentCount,
      startTime: {
        hours,
        minutes,
      },
      duration,
    });
  } else {
    newSession = new Session({
      lecturers,
      tag,
      subGroup,
      subject,
      subjectCode,
      studentCount,
      startTime: {
        hours,
        minutes,
      },
      duration,
    });
  }

  try {
    await newSession.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "session has not created successfully, error on db",
      500
    );
    return next(error);
  }

  res.status(201).json({ msg: "session has been added successfully!" });
};

const setNotAvailableTime = async (req, res, next) => {
  const sessionId = req.params.sid;
  const { day, hours, minutes, duration } = req.body;
  let selectedSession;
  try {
    selectedSession = await Session.findById(sessionId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong on DB side, when finding the Session ID",
      500
    );
    return next(error);
  }
  const notAvailableTime = {
    day,
    time: { hours, minutes },
    duration,
  };
  selectedSession.notAvailable.push(notAvailableTime);

  try {
    await selectedSession.save();
  } catch (err) {
    const error = new HttpError("Something went wrong on DB side", 500);
    return next(error);
  }

  res.status(200).json({
    session: selectedSession.toObject({ getters: true }),
    msg:
      "Not Available time has been successfully recorded, in to the Selected Session",
  });
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

const addConsecutiveSessions = async (req, res, next) => {
  const { firstSessionId, secondSessionId,duration } = req.body;

  const consecutiveSession = new Session({
    type: "consecutive",
    consecutive: {
      sessionOne: firstSessionId,
      sessionTwo: secondSessionId,
      
    },
    duration,
  });
  let firstSession;
  let secondSession;
  try {
    firstSession = await Session.findById(firstSessionId);
    secondSession = await Session.findById(secondSessionId);
  } catch (e) {
    const error = new HttpError(
      "Something went wrong, when finding the sessions id in DB" + e,
      500
    );
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await consecutiveSession.save({ session: sess });
    firstSession.alive = false;
    await firstSession.save({ session: sess });
    secondSession.alive = false;
    await secondSession.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(consecutiveSession);
    const error = new HttpError(
      "Consecutive session has not created successfully, error on db" + err,
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ msg: "Consecutive session has been added successfully!" });
};

const addParallelSessions = async (req, res, next) => {
  const { sessionArray } = req.body;

  const parallelSession = new Session({
    type: "parallel",
    parallel: {
      sessions: sessionArray,
    },
  });
  /* Loop one */
  let count = sessionArray.length;
  console.log("session length"+count);
  for (let i = 0;i< count; i++) {
    console.log('im in!!')
    let tempSession;
    try {
      tempSession = await Session.findById(sessionArray[i]);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, when finding the sessions id in DB" + e,
        500
      );
      return next(error);
    }
    if(!tempSession){
      const error = new HttpError(
        "Session not found!" + e,
        500
      );
      return next(error);
    }
    tempSession.alive=false;

    try {
      await tempSession.save();
      console.log("round completed")
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, when saving the sessions id in DB" + e,
        500
      );
      return next(error);
    }
  }
  try {
    await parallelSession.save();
  } catch (err) {
    console.log(parallelSession);
    const error = new HttpError(
      "Parallel session has not created successfully, error on db",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ msg: "Parallel session has been added successfully!" });
};

exports.addSession = addSession;
exports.getAllSessions = getAllSessions;
exports.setRoomForSession = setRoomForSession;
exports.setNotAvailableTime = setNotAvailableTime;
exports.addConsecutiveSessions = addConsecutiveSessions;
exports.addParallelSessions = addParallelSessions;

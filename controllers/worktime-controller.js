const WorkTime = require('../models/worktime');
const HttpError = require('../models/http-error');

const getWorkTime = async (req, res) => {
    let worktime;
    try {
        worktime = await WorkTime.find();
        res.json(worktime[worktime.length - 1]);
    } catch (err) {}
    if (!worktime) {
        const error = new HttpError('No WorkTime found', 404);
        return next(error);
    }
};

const addWorkTime = async (req, res, next) => {
    const { hours, minutes } = req.body.time;
    const time = { hours, minutes };
    let slot = req.body.slot;

    const newWorkTime = new WorkTime({
        time,
        slot
    });
    try {
        await newWorkTime.save();
        res.status(201).json({ msg: 'worktime has been added successfully!' });
    } catch (err) {
        const error = new HttpError(
            'Work time has not created successfully, error on db',
            500
        );
        return next(error);
    }
};

const updateWorkTime = async (req, res, next) => {
    const { hours, minutes } = req.body.time;
    const time = { hours, minutes };
    let slot = req.body.slot;
    let id = req.body.id;
    try {
        let worktime = await WorkTime.findById(id);
        worktime.time = time;
        worktime.slot = slot;

        await worktime.save();
        return res
            .status(200)
            .json({ msg: 'worktime has been updated successfully!' });
    } catch (err) {
        const error = new HttpError(
            'Failed to update work Time please try again, error on db',
            500
        );
        return next(error);
    }
};

exports.getWorkTime = getWorkTime;
exports.addWorkTime = addWorkTime;
exports.updateWorkTime = updateWorkTime;

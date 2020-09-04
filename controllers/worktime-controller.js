const WorkTime = require('../models/worktime');
const HttpError = require('../models/http-error');

const getWorkTime = async (req, res) => {
    let wdays;
    try {
        wdays = await Workday.find();
        res.json(wdays);
    } catch (err) {
        const error = new HttpError('Something went wrong on DB', 500);
        return next(error);
    }
    if (!wdays) {
        const error = new HttpError('No WorkTime found', 404);
        return next(error);
    }
};

const addWorkDays = async (req, res, next) => {
    const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    } = req.body.days;
    const days = {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    };
    const countDays = req.body.countDays;
    const newWorkdays = new Workday({
        days,
        countDays
    });

    try {
        await newWorkdays.save();
        res.status(200).json(newWorkdays);
    } catch (err) {
        console.log(newWorkdays);
        const error = new HttpError(
            'Building has not created successfully, error on db',
            500
        );
        return next(error);
    }
};

exports.getWorkTime = getWorkTime;
exports.addWorkTime = addWorkTime;

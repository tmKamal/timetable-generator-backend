const Workday = require('../models/workday');
const HttpError = require('../models/http-error');

const getWorkDays = async (req, res) => {
    let wdays;
    try {
        wdays = await Workday.find();

        res.json(wdays[wdays.length - 1]);
    } catch (err) {
        const error = new HttpError('Something went wrong on DB', 500);
        return next(error);
    }
    if (!wdays) {
        const error = new HttpError('No Workdays found', 404);
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
            'Workdays has not created successfully, error on db',
            500
        );
        return next(error);
    }
};

const updateWorkDays = async (req, res, next) => {
    const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        
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
    const id = req.body.id;
    try {
        let workday = await Workday.findById(id);
        workday.days = days;
        workday.countDays = countDays;
        await workday.save();
        res.json(workday);
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            'Workdays has not created successfully, error on db',
            500
        );
        return next(error);
    }
};

exports.getWorkDays = getWorkDays;
exports.addWorkDays = addWorkDays;
exports.updateWorkDays = updateWorkDays;

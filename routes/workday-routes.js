const express = require('express');
const router = express.Router();
const WorkDayController = require('../controllers/workday-controller');

router.get('/', WorkDayController.getAllBuildings);
router.post('/', WorkDayController.addBuilding);

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'we are up!!'
    });
});
module.exports = router;

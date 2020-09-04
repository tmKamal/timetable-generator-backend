const express = require('express');
const router = express.Router();
const WorkTimeController = require('../controllers/worktime-controller');

router.get('/', WorkTimeController.getAllBuildings);
router.post('/', WorkTimeController.addBuilding);

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'we are up!!'
    });
});
module.exports = router;

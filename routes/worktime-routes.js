const express = require('express');
const router = express.Router();
const WorkTimeController = require('../controllers/worktime-controller');

router.get('/', WorkTimeController.getWorkTime);
router.post('/', WorkTimeController.addWorkTime);
router.patch('/time', WorkTimeController.updateWorkTime);
router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'we are up!!'
    });
});
module.exports = router;

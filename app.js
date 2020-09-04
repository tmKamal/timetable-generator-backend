const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const buildingRoutes = require('./routes/building-routes');
const workdayRoutes = require('./routes/workday-routes');
const workTimeRoutes = require('./routes/worktime-routes');
const HttpError = require('./models/http-error');

const app = express();

// db
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log('DB connected!!!');
    })
    .catch((err) => {
        console.log(err);
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//cors error handler
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
//routes middleware

app.use('/api/building', buildingRoutes);
app.use('/api/workdays', workdayRoutes);
app.use('/api/worktime', workTimeRoutes);
//Error Handler
app.use((req, res, next) => {
    const error = new HttpError('page not found!', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        //when headers already sent, we can't output a error. because response already sent. so just return next
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!!' });
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});

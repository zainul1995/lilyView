/* eslint-disable */
const path = require('path');
const express = require('express');
const app = express();
const studentRouter = require('./studentRoutes');
const userRouter = require('./dreamProject/userRoutes');
const viewRouter =  require('./dreamProject/viewRoutes');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './dreamProject/views'));
app.use(express.static(path.join(__dirname, 'public')));
// web app for youtube
const Student = require('./StudentModel');

app.use(compression());
app.get('/tours', (req, res) =>{
    console.log(req);
    // res.send('happy from server side');
    res.status(401).json({
        status: 'successful',
        message: 'authorRequest',
        data:{
            name: 'zainul',
            roll: 27,
            property: 'king'
        }
    })
});
app.post('/tours', async (req, res, next) => {
        const doc = await Student.create(req.body);    
        res.status(201).json({
          status: 'success',
          data: {
            data: doc
          }
        });
        next();
});
app.use('/', viewRouter);
app.use('/students', studentRouter);
app.use('/api/v1/user', userRouter);
module.exports = app;
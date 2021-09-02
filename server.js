const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse())

const wmlRoutes = require("./routes/wml");
const userRoutes = require('./routes/users');

app.use("/api/wml", wmlRoutes);
app.use('/users',userRoutes);

require('./db/conn')

const User = require('./models/users');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server listening at',port)
})
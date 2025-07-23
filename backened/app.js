const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
dbConect = require('./config/db');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

app= express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use('/api/auth',authRoutes );


dbConect();

module.exports = app;
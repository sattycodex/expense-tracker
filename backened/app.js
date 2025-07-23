const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
dbConect = require('./config/db');
const authRoutes = require('./routes/auth.route');
const homeRoutes = require('./routes/dashboard.route');
const categoryRoutes = require('./routes/category.routes');
const transactionRoutes = require('./routes/transaction.routes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth.middleware');

app= express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); 
app.use(cookieParser());

app.use('/api/auth',authRoutes );
app.use('/api/dashboard',authMiddleware, homeRoutes);
app.use('/api/category',authMiddleware, categoryRoutes);
app.use('/api/transaction',authMiddleware, transactionRoutes);

dbConect();

module.exports = app;
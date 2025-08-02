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
const demoRoutes = require('./routes/demo');
const passport = require('passport')
const session = require('express-session');
const { successResponse, errorResponse } = require('./utils/response');
require('./utils/google-oauth')

app= express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',   
//     credentials: true,
//   })
// );

//passport oauth
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

//google oauth routes
app.get('/auth/google',
  passport.authenticate(
    'google', 
    { scope: ['profile', 'email'] }
  ));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', 
    { 
      failureRedirect: 'http://localhost:5173/error', 
      successRedirect: 'http://localhost:5173/oauth-google?token=123'
    }
  ),
);

app.use('/api/auth',authRoutes );
app.use('/api/dashboard',authMiddleware, homeRoutes);
app.use('/api/category',authMiddleware, categoryRoutes);
app.use('/api/transaction',authMiddleware, transactionRoutes);

app.use('',demoRoutes);

dbConect();

module.exports = app;
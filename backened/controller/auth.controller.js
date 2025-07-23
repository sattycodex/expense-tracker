const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { errorResponse, successResponse } = require('../utils/response');
const { generateAccessToken ,generateRefreshToken} = require('../utils/generate-token');
const Category = require('../models/category.model');

exports.register = async (req, res) => {
   
    const { username,email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) errorResponse(res, 'User already exists', 'Registration failed', 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username,email, password: hashedPassword , refreshToken:''});
        await newUser.save();
        const defaultCategory = new Category({
          createBy: newUser._id,
          name: 'General'
        });
        await defaultCategory.save();
        successResponse(res, { username, email }, 'User registered successfully');
        
    } catch (err) {
        errorResponse(res, err, 'Registration failed');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return errorResponse(res, 'User not found', 'Login failed', 404);    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return errorResponse(res, 'Invalid password', 'Login failed', 401);   

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        await res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        successResponse(res, { token:accessToken, user: { username: user.username, email: user.email } }, 'Login successful');
    } catch (err) {
        errorResponse(res, err, 'Login failed');
    }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) errorResponse(res, 'No refresh token provided', 'Token refresh failed', 403);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) errorResponse(res, 'Invalid refresh token', 'Token refresh failed', 403);

    const accessToken = generateAccessToken(user);
    successResponse(res, { token: accessToken}, 'Token refreshed successfully');
  } catch (err) {
    errorResponse(res, err, 'Token refresh failed', 403);
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) errorResponse(res, 'No refresh token provided', 'Logout failed', 403);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie('refreshToken', { path: '/' });
    successResponse(res, null, 'Logged out successfully');
  } catch (err) {
    errorResponse(res, err, 'Logout failed', 403);
  }
};
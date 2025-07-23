const { errorResponse, successResponse } = require('../utils/response');

exports.home=(req,res)=>{
    successResponse(res, 'Welcome to the Expense Tracker API', 'Home page accessed successfully', 200);
}
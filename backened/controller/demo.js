const { successResponse } = require("../utils/response");

exports.demo=(req,res)=>{
    console.log("this is demo controller");
    successResponse(res, { message: "Demo endpoint hit successfully" }, "Demo response sent");
}
exports.successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

exports.errorResponse = (res, error, message = 'Error', statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    error: error instanceof Error ? error.message : error,
  });
}
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`❌ Error [${statusCode}]: ${err.message}`);
  if (err.details) console.error('   Details:', err.details);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(err.details && { details: err.details }),
  });
};

module.exports = errorHandler;
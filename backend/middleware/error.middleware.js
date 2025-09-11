const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statuCode = err.statuCode || 500;
  res.status(statuCode).json({
    success: false,
    message: err.message || "Something went wrong",
    stack: err.stack,
  });
};

module.exports = errorHandler;

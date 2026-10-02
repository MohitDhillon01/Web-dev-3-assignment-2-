const validateStudent = (req, res, next) => {
  const { name, age, course } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push('Field "name" is required and must be a non-empty string.');
  }

  if (age === undefined || typeof age !== "number" || age <= 0) {
    errors.push('Field "age" is required and must be a positive number.');
  }

  if (!course || typeof course !== "string" || course.trim() === "") {
    errors.push('Field "course" is required and must be a non-empty string.');
  }

  if (errors.length > 0) {
    const err = new Error("Validation failed");
    err.statusCode = 400;
    err.details = errors;
    return next(err);
  }

  next();
};

module.exports = validateStudent;

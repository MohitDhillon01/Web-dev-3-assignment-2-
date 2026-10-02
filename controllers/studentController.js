let students = [
  { id: 1, name: "Alice Johnson", age: 20, course: "Computer Science" },
  { id: 2, name: "Bob Smith", age: 22, course: "Mechanical Engineering" },
  { id: 3, name: "Ayush jha", age: 25, course: "Computer Engineering" },
];

let nextId = 3;

const parseId = (idParam) => {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error(
      `Invalid student ID: "${idParam}". ID must be a positive integer.`,
    );
    err.statusCode = 400;
    throw err;
  }
  return id;
};

exports.getAllStudents = (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
};

exports.getStudentById = (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
      const err = new Error(`Student with ID ${id} not found`);
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

exports.createStudent = (req, res) => {
  const { name, age, course } = req.body;

  const newStudent = {
    id: nextId++,
    name: name.trim(),
    age,
    course: course.trim(),
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
};

exports.updateStudent = (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
      const err = new Error(`Student with ID ${id} not found`);
      err.statusCode = 404;
      throw err;
    }

    const { name, age, course } = req.body;

    students[index] = {
      id,
      name: name.trim(),
      age,
      course: course.trim(),
    };

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: students[index],
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
      const err = new Error(`Student with ID ${id} not found`);
      err.statusCode = 404;
      throw err;
    }

    const deleted = students.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());       
app.use(logger);                


app.use('/students', studentRoutes);


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Service API is running',
  });
});

app.use((req, res, next) => {
  const err = new Error(`Route ${req.method} ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

module.exports = app;
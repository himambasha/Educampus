const express = require('express');
const cors = require('cors');

const errorMiddleware = require('./middlewares/error.middleware');
const storageConfig = require('./config/storage.config');

// Route imports
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const examRoutes = require('./modules/exam/exam.routes');
const databaseRoutes = require('./modules/admin/database.routes');

// Helper function to safely extract router/function if wrapped in an object
const getMiddleware = (mod) => {
  if (typeof mod === 'function') return mod;
  if (mod && typeof mod.default === 'function') return mod.default;
  if (mod && typeof mod.router === 'function') return mod.router;
  return mod;
};

const authRouter = getMiddleware(authRoutes);
const userRouter = getMiddleware(userRoutes);
const examRouter = getMiddleware(examRoutes);
const databaseRouter = getMiddleware(databaseRoutes);
const errorHandler = getMiddleware(errorMiddleware);

const app = express();

// ---------- Core middleware ----------
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Static file serving ----------
if (storageConfig && storageConfig.driver === 'local') {
  app.use(
    storageConfig.local.publicUrlPrefix,
    express.static(storageConfig.local.uploadDir)
  );
}

// ---------- Health check routes ----------
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Educampus API is up and running!',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Educampus API is up and running!' });
});

// ---------- API Routes ----------
if (typeof authRouter === 'function') app.use('/api/auth', authRouter);
if (typeof userRouter === 'function') app.use('/api/user', userRouter);
if (typeof examRouter === 'function') app.use('/api/exams', examRouter);
if (typeof databaseRouter === 'function') app.use('/api/admin/database', databaseRouter);

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ---------- Centralized error handler ----------
if (typeof errorHandler === 'function') {
  app.use(errorHandler);
}

module.exports = app;
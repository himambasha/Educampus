const express = require('express');
const cors = require('cors');
const path = require('path');

const errorMiddleware = require('./middlewares/error.middleware');
const storageConfig = require('./config/storage.config');

// Route imports
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
// const cmsRoutes = require('./modules/cms/cms.routes');
// const subscriptionRoutes = require('./modules/subscription/subscription.routes');
// const feedbackRoutes = require('./modules/feedback/feedback.routes');
const examRoutes = require('./modules/exam/exam.routes');
// const adminSubscriptionRoutes = require('./admin/subscription/adminSubscription.routes');
// const adminCmsRoutes = require('./admin/cms/adminCms.routes');
// const adminExamRoutes = require('./admin/exam/adminExam.routes');

const app = express();

// ---------- Core middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Static file serving (for local profile pictures) ----------
if (storageConfig.driver === 'local') {
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
  res.status(200).json({ success: true, message: 'Educampus API is running' });
});

// ---------- API Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/cms', cmsRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api/exams', examRoutes);
// app.use('/api/admin/subscriptions', adminSubscriptionRoutes);
// app.use('/api/admin/cms', adminCmsRoutes);
// app.use('/api/admin/exams', adminExamRoutes);

// ---------- 404 handler (Must be below all valid routes) ----------
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ---------- Centralized error handler (Must be last middleware) ----------
app.use(errorMiddleware);

module.exports = app;
/*const express = require('express');
#const cors = require('cors');

//const app = express();

// Enable CORS for your React Vite dev server
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: "Educampus API is up and running!" });
});

// Import and mount your other route modules here (e.g., /api/auth, /api/users)

module.exports = app;*/

require('dotenv').config();

console.log("Starting server process..."); // Debug line

const app = require('./app');
const connectDB = require('./config/db.config');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log("Connecting to Database...");
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Educampus server running on port ${PORT}`);
      logger.info(`Educampus server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to start server: ${err.message}`);
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
}

startServer();
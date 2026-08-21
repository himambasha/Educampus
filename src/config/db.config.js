const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI from environment variables.
 * Call this once when the server starts (see src/server.js).
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri, {
      // Mongoose 6+ no longer needs useNewUrlParser / useUnifiedTopology,
      // but kept here as comments in case you're on an older version:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

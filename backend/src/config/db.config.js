const mongoose = require('mongoose');

/**
 * Connects to MongoDB using MONGO_URI from .env with a local fallback.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/educampus';
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

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
import mongoose from 'mongoose';

const connectTomongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // Increase timeout to 50s
      connectTimeoutMS: 50000, // Increase socket timeout to 50s
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message, error.stack);
    throw error; // Re-throw to let the caller handle it (e.g., server.js)
  }
};

export default connectTomongoDB;
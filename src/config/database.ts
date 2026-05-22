import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env['MONGODB_URI'];
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI not defined in the environment variables "
      );
    }
    await mongoose.connect(mongoURI);
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (err) {
    throw new Error(
      `Failed to connect to MongoDB: ${err}`
    );
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    throw new Error(
      `Failed to disconnet from MONGODB: ${err}`
    );
  }
}

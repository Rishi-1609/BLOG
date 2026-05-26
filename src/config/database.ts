import mongoose from 'mongoose';
import { MongoError } from '../errors/MongoError';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  const mongoURI = env.MONGODB_URI;
  if (!mongoURI) {
    throw new MongoError(
      "MONGODB_URI not defined in the environment variables "
    );
  }
  await mongoose.connect(mongoURI);
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close();
}

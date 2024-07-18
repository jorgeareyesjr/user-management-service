import dotenv from 'dotenv';

// Load environment variables from the .env file.
// By default, the .env file is located in the root directory of the project.
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const MONGO_DB = process.env.MONGO_DB_NAME || 'sample-mongo-db';
export const MONGO_USERS_COLLECTION = process.env.MONGO_USERS_COLLECTION || 'sample-mongo-users';
export const MONGO_SESSIONS_COLLECTION = process.env.MONGO_SESSIONS_COLLECTION || 'sample-mongo-sessions';
export const JWT_SECRET = process.env.JWT_SECRET || 'sample-jwt-secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7d';
export const PORT = process.env.PORT || 3000;

import mongoose from 'mongoose';
import { MONGO_URI } from '../utils/constants';

// Connect to MongoDB.
export const connectToMongoDB = async () => {
    try {
        console.log('Trying to connect to MongoDB');
        if (MONGO_URI) {
            await mongoose.connect(MONGO_URI);
        } else {
            throw new Error('MongoDB URI is undefined');
        };
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', (error as Error).message);
    };
};

// Disconnect from MongoDB.
export const disconnectFromMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', (error as Error).message);
    };
};

// Create a new MongoDB collection.
export const createMongoDBCollection = async (collectionName: string) => {
    try {
        await mongoose.connection.createCollection(collectionName);
        console.log(`Created MongoDB collection: ${collectionName}`);
    } catch (error) {
        console.error('Error creating MongoDB collection:', (error as Error).message);
    };
};

// Drop a MongoDB collection.
export const dropMongoDBCollection = async (collectionName: string) => {
    try {
        await mongoose.connection.dropCollection(collectionName);
        console.log(`Dropped MongoDB collection: ${collectionName}`);
    } catch (error) {
        console.error('Error dropping MongoDB collection:', (error as Error).message);
    };
};

// Retrieve a MongoDB collection.
export const getMongoDBCollection = async (collectionName: string) => {
    try {
        const collection = mongoose.connection.collection(collectionName);
        console.log(`Retrieved MongoDB collection: ${collectionName}`);
        return collection;
    } catch (error) {
        console.error('Error retrieving MongoDB collection:', (error as Error).message);
    };
};

// Update a MongoDB collection.
export const updateMongoDBCollection = async (collectionName: string, filter: any, update: any) => {
    try {
        await mongoose.connection.collection(collectionName).updateOne(filter, update);
        console.log(`Updated MongoDB collection: ${collectionName}`);
    } catch (error) {
        console.error('Error updating MongoDB collection:', (error as Error).message);
    };
};

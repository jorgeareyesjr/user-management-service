import express from 'express';
import { connectToMongoDB, disconnectFromMongoDB } from '../config/database';
import setCorsHeaders from './middlewares/setCorsHeaders';
import userRoutes from './routes/userRoutes';
import { PORT } from '../utils/constants';

async function startServer() {
    let server: any;

    try {
        // Create an Express application.
        const app = express();

        // Connect to MongoDB.
        await connectToMongoDB();

        // Parse JSON bodies in incoming requests.
        app.use(express.json());

        // Parse URL-encoded bodies in incoming requests.
        app.use(express.urlencoded({ extended: true }))

        // Set CORS headers to allow all requests.
        app.use(setCorsHeaders);

        // Define the user routes.
        app.use( '/api/users', userRoutes);

        // Start the server, listening on the specified port.
        server = app.listen(PORT, () => {
            console.log(`Server is running on port:${PORT}`);
        });

        // Handle server termination gracefully.
        process.on('SIGINT', async () => {
            await disconnectFromMongoDB();
            await server.close(() => {
                console.log('Server closed due to app termination');
                process.exit(0);
            });
        });

        // Handle uncaught exceptions and unhandled rejections.
        process.on('uncaughtException', async (error) => {
            console.error('Server encountered an uncaught exception:', error);
            await server.close(() => process.exit(1));
        });

        // Handle unhandled promise rejections.
        process.on('unhandledRejection', async (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            await server.close(() => process.exit(1));
        });
    } catch (error) {
        // Handle any errors that occurred during server startup and exit the process.
        console.error(`Error: ${(error as any).message}`);
        process.exit(1);
    };
};

// Start the Express server.
startServer();

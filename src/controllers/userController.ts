import { Request, Response } from 'express';
import User from '../models/user';
import {
    handleDuplicateUserRegistration,
    handleFoundUser,
    handleInvalidLoginPassword,
    handleInvalidLoginUsername,
    handleMissingLoginFields,
    handleMissingUser,
    handleMissingUserRegistrationFields,
    handleServerError,
    handleSuccessfulUserDeletion,
    handleSuccessfulUserLogin,
    handleSuccessfulUserRegistration,
    handleSuccessfulUserUpdate,
} from '../services/userService';
import {
    comparePasswords,
    generateJWT,
    hashPassword,
} from '../../utils/cryptography';

/**
 * Create a new user in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided.
        if (!username || !email || !password) {
            return handleMissingUserRegistrationFields(res);
        };

        // Check if the user already exists in the database.
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return handleDuplicateUserRegistration(res);
        };

        // Hash the password before saving it to the database.
        const hashedPassword: string = await hashPassword(password);

        // Create a new user instance.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database.
        await newUser.save();

        // Return a success message to the client.
        return handleSuccessfulUserRegistration(res);
    } catch (error) {
         // Handle any server errors.
        return handleServerError(res, error as Error);
    };
};

/**
 * Delete a user from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        // Find and delete the user from the database.
        // Mongoose's findOneAndDelete() returns the deleted document.
        const user = await User.findOneAndDelete({ username });

         // Check if the user exists before deletion.
         // Mongoose's findOneAndDelete() returns null if the user is not found.
        if (!user) {
            return handleMissingUser(res);
        };

        // Return a success message for user deletion.
        return handleSuccessfulUserDeletion(res);
    } catch (error) {
         // Handle any server errors.
        return handleServerError(res, error as Error);
    };
};

/**
 * Retrieve a user from the database based on the provided username.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        // Find the user in the database by username.
        const user = await User.findOne({ username });

        // Check if the user exists.
        if (!user) {
            return handleMissingUser(res);
        };

        // Return the found user to the client.
        return handleFoundUser(res, user);
    } catch (error) {
        // Handle any server errors.
        return handleServerError(res, error as Error);
    };
};

/**
 * Log in a user by verifying the provided username and password.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const logInUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check if both username and password are provided.
        if (!username || !password) {
            return handleMissingLoginFields(res);
        };

        // Find the user in the database by username.
        const existingUser = await User.findOne({ username });

        // Check if the user exists.
        if (!existingUser) {
            return handleInvalidLoginUsername(res);
        };

        // Compare the provided password with the stored password.
        const isPasswordValid = await comparePasswords(password, existingUser.password);

        // Check if the password is valid.
        if (!isPasswordValid) {
            return handleInvalidLoginPassword(res);
        };

        // Generate a JSON Web Token (JWT) for the user.
        const dataToEncode = {
            id: existingUser._id,
            username: existingUser.username,
        };

        const userJWT = generateJWT(dataToEncode);

        // Return a success message with the JWT to the client.
        return handleSuccessfulUserLogin(res, userJWT);
    } catch (error) {
        // Handle any server errors.
        return handleServerError(res, error as Error);
    };
};

// @TODO: Implement logout functionality.
const logOutUser = async (req: Request, res: Response) => {
    try {
        // @TODO: Implement logout logic here.
    } catch (error) {
        return handleServerError(res, error as Error);
    };
};

/**
 * Update a user's information in the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const updateUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const updatedUser = req.body;
    
        // Find and update the user in the database.
        // Mongoose's findOneAndUpdate() returns the updated document.
        const user = await User.findOneAndUpdate(
            { username },
            updatedUser,
            { new: true },
        );

        // Check if the user exists before updating.
        // Mongoose's findOneAndUpdate() returns null if the user is not found.
        if (!user) {
            return handleMissingUser(res);
        };

        // Return a success message with the updated user.
        return handleSuccessfulUserUpdate(res, user);
    } catch (error) {
        // Handle any server errors.
        return handleServerError(res, error as Error);
    };
};

export {
    createUser,
    deleteUser,
    getUser,
    logInUser,
    // logOutUser,
    updateUser,
};

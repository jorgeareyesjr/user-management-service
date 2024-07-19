import { Response } from 'express';

const handleDuplicateUserRegistration = (res: Response) => {
    return res
        .status(400)
        .json({
            message: 'User already exists',
        });
};

const handleFoundUser = (res: Response, user: any) => {
    return res
        .status(200)
        .json({
            user,
            message: 'User found',
        });
};

const handleInvalidLoginPassword = (res: Response) => {
    return res
        .status(401)
        .json({
            message: 'Invalid credentials',
        });
};

const handleInvalidLoginUsername = (res: Response) => {
    return res
        .status(404)
        .json({
            message: 'Invalid credentials',
        });
};

const handleMissingLoginFields = (res: Response) => {
    return res
        .status(400)
        .json({
            message: 'Please provide all required fields',
        });
};

const handleMissingUser = (res: Response) => {
    return res
        .status(404)
        .json({
            message: 'User not found',
        });
};

const handleMissingUserRegistrationFields = (res: Response) => {
    return res
        .status(400)
        .json({
            message: 'Please provide all required fields',
        });
};

const handleServerError = (res: Response, error: Error) => {
    return res
        .status(500)
        .json({
            message: error.message,
        });
};

const handleSuccessfulUserDeletion = (res: Response) => {
    return res
        .status(200)
        .json({
            message: 'User deleted successfully',
        });
};

const handleSuccessfulUserLogin = (res: Response, JWT: any) => {
    return res
        .status(200)
        .json({
            jwt: JWT,
            message: 'User logged in successfully',
        });
};

const handleSuccessfulUserRegistration = (res: Response) => {
    return res
        .status(201)
        .json({
            message: 'User successfully registered',
        });
};

const handleSuccessfulUserUpdate = (res: Response, user: any) => {
    return res
        .status(200)
        .json({
            user,
            message: 'User updated successfully',
        });
};

export {
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
};

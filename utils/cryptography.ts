import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from './constants';

const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error((error as Error).message);
    };
};

const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error((error as Error).message);
    };
};

const generateJWT = (payload: any): string => {
    try {
        const JWTOptions = {
            expiresIn: JWT_EXPIRATION,
        };
        return jwt.sign(
            payload,
            JWT_SECRET,
            JWTOptions,
        );
    } catch (error) {
        throw new Error((error as Error).message);
    };
};

const verifyJWT = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error((error as Error).message);
    };
};

export {
    hashPassword,
    comparePasswords,
    generateJWT,
    verifyJWT,
};

import { NextFunction, Request, Response } from 'express';

/**
 * Set CORS headers to allow all requests.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 */
const setCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
};

export default setCorsHeaders;

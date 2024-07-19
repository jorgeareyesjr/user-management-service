import express from 'express';
import {
    createUser,
    // deleteUser,
    // getUser,
    logInUser,
    // logOutUser,
    // updateUser,
} from '../controllers/userController';
// import { authenticateUser } from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', logInUser);
// @TODO: Add routes for the following:
// router.get('/profile', authenticateUser, getUser);
// router.put('/profile/update/:username', authenticateUser, updateUser);
// router.delete('/profile/delete/:username', authenticateUser, deleteUser);
// router.get('/logout', authenticateUser, logOutUser);

export default router;

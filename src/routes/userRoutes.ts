import express from 'express';
import {
    createUser,
    // deleteUser,
    getUser,
    logInUser,
    // logOutUser,
    // updateUser,
} from '../controllers/userController';
// import { authenticateUser } from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', logInUser);
router.get('/:username', getUser);
// router.put('/:username', authenticateUser, updateUser);
// router.delete('/:username', authenticateUser, deleteUser);
// router.get('/logout', authenticateUser, logOutUser);

export default router;

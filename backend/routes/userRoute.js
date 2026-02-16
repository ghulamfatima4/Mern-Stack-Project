import express from 'express'
import {register, Verify, reVerify, login, logout, forgotpassword, verifyOtp, changepassword, getallusers, getoneuser} from '../controllers/userrController.js'
import {isAuthenticated, isAdmin} from '../middleware/isAuthenticated.js'
// const app = express();
// import { userRoute } from './routes/userRoute.js'; // ✅ named import
import { Router } from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/verify', Verify);
router.post('/reverify', reVerify);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/forgot-password', forgotpassword);
router.post('/verify-otp/:email', verifyOtp);
router.get('/change-password/:email', changepassword);
router.get('/allusers', isAuthenticated, isAdmin, getallusers);
router.get('/getoneuser/:userId', getoneuser);
export default router;
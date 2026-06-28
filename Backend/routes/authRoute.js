import express from "express";
import { resetPassword, sendOtp, SignIn, SignOut, SignUp, SignUpWithGoogle, verifyOtp } from "../controllers/userAuthController.js";

const authRouter = express.Router();

authRouter.post('/signup', SignUp);
authRouter.post('/login', SignIn);
authRouter.get('/signout', SignOut);
authRouter.post('/googleauth', SignUpWithGoogle);
authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/resetPassword', resetPassword);

export default authRouter;
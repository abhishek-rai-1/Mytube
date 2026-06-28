import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { validateCreateChannel } from "../controllers/validateCreateChannel.js";
import { validateUpdateChannel } from "../controllers/validateUpdateChannel.js";
import { createChannel, getChannel, getCurrentUser, updateChannel } from "../controllers/channelAndCurrentUserController.js";

const userRouter = express.Router();

userRouter.get('/getUser', isAuth, getCurrentUser);
userRouter.post('/validateCreateChannel', isAuth, validateCreateChannel);
userRouter.post('/createChannel', isAuth, createChannel);
userRouter.get('/getChannel', isAuth, getChannel);
userRouter.post('/validateUpdateChannel', isAuth, validateUpdateChannel);
userRouter.post('/updateChannel', isAuth, updateChannel);

export default userRouter;
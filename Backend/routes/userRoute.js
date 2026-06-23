import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createChannel, getChannel, getCurrentUser, updateChannel } from "../controllers/currentUserController.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get('/getUser', isAuth, getCurrentUser);
userRouter.post('/createChannel', isAuth, upload.fields([ {name : "avatar", maxCount : 1}, {name : "banner", maxCount : 1} ]), createChannel);
userRouter.get('/getChannel', isAuth, getChannel);
userRouter.post('/updateChannel', isAuth, upload.fields([ {name : "avatar", maxCount : 1}, {name : "banner", maxCount : 1} ]), updateChannel);

export default userRouter;
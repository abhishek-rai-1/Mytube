import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createVideo } from "../controllers/videoController.js";

const contentRouter = express.Router();

contentRouter.post('/createVideo', isAuth, upload.fields[
    {name : "Video", maxCount : 1},
    {name : "thumbnail", maxCount : 1}
], createVideo)

export default contentRouter;
import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createVideo, getVideos } from "../controllers/videoController.js";
import { createShort, getShorts } from "../controllers/shortController.js";

const contentRouter = express.Router();

contentRouter.post('/createVideo', isAuth, upload.fields([
    {name : "video", maxCount : 1},
    {name : "thumbnail", maxCount : 1}
]), createVideo)

contentRouter.get('/getVideos', isAuth, getVideos);

contentRouter.post('/createShort', isAuth, upload.single("short"), createShort);

contentRouter.get('/getShorts', isAuth, getShorts);

export default contentRouter;
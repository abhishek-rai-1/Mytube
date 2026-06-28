import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createVideo, getVideos } from "../controllers/videoController.js";
import { createShort, getShorts } from "../controllers/shortController.js";
import { validateVideoChannel } from "../controllers/validateVideoChannel.js";

const contentRouter = express.Router();

contentRouter.post('/validateVideoChannel', isAuth, validateVideoChannel);
contentRouter.post('/createVideo', isAuth, createVideo)

contentRouter.get('/getVideos', isAuth, getVideos);

contentRouter.post('/createShort', isAuth, createShort);

contentRouter.get('/getShorts', isAuth, getShorts);

export default contentRouter;
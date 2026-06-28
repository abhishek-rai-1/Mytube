import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getSignature } from "../controllers/getSignature.js";

const cloudinarySignature = express.Router();

cloudinarySignature.get("/signature", isAuth, getSignature);

export default cloudinarySignature;
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/ConnectMongoDb.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import contentRouter from "./routes/contentRoute.js";
import cloudinarySignature from "./routes/cloudinarySignature.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(cookieParser()); 
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/user', userRouter);
app.use('/api/content', contentRouter);
app.use('/api/getCloudinarySignature', cloudinarySignature);

app.listen(port, async (req, res) => {
    await connectDb();
    console.log(`server is listening on port : ${port}`);
})
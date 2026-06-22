import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(`some error occured while connecting to db : ${error}`);
    }
}

export default connectDb;
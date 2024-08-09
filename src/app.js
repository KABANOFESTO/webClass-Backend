import express from "express";
import userRoute from "./routers/userRouter.js";
import messageRoute from "./routers/messageRouter.js";
import bookingRouter from "./routers/BookingRouter.js";
import { dbConnect } from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

dbConnect();

app.use(cors());

// Use built-in middleware instead of body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/messages", messageRoute);
app.use('/bookings', bookingRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
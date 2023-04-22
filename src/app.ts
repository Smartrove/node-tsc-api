import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const port = 4000;

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(compression());
app.use(morgan("tiny"));

app.use("/", router());

const server = http.createServer(app);
server.listen(process.env.PORT as string, () =>
  console.log(`server started on port ${port}`)
);

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("database connected successfully"))
  .catch((error) => {
    console.log(error.message);
  });

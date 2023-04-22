import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import morgan from "morgan";
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
server.listen(port, () => console.log(`server started on port ${port}`));

const MONGO_URL =
  "mongodb+srv://smartrove:12345@node-tsc-api.lwdz80i.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("database connected successfully"))
  .catch((error) => {
    console.log(error.message);
  });

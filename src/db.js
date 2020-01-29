import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false //new version 의 mongodb는 이런식으로 configuration 가능하며
  }
);
const db = mongoose.connection;
const handleOpen = () => {
  console.log("Connect to MongoDB");
};
const handleError = error => {
  console.log(`Error on DB Connection: ${error}`);
};
db.once("open", handleOpen);
db.on("error", handleError);

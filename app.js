import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import passport from "passport";
import expressSession from "express-session";
import mongoStore, { MongoStore } from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import "./passport";
import { localMiddleware } from "./middlewares";
dotenv.config();
const app = express();
const cookieStore = mongoStore(expressSession);
app.use(helmet()); // for security
app.set("view engine", "pug"); // template engine setting
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser()); // handle cookie
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors()); // cross-domain
app.use(morgan("dev")); // common,tiny,dev
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET, //sessionID를 암호화 위한 설정
    resave: true, //
    saveUninitialized: false, //
    store: new cookieStore({ mongooseConnection: mongoose.connection }) //store을 mongo와 연결
  })
);
app.use(passport.initialize());
app.use(passport.session()); //로그인 지속시키기 위해 session 사용
app.use(localMiddleware);
// 독점적으로 url을 사용할수 있게 설정
app.use(routes.home, globalRouter); // index 경로
app.use(routes.users, userRouter); // user 경로에 userRouter 적용
app.use(routes.videos, videoRouter); // video 경로에 videoRouter 적용

export default app;

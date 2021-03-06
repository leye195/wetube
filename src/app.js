import "@babel/polyfill";
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import expressSession from "express-session";
import mongoStore from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import "./passport";
import { localMiddleware } from "./middlewares";
dotenv.config();
const app = express();
const cookieStore = mongoStore(expressSession);
app.use(
  cors({ origin: "https://wetuberbucket.s3.ap-northeast-2.amazonaws.com/" })
); // cross-domain
app.use(helmet()); // for security
app.set("view engine", "pug"); // template engine setting
app.set("views", path.join(__dirname, "views"));
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser()); // handle cookie
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(morgan("dev")); // common,tiny,dev
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET, //sessionID를 암호화 위한 설정
    resave: true, //
    saveUninitialized: false, //
    store: new cookieStore({ mongooseConnection: mongoose.connection }) //store을 mongo와 연결
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //로그인 지속시키기 위해 session 사용
app.use(localMiddleware);
// 독점적으로 url을 사용할수 있게 설정
app.use(routes.home, globalRouter); // index 경로
app.use(routes.users, userRouter); // user 경로에 userRouter 적용
app.use(routes.videos, videoRouter); // video 경로에 videoRouter 적용
app.use(routes.api, apiRouter);
app.use(function(req, res, next) {
  //404 에러 처리
  res.status(404).render("404");
});

export default app;

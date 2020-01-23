import passport from "passport";
import githubStrategy from "passport-github";
import User from "./models/user";
import dotenv from "dotenv";
import { githubLoginCallback } from "./controller/userController";
import routes from "./routes";
dotenv.config();
//strategy랑 필요한 것들을 넣어줌

//use static authenticate mode of model in LocalStrategy
passport.use(User.createStrategy()); //passport.use(new LocalStrategy(User.authenticate()));
//github strategy
passport.use(
  new githubStrategy(
    {
      clientID: process.env.GB_CLIENTID,
      clientSecret: process.env.GB_CLIENTSECRET,
      callbackURL: `http://localhost:8080${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
//use static serialize and deserializ of model for passport session support
passport.serializeUser(User.serializeUser()); //쿠키에 user.id를 저장
passport.deserializeUser(User.deserializeUser()); //id를 식별자로 db 데이터와 비교

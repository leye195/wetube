import passport from "passport";
import githubStrategy from "passport-github";
import naverStrategy from "passport-naver";
import kakaoStrategy from "passport-kakao";
import User from "./models/user";
import dotenv from "dotenv";
import {
  githubLoginCallback,
  naverLoginCallback,
  kakaoLoginCallback
} from "./controller/userController";
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
      callbackURL: process.env.PRODUCTION
        ? `http://blooming-plains-95078.herokuapp.com${routes.githubCallback}`
        : `http://localhost:8080${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
//naver strategy
passport.use(
  new naverStrategy(
    {
      clientID: process.env.N_CLIENTID,
      clientSecret: process.env.N_CLIENTSECRET,
      callbackURL: process.env.PRODUCTION
        ? `http://blooming-plains-95078.herokuapp.com${routes.githubCallback}`
        : `http://localhost:8080${routes.githubCallback}`
    },
    naverLoginCallback
  )
);
//kakao strategy
passport.use(
  new kakaoStrategy(
    {
      clientID: process.env.K_CLIENTID,
      callbackURL: process.env.PRODUCTION
        ? `http://blooming-plains-95078.herokuapp.com${routes.githubCallback}`
        : `http://localhost:8080${routes.githubCallback}`
    },
    kakaoLoginCallback
  )
);
//use static serialize and deserializ of model for passport session support
passport.serializeUser(User.serializeUser()); //쿠키에 user.id를 저장
passport.deserializeUser(User.deserializeUser()); //id를 식별자로 db 데이터와 비교

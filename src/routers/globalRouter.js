import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controller/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  naverLogin,
  postNaverLogin,
  kakaoLogin,
  postkakaoLogin
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();
globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: routes.login }),
  postNaverLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postkakaoLogin
);

globalRouter.get(routes.me, getMe);
export default globalRouter;

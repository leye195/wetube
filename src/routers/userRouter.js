import express from "express";
import routes from "../routes";

import {
  users,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from "../controller/userController";
import { onlyPrivate, uploadImageMiddleware } from "../middlewares";

const userRouter = express.Router();
userRouter.get(routes.home, users);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadImageMiddleware,
  postEditProfile
);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
import express from "express";
import routes from "../routes";
import {
  registerView,
  postComment,
  postDeleteComment,
  postLikeVideo,
  postUnlikeVideo
} from "../controller/videoController";
import {
  postBanner,
  postSubscribe,
  postDescription,
  postLink
} from "../controller/userController";
import { onlyPrivate, uploadBannerMiddleware } from "../middlewares";
const apiRouter = express.Router();
apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.post(routes.like, postLikeVideo);
apiRouter.post(routes.unlike, postUnlikeVideo);
apiRouter.post(routes.link, onlyPrivate, postLink);
apiRouter.post(routes.banner, onlyPrivate, uploadBannerMiddleware, postBanner);
apiRouter.post(routes.subscribe, onlyPrivate, postSubscribe);
apiRouter.post(routes.description, onlyPrivate, postDescription);

export default apiRouter;

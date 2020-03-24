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
import {
  onlyPrivate,
  uploadBannerMiddleware,
  onlyPublic
} from "../middlewares";
import {
  postLikeComment,
  postUnlikeComment,
  getReply,
  postReply
} from "../controller/commentController";
const apiRouter = express.Router();
apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, onlyPrivate, postComment);
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment);
apiRouter.post(routes.like, onlyPrivate, postLikeVideo);
apiRouter.post(routes.unlike, onlyPrivate, postUnlikeVideo);
apiRouter.post(routes.link, onlyPrivate, postLink);
apiRouter.post(routes.banner, onlyPrivate, uploadBannerMiddleware, postBanner);
apiRouter.post(routes.subscribe, onlyPrivate, postSubscribe);
apiRouter.post(routes.description, onlyPrivate, postDescription);
apiRouter.post(routes.likeComment, onlyPrivate, postLikeComment);
apiRouter.post(routes.unlikeComment, onlyPrivate, postUnlikeComment);
apiRouter.get(routes.reply, getReply);
apiRouter.post(routes.reply, onlyPrivate, postReply);
//apiRouter.delete(routes.reply,onlyPrivate,deleteReply);
export default apiRouter;

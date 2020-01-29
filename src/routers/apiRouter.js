import express from "express";
import routes from "../routes";
import {
  registerView,
  postComment,
  postDeleteComment
} from "../controller/videoController";
const apiRouter = express.Router();
apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
export default apiRouter;

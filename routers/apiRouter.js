import express from "express";
import routes from "../routes";
import { registerView, postComment } from "../controller/videoController";
const apiRouter = express.Router();
apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postComment);
export default apiRouter;

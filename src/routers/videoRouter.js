import express from "express";
import routes from "../routes";
import {
  videos,
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo
} from "../controller/videoController";
import {
  uploadVideoMiddleware,
  onlyPrivate,
  uploadThumbnailMiddleware
} from "../middlewares";

const videoRouter = express.Router();

// Home
videoRouter.get(routes.home, videos);

// Upload Video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideoMiddleware, postUpload);

// Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(
  routes.editVideo(),
  onlyPrivate,
  uploadThumbnailMiddleware,
  postEditVideo
);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;

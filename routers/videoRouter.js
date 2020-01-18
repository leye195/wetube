import express from 'express';
import routes from '../routes';
import {
    videos, 
    videoDetail,  
    deleteVideo, 
    getUpload, 
    postUpload,
    getEditVideo,
    postEditVideo
} from '../controller/videoController';
import { uploadVideoMiddleware } from '../middlewares';
const videoRouter=express.Router();

//Home
videoRouter.get(routes.home,videos);

//Upload Video
videoRouter.get(routes.upload,getUpload);
videoRouter.post(routes.upload,uploadVideoMiddleware,postUpload)

//Detail
videoRouter.get(routes.videoDetail(),videoDetail);

//Edit Video
videoRouter.get(routes.editVideo(),getEditVideo);
videoRouter.post(routes.editVideo(),postEditVideo);

//Delete Video
videoRouter.get(routes.deleteVideo(),deleteVideo);

export default videoRouter;
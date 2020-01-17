import {videos_arr} from '../db';
import routes from '../routes';
export const home=(req,res)=>{
    res.render("home",{pageTitle:"Home",videos:videos_arr});
}
export const search=(req,res)=>{
    const {term}=req.query;
    res.render("search",{pageTitle:"Search",searchingBy:term,videos:videos_arr});
}
export const getUpload=(req,res)=>{
    res.render("upload",{pageTitle:"Upload"});
}
export const postUpload=(req,res)=>{
    const{videofile,title,description}=req.body;
    //upload and save video, 
    //생성된 id를 이용해 videoDetail page로 이동
    
    res.redirect(routes.videoDetail(125));
}
export const videos=(req,res)=>{
    res.render("videos",{pageTitle:"Videos"});
}
export const videoDetail=(req,res)=>{
    res.render("videoDetail",{pageTitle:"Video Detail"});
}
export const editVideo=(req,res)=>{
    const{id}=req.params;
    res.render("editVideo",{pageTitle:"Edit Video",video_id:id});
}
export const deleteVideo=(req,res)=>{
    res.render("deleteVideo",{pageTitle:"Delete Video"});
}
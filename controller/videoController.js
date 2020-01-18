//import {videos_arr} from '../db';
import routes from '../routes';
import video_model from '../models/video';
export const home= async(req,res)=>{
    try{
        const video=await video_model.find({});
        res.render("home",{pageTitle:"Home",videos:video});
    }
    catch(error){
        res.render("home",{pageTitle:"Home",videos:[]});
    }
}
export const search=(req,res)=>{
    const {term}=req.query;
    res.render("search",{pageTitle:"Search",searchingBy:term,videos:videos_arr});
}
export const getUpload=(req,res)=>{
    res.render("upload",{pageTitle:"Upload"});
}
export const postUpload=async(req,res)=>{
    const{body:{title,description},file:{path}}=req;
    //upload and save video, 
    //생성된 id를 이용해 videoDetail page로 이동
    const newVideo=await video_model.create({fileUrl:path,title:title,description:description});
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
}
export const videos=(req,res)=>{
    res.render("videos",{pageTitle:"Videos"});
}
export const videoDetail=async(req,res)=>{
    const {params:{id}}=req;
    try{
        const video=await video_model.findById(id);
        console.log(video);
        res.render("videoDetail",{pageTitle:"Video Detail",video:video});
    }catch(error){
        //console.log(error);
        res.redirect(routes.home);
    }
}
export const getEditVideo=async(req,res)=>{
    const{id}=req.params;
    try{
        const video=await video_model.findById(id);
        res.render("editVideo",{pageTitle:`Edit ${video.title}`,video:video});
    }catch(error){
        res.redirect(routes.videoDetail(id));
    }
}
export const postEditVideo=async(req,res)=>{
    const{body:{title,description},params:{id}}=req;
    console.log(id)
    try{
        await video_model.findOneAndUpdate({_id:id},{title:title,description:description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
}
export const deleteVideo=(req,res)=>{
    res.render("deleteVideo",{pageTitle:"Delete Video"});
}
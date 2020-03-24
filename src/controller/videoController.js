import routes from "../routes";
import videoModel from "../models/video";
import commentModel from "../models/comment";
import userModel from "../models/user";

export const home = async (req, res) => {
  try {
    const video = await videoModel
      .find({})
      .populate("creator")
      .sort({ _id: -1 }); // -1을 준 이유는 descening
    res.render("home", { pageTitle: "Home", videos: video });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const { term } = req.query;
  let video = [];
  try {
    video = await videoModel
      .find({
        title: { $regex: term, $options: "i" }
      })
      .populate("creator")
      .sort({ _id: -1 });
    //console.log(video);
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy: term,
    videos: video
  });
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location }
  } = req;
  //console.log(req.files);
  // upload and save video,
  // 생성된 id를 이용해 videoDetail page로 이동

  const newVideo = await videoModel.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videos = (req, res) => {
  res.render("videos", { pageTitle: "Videos" });
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const videos = await videoModel
      .find()
      .sort()
      .limit(5);
    const video = await videoModel
      .findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          model: userModel
        }
      })
      .populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video, videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await videoModel.findById(id);
    if (String(video.creator) !== String(req.user.id)) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.videoDetail(id));
  }
};
export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    if (!req.file)
      await videoModel.findOneAndUpdate({ _id: id }, { title, description });
    else
      await videoModel.findOneAndUpdate(
        { _id: id },
        { title, description, thumbnailUrl: req.file.location }
      );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await videoModel.findById(id);
    if (String(video.creator) !== String(req.user._id)) {
      throw Error();
    } else {
      await videoModel.findOneAndDelete({ _id: id });
      req.user.videos.splice(req.user.videos.indexOf(id), 1);
      req.user.save();
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.videoDetail(id));
  }
  res.render("deleteVideo", { pageTitle: "Delete Video" });
};

export const registerView = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const video = await videoModel.findById(id);
    console.log(video);
    video.view += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postComment = async (req, res) => {
  try {
    const {
      params: { id },
      body: { comment },
      user
    } = req;
    if (user === undefined) throw Error();
    const video = await videoModel.findById(id);
    let newComment = await commentModel.create({
      text: comment,
      creator: user.id
    });
    newComment = await newComment.populate("creator").execPopulate();
    video.comments.push(newComment.id);
    newComment.save();
    video.save();
    console.log(newComment);
    res.json(newComment);
  } catch (error) {
    res.status(400);
    res.end();
  }
};
export const postDeleteComment = async (req, res) => {
  try {
    const {
      params: { id, cid }
    } = req;
    console.log();
    await commentModel.findByIdAndDelete(cid);
    const video = await videoModel.findById(id);
    const idx = video.comments.indexOf(cid);
    video.comments.splice(idx, 1);
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const postLikeVideo = async (req, res) => {
  try {
    const {
      params: { id },
      user
    } = req;
    const video = await videoModel.findById(id);
    if (video.like.indexOf(req.user.id) === -1) {
      if (video.unlike.indexOf(req.user.id) !== -1) {
        video.unlike.splice(video.unlike.indexOf(req.user.id), 1);
        user.unlikes.splice(user.unlikes.indexOf(video._id), 1);
      }
      video.like.push(req.user.id);
      user.likes.push(video._id);
      //req.flash("info", "Added to like list");
    } else {
      video.like.splice(video.like.indexOf(req.user.id), 1);
      user.likes.splice(user.likes.indexOf(video._id));
    }
    video.save();
    user.save();
    res.status(200).json({ like: video.like, unlike: video.unlike });
  } catch (error) {
    res.status(400).end();
  }
};
export const postUnlikeVideo = async (req, res) => {
  try {
    const {
      params: { id },
      user
    } = req;
    const video = await videoModel.findById(id);
    if (video.unlike.indexOf(user.id) === -1) {
      if (video.like.indexOf(user.id) !== -1) {
        video.like.splice(video.like.indexOf(user.id, 1));
        user.likes.splice(user.likes.indexOf(video._id), 1);
      }
      video.unlike.push(user.id);
      user.unlikes.push(video._id);
      //req.flash("info", "unlike the video");
    } else {
      video.unlike.splice(video.unlike.indexOf(user.id), 1);
      user.unlikes.splice(user.unlikes.indexOf(video._id), 1);
    }
    video.save();
    user.save();
    res.status(200).json({ unlike: video.unlike, like: video.like });
  } catch (error) {
    res.status(400).end();
  }
};

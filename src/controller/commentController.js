import commentModel from "../models/comment";
export const postLikeComment = async (req, res, next) => {
  try {
    const {
      params: { id },
      user
    } = req;
    console.log(id);
    const comment = await commentModel.findOne({ _id: id });
    if (!comment) res.status(403).end("comment does not exsit");
    if (comment.like.indexOf(user.id) === -1) {
      if (comment.unlike.indexOf(user.id) !== -1) {
        comment.unlike.splice(comment.unlike.indexOf(user.id), 1);
      }
      comment.like.push(user.id);
    } else {
      comment.like.splice(comment.like.indexOf(user.id), 1);
    }
    comment.save();
    res.json({ unlike: comment.unlike, like: comment.like });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
export const postUnlikeComment = async (req, res, next) => {
  try {
    const {
      params: { id },
      user
    } = req;
    const comment = await commentModel.findById(id);
    if (comment.unlike.indexOf(user.id) === -1) {
      if (comment.like.indexOf(user.id) !== -1) {
        comment.like.splice(comment.like.indexOf(user.id), 1);
      }
      comment.unlike.push(user.id);
    } else {
      comment.unlike.splice(comment.unlike.indexOf(user.id), 1);
    }
    comment.save();
    res.json({ unlike: comment.unlike, like: comment.like });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

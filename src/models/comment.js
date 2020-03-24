import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video" // objectID가 어디로 부터 온것인지 ref를 통해 설정
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  unlike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  thumbnailUrl: {
    type: String
  },
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  view: {
    type: Number,
    default: 0
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
const videoModel = mongoose.model("Video", videoSchema);
//video model의 스키마를 videoSchema로 설정
export default videoModel;

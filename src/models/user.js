import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: {
    type: String,
    default:
      "https://wetuberbucket.s3.ap-northeast-2.amazonaws.com/avatars/58c11a401956bab841de5f227c337c43"
  },
  githubId: Number,
  naverId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  unlikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  subscribe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  subscribed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  bannerUrl: {
    type: String
  }
});
userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //plugin 추가
//usernameField: 어떤 field를 username으로 설정할지 셋팅
const userModel = mongoose.model("User", userSchema);

export default userModel;

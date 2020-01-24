import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
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
  ]
});
userSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //plugin 추가
//usernameField: 어떤 field를 username으로 설정할지 셋팅
const userModel = mongoose.model("User", userSchema);

export default userModel;

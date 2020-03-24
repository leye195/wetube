import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const replyModel = mongoose.model("Reply", replySchema);
export default replyModel;

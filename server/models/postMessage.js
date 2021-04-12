import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,   // convert images to strings using base64
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }


});

 const PostMessage = mongoose.model("PostMessage",postSchema) // name of the model, name of the schema

 export default PostMessage;

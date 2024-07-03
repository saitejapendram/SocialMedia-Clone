const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/soialpedia")
        .then(() => {
            console.log("connected to db");
        })

const userSchema = new mongoose.Schema({
      email : {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        MaxLength: 20,
        trim: true
        },
      username : {
        type: String,
        required: true,
        minLength: 5,
        maxLength : 20,
        trim: true
      },
      profilePicture:{
        type: String,
        default: ""
      },
      password: {
        type : String,
        required: true,
        minLength: 5,
        maxLength: 20
      },
      posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: []
      }],
      location: String,
      occupation: String,
      friends : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
      }]

})

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: []
  }],
  picturePath: String
})

const commentSchema = new mongoose.Schema({
  postId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Post'
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  createdAt : {
    type: Date,
    default: Date.now
  } 

})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
    User,
    Post,
    Comment
}
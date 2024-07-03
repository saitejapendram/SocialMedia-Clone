const express = require("express");
const authMiddleware = require("../authMiddleware");
const { User, Post, Comment } = require("../db");


const postRouter = express.Router();

postRouter.post("/addPost", authMiddleware, async (req, res) => {
    //check for valid user
    const isValid = await User.findOne({_id:req.userId});
    if (!isValid) {
        return res.status(404).json({message:"Invalid user"});
    }
    //post creation 
    const post = await Post.create({
          userId: req.userId,
          picturePath: req.body.picturePath,
          description: req.body.description
    })
    //updating posts in user
    //isValid.posts.push(post._id);
    const user = await User.findByIdAndUpdate({_id: req.userId}, {$addToSet : {posts : post._id}});

    res.status(200).json({post, user});

})

postRouter.delete("/deletePost", authMiddleware, async (req, res) => {
    //check for user validity
    const user1 = await User.findOne({_id:req.userId});
    if (!user1) {
        return res.status(404).json({message:"Invalid user"});
    }
    //user1.posts.filter((post) => post === req.query.postId);
    const post = await Post.findOneAndDelete({_id:req.query.postId}); 
    const user = await User.findOneAndUpdate({_id: req.userId}, {$pull : {posts : req.query.postId}});
    res.status(200).json({post, user});

})

postRouter.put("/addLike", authMiddleware, async(req, res) => {
    //check for user validity
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({message:"Invalid user"});
    }
    const post = await Post.findOneAndUpdate({_id:req.query.postId}, {$addToSet : {likes : req.userId}});
    /*if (!post.likes.includes(user._id)) {
        post.likes.push(user._id);
    }*/
    res.status(200).json(post);

})

postRouter.put("/removeLike", authMiddleware, async(req, res) => {
    //check for user validity
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({message:"Invalid user"});
    }
    const post = await Post.findOneAndUpdate({_id:req.query.postId}, {$pull : {likes : req.userId}});
    /*if (post.likes.includes(user._id)) {
        post.likes.filter((id) => id !== user._id);
    }*/
    res.status(200).json(post);

})

postRouter.put("/addComment", authMiddleware, async(req, res) => {
    //check for user validity
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({message:"Invalid user"});
    }
    const post = await Post.findOne({_id:req.query.postId});
    if (!post) {
        return res.status(404).json({message:"No such post exist"});
    }
    const comment = await Comment.create({
        postId:req.query.postId,
        userId: req.userId,
        content: req.body.content,
        
    }) 

    res.status(200).json(comment);

})

postRouter.put("/removeComment", authMiddleware, async(req, res) => {
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({message:"Invalid user"});
    }
    const post = await Post.findOne({_id:req.query.postId});
    if (!post) {
        return res.status(404).json({message:"No such post exist"});
    }
    const comment = await Comment.findOneAndDelete({_id:req.query.commentId});
    res.status(200).json(comment);

})

postRouter.get("/posts", authMiddleware, async(req, res) => {
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(404).json({message:"Invalid user"});
    }
    //const posts = [];
    const posts = await Post.find({userId: req.userId});
    res.status(200).json(posts);
     
})

postRouter.get("/allPosts", authMiddleware, async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json(posts);
})



module.exports = postRouter;
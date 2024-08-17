const express = require("express");
const authMiddleware = require("../authMiddleware");
const { User } = require("../db");
const zod = require("zod");
const multer = require("multer");

const updateBody = zod.object({
    picturePath: zod.string().optional(),
    location: zod.string().optional(),
    occupation: zod.string().optional(),
    password: zod.string().optional(),
    username: zod.string().optional()


})


const userRouter = express.Router();

userRouter.get("/realProfile", authMiddleware, async (req, res) => {
    const id = req.userId;
    const user = await User.findOne({_id:req.userId});
    
    res.status(200).json(user);

})

userRouter.get("/profile", authMiddleware, async (req, res) => {
    const id = req.query.id;
    const user = await User.findOne({_id:id});
    
    res.status(200).json(user);

})
// adding friend to friends list
userRouter.get("/friend", authMiddleware, async(req, res) => {
    const friendId = req.query.friendId;
    const isValid = await User.findOne({_id: friendId});
    if (!isValid) {
        return res.status(404).json({message:"Invalid user"});
    }
    if (friendId === req.userId) {
        return res.status(404).json({message:"Invalid friend"});
    }

    const user = await User.findByIdAndUpdate({_id:req.userId}, {$addToSet : { friends: friendId}});
    //const isAlreadyFriend = user.friends.includes(isValid);
    const friend = await User.findByIdAndUpdate({_id:friendId}, {$addToSet : {friends : req.userId}});

    
   
    res.status(200).json({
        user: user.friends,
        friend: friend.friends
    });
    



})
//removing friend from friends list
userRouter.put("/removeFriend", authMiddleware, async (req, res) => {
    
    const friendId = req.query.friendId;
    const isValid = await User.findOne({_id: friendId});
    if (!isValid) {
        return res.status(404).json({message:"Invalid user"});
    }

    const user = await User.findByIdAndUpdate({_id:req.userId}, {$pull : {friends: friendId}});
    const friend = await User.findByIdAndUpdate({_id:friendId}, {$pull : {friends: req.userId}});
    
    res.status(200).json({
        user: user.friends,
        friend: friend.friends
    });


})
//get all the friends
userRouter.get("/friends", authMiddleware, async (req, res) => {
    const userId = req.userId;
    
    const user = await User.findOne({_id: userId})
    const friends2 = []; 

    const friends = await Promise.all(user.friends.map(async (id) => {
        return await User.findOne({ _id: id });
    }));

    if (!user) {
          return res.status(411).json({message:"Invalid User"});
    }
    res.status(200).json({friends: friends}); 

})

//get allusers
userRouter.get("/allUsers", async (req, res) => {
    const users = await User.find({});
    res.status(200).json({users: users});
})


const storage = multer.diskStorage({
    destination : "uploads",
    filename : (req, file, cb) => {
        return  cb(null, `${Date.now()}${file.originalname}`); 
    }
})

const upload = multer({storage: storage});
//update on user profile
userRouter.put("/updateUser", authMiddleware, upload.single('image'), async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: "Invalid Inputs"});
    }
    const user = await User.findOne({_id:req.userId});
    if (!user) {
        return res.status(411).json({message: "Invalid user"});
    }
    const image_path = req.file.filename;
    req.body.profilePicture = image_path;
    const update = await User.updateOne({_id:req.userId}, req.body);
    
    res.status(200).json(update);
})


module.exports = userRouter;
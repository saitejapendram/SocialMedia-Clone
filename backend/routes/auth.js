const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const authRouter = express.Router();

const signupBody = zod.object({
    email : zod.string().email(),
    username: zod.string(),
    password: zod.string(),
    location: zod.string(),
    occupation: zod.string()
})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

authRouter.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    
    if (!success) {
        return res.status(404).json({message: "error while signup"});
    }
    const userExist = await User.findOne({email: req.body.email});
    if (userExist) {
        return res.status(404).json({message: "user already existed"});
    }
    const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        location: req.body.location,
        occupation: req.body.occupation

    });

    //const token = jwt.sign({userId: user._id}, JWT_SECRET);
    

    res.status(200).jsonp({
        message:"signup successfull"
    });

})

authRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(404).json({message:"Error while signin"});
    }
    const user = await User.findOne({
        email:req.body.email,
        password: req.body.password
    });

    if (!user) {
        return res.status(411).json({message: "Invalid user"});
    };

    const token = jwt.sign({userId:user._id}, JWT_SECRET);
    res.status(200).json({token:token});

})


module.exports = authRouter;
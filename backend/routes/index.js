const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");

const rootRouter = express.Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);


module.exports = rootRouter;


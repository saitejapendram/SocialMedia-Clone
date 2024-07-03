const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = async (req, res, next) => {
      const authHeaders = req.headers.authorization;
      if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
           return res.status(403).json({message:"Invalid Token"});
      }

      const token = authHeaders.split(" ")[1];

      const tokenBody = jwt.verify(token, JWT_SECRET);
      req.userId = tokenBody.userId;
      next(); 



}

module.exports = authMiddleware;
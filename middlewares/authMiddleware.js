const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        // console.log("authMiddleware");
        next();
      }
    } catch (error) {
      throw new Error("Not Authorization token expired , Please Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    // console.log("isAdmin");
    next();
  }
};

module.exports = { authMiddleware, isAdmin };

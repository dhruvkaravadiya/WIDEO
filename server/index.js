const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();
const dbConnectionLink = process.env.MONGO_STRING;
const userRoutes = require('./routes/users');
const videosRoutes = require('./routes/videos');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auths');
const error = require("./middlewares/error");
const cookieParser = require("cookie-parser");
mongoose
  .connect(dbConnectionLink)
  .then(() => {
    console.log("Connected To Mongodb");
  })
  .catch((err) => {
    console.log(err.message);
    throw err;
  });
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api/auth',authRoutes);
  app.use('/api/users',userRoutes);
  app.use('/api/videos',videosRoutes);
  app.use('/api/comments',commentRoutes);
  app.use(error);
  app.listen(3333, () => {
  console.log("Listening at Port 3333");
});
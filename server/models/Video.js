const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({ 
    user:{
      id: {
        type: String,
        required: true,
      },
      name:{
        type:String,
        required:true,
      },
      imgUrl:{
        type:String,
        required:true
      },
    },
    title:{
      type:String,
      require:true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },  
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type:[String],
      default: []
    },
    dislikes: { type: [String], default: [] },
  },
  { timestamps: true  , versionKey : false}
);

const Video = mongoose.model('Video',videoSchema);

module.exports = Video;
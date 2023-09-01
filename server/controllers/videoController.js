const Video = require("../models/Video");
const User = require("../models/User");
async function getVideo(req, res) {
  const video = await Video.findById(req.params.id);
  res.status(200).send(video);
}

async function addVideo(req, res) {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try{const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);}
    catch(err){
      console.log(err);
    }
}



async function editVideo(req, res) {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).send("Video Not Found");
  }
  if (req.user.id == video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedVideo);
  } else {
    return res.status(403).send("You can update only your video");
  }
}

async function deleteVideo(req, res) {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return res.status(404).send("Video Not Found");
  }
  if (req.user.id == video.userId) {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).send("Video has been deleted");
  } else {
    return res.status(403).send("You can delete only your video");
  }
}


async function addView(req, res) {
  await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
  res.status(200).send("Video View Increased");
}

async function getRandomVideos(req, res) {
  const randomVideos = await Video.aggregate([{ $sample: { size: 40 } }]);
  res.status(200).send(randomVideos);
}

async function getTrendingVideos(req, res) {
  const trendingVideos = await Video.find().sort({ views: -1 });
  res.status(200).send(trendingVideos);
}

async function getSubscribedVideos(req, res) {
  const user = await User.findById(req.user.id);
  const subscribedChannels = user.subscribedChannels;
  const list = await Promise.all(
    subscribedChannels.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );
  res.status(200).send(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
}

async function searchVideosByTitle(req,res){
  const results = req.query.search_query;
    const videos = await Video.find({title:{
      $regex:results,
      $options:"i"
    }});
    res.send(videos);
}
async function getVideosByTags(req,res){
  const tags = req.query.tags.split(",");
  const videos = await Video.find({tags:{$in:tags}}).limit(20);  
  res.send(videos);
}
module.exports = {
  addVideo,
  editVideo,
  deleteVideo,
  getVideo,
  addView,
  getTrendingVideos,
  getRandomVideos,
  getSubscribedVideos,
  searchVideosByTitle,
  getVideosByTags
};

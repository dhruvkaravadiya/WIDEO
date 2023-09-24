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
    return res.status(200).send(updatedVideo);
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
    return res.status(200).send("Video has been deleted");
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
    subscribedChannels.map((user) => {
      return Video.find({ userId: user.id });
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

async function getVideosByUserID(req, res) {
  try {
    const userId = req.params.id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userVideoIds = user.videos;
    const userVideos = await Video.find({ _id: { $in: userVideoIds } });
    res.status(200).json(userVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//like a video
async function like(req, res) {
  console.log("User Id : ",req.user.id);
  
  const id = req.user.id;
  if(!id){
    return res.status(400).send("Id not given");
  }
  const videoId = req.params.id;
  console.log("Video Id : ",req.params.id);
  if(!videoId){
    return res.status(400).send("Video ID missing");
  }
  await Video.findByIdAndUpdate(videoId , {$addToSet : {likes:id},$pull:{dislikes:id}});
  res.status(200).send("Liked the Video");
}
//dislike a video
async function dislike(req, res) {
  const id = req.user.id;
  if(!id){
    return res.status(400).send("Id not given");
  }
  const videoId = req.params.id;
  if(videoId){
    return res.status(400).send("Video ID missing");
  }
  await Video.findByIdAndUpdate(videoId , {
    $addToSet : {dislikes:id},
    $pull:{likes:id}
  });
  res.status(200).send("DisLiked the Video");
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
  getVideosByTags,
  getVideosByUserID,
  like,
  dislike
};

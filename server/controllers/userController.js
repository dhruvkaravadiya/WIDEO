const User = require("../models/User");
const Video = require("../models/Video");
//get a user
async function getUser(req, res) {
  const user = await User.findById(req.params.id);
  if(!user){
    return res.status(404).send('User Not Found');
  }
  res.status(200).send(user);
}
//delete a user
async function deleteUser(req, res) {
  if (req.params.id == req.user.id) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } else {
    return res.status(403).send("You can delete only your Account");
  }
}
//update user details
async function updateUser(req, res) {
  if (req.params.id == req.user.id) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    return res.status(403).send("You can update only your Account");
  }
}
//subscribe to a channel
async function subscribe(req, res) {
    await User.findByIdAndUpdate(req.user.id,{$push:{subscribedChannels:req.params.id}});
    await User.findByIdAndUpdate(req.params.id , {$inc:{
      subscribers:1
    }});
    res.status(200).send('Successfully Subscribed');
}
//unsubscribe to a channel
async function unSubscribe(req, res) {
  await User.findByIdAndUpdate(req.user.id,{$pull:{subscribedChannels:req.params.id}});
  await User.findByIdAndUpdate(req.params.id , {$inc:{
    subscribers:-1
  }});
  res.status(200).send('Unsubscribed');
}
//like a video
async function like(req, res) {
  const id = req.user.id;
  const videoId = req.params.videoId;
  await Video.findByIdAndUpdate(videoId , {$addToSet : {likes:id},$pull:{dislikes:id}});
  res.status(200).send("Liked the Video");
}
//dislike a video
async function dislike(req, res) {
  const id = req.user.id;
  const videoId = req.params.videoId;
  await Video.findByIdAndUpdate(videoId , {
    $addToSet : {dislikes:id},
    $pull:{likes:id}
  });
  res.status(200).send("DisLiked the Video");
}
module.exports = {
  getUser,
  deleteUser,
  updateUser,
  subscribe,
  unSubscribe,
  like,
  dislike,
};

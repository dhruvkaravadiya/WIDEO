const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async');
const verifyToken = require('../middlewares/verifyToken');
//Find Video
router.get('/find/:id',asyncMiddleware(videoController.getVideo));
//Delete Video
router.delete('/:id',verifyToken,asyncMiddleware(videoController.deleteVideo));
//New Video
router.post('/',verifyToken,asyncMiddleware(videoController.addVideo));
//Edit Video
router.put('/:id',verifyToken,asyncMiddleware(videoController.editVideo));
//view a Video
router.put('/view/:id',asyncMiddleware(videoController.addView));
//trending Videos
router.get('/trending',asyncMiddleware(videoController.getTrendingVideos));
//random Videos
router.get('/random',asyncMiddleware(videoController.getRandomVideos));
//subscribed Videos
router.get('/subscribed',verifyToken,asyncMiddleware(videoController.getSubscribedVideos));
//search videos by tags
router.get('/tags',asyncMiddleware(videoController.getVideosByTags));
//search videos by title
router.get('/search',asyncMiddleware(videoController.searchVideosByTitle));
module.exports = router;
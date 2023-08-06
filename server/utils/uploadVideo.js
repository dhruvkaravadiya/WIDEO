// Import the Cloudinary library and the 'dotenv' module for environment variables
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure the Cloudinary SDK with your Cloudinary credentials
cloudinary.config({ 
  cloud_name: 'ddxq9mouk', 
  api_key: '666653752373468', 
  api_secret: 'Y66Mvn45czm5Vcgh7OjcDZBo7Sg' 
});

// Define an async function to upload a video to Cloudinary
async function uploadVideo(videoPath, options) {
  return new Promise((resolve, reject) => {
    // Use the Cloudinary uploader method to upload the video
    cloudinary.uploader.upload(videoPath, options, (error, result) => {
      // The callback function handles the response from Cloudinary
      if (error) {
        // If there's an error during the upload, reject the promise with the error
        reject(error);
      } else {
        // If the upload is successful, resolve the promise with the result data
        resolve(result);
      }
    });
  });
}

// Usage example:
const video = 'FORYOU.mp4';

(async () => {
  try {
    // Define the options object with various upload parameters
    const options = {
      resource_type: "video", 
      public_id: "myfolder/mysubfolder/dog_closeup",
      chunk_size: 6000000,
      eager: [
        { width: 1280, height: 720, crop: "pad" },
        { width: 160, height: 100, crop: "crop", gravity: "south" },
      ],
      eager_async: true,
      eager_notification_url: "https://mysite.example.com/notify_endpoint",
    };

    // Call the uploadVideo function and wait for the result using 'await'
    const result = await uploadVideo(video, options);
    console.log(result);
    // You can use 'result' data here or return it, depending on your use case.
  } catch (error) {
    console.error('Error uploading video:', error);
  }
})();

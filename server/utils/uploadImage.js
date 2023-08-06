const cloudinary = require('cloudinary').v2;
require('dotenv').config();
// Configure the Cloudinary SDK with your Cloudinary credentials
cloudinary.config({ 
  cloud_name: 'ddxq9mouk', 
  api_key: '666653752373468', 
  api_secret: 'Y66Mvn45czm5Vcgh7OjcDZBo7Sg' 
});
// Define an async function to upload an image to Cloudinary
async function uploadImage(imagePath, publicId) {
  return new Promise((resolve, reject) => {
    // Use the Cloudinary uploader method to upload the image
    cloudinary.uploader.upload(imagePath, { public_id: publicId }, (error, result) => {
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
// Usage :
const image = './background.jpg';
const publicId = 'background';

(async () => {
  try {
    // Call the uploadImage function and wait for the result using 'await'
    const result = await uploadImage(image, publicId);
    console.log(result);
    // You can use 'result' data here or return it, depending on your use case.
  } catch (error) {
    console.error('Error uploading image:', error);
  }
})();
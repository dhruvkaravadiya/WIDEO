const cloudinary = require('cloudinary').v2;
require('dotenv').config();

console.log(process.env.CLOUDINARY_NAME);
cloudinary.config({ 
  cloud_name: 'ddxq9mouk', 
  api_key: '666653752373468', 
  api_secret: 'Y66Mvn45czm5Vcgh7OjcDZBo7Sg' 
});
const image = './background.jpg';
cloudinary.uploader.upload(image, { public_id: "background" }, function(error, result) {
  console.log(result);
});

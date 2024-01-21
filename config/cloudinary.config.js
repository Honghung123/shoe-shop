const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const streamifier = require('streamifier')
const {CloudinaryStorage} = require('multer-storage-cloudinary');

 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  
});

const cloudStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shoe-shop',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

 

module.exports = cloudStorage;

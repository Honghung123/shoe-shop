const cloudStorage = require('./cloudinary.config')
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: cloudStorage,
    fileFilter: (req, file, cb) => {
        try {
            let ext = path.extname(file.originalname);
            console.log(file);
            if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
                cb(new Error("File type is not supported"), false);
                return;
            }
            cb(null, true);
        } catch (error) {
            console.log("Error");
            console.log(error);
        }
    },
})
module.exports = upload


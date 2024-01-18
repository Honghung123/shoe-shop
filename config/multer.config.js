const {storage} = require('./cloudinary.config')
const multer = require('multer')
const upload = multer({storage})
module.exports = upload
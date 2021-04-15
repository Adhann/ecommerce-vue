const path = require('path')
const Multer = require('multer');
// const uploadFolder = __dirname + '/public/img';

// const storage = Multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadFolder)
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = Multer({ storage: storage })
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
module.exports = multer 
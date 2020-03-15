import multer from 'multer'
import path from 'path'
const upload = multer({
  storage: multer.memoryStorage({}),
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('poster')

// const Storage = multer.diskStorage({
//   destination (req, file, callback) {
//     callback(null, './images')
//   },
//   filename (req, file, callback) {
//     callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
//   },
// })
// const upload = multer({ storage: Storage }).single('poster')

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}
export default upload
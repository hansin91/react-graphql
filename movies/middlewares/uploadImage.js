import multer from 'multer'
import path from 'path'
const upload = multer({
  storage: multer.memoryStorage({}),
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('poster_path')

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
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pptx|docx|xlsx/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  isValid ? cb(null, true) : cb(new Error('Only pptx, docx, xlsx files are allowed'));
};

module.exports = multer({ storage, fileFilter });

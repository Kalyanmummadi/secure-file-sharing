const File = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      uploader: req.user.id,
      fileType: req.file.mimetype.split('/')[1],
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed' });
  }
};

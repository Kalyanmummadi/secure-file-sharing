const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileType: { type: String, enum: ['pptx', 'docx', 'xlsx'], required: true },
});

module.exports = mongoose.model('File', FileSchema);

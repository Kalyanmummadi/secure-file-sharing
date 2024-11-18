const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const File = require('../models/File');

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      role: 'client',
    });
    await user.save();

    const verificationToken = crypto.randomBytes(16).toString('hex');
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Account Verification',
      html: `<p>Click <a href="http://localhost:${process.env.PORT}/client/verify/${verificationToken}">here</a> to verify your account.</p>`,
    };

    transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Verification email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Sign-up failed' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const downloadToken = crypto.randomBytes(16).toString('hex');
    const downloadLink = `http://localhost:${process.env.PORT}/download/${downloadToken}`;
    res.json({ downloadLink });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate download link' });
  }
};

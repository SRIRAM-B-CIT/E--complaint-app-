const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  corporation: {
    type: String,
    enum: ["road", "garbage", "electricity", null],
    default: null,
  },
  area: {
    type: String,
    trim: true,
    default: null,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

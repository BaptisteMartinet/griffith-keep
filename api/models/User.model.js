const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true, select: false },
  password: { type: String, required: true, select: false },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema, 'users');

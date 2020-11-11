const mongoose = require('mongoose');

//MongoDB Schema for the users
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    max: [255, 'Name has a limit of 255 characters'],
    min: [2, 'Name has a minimum of 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is unique'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    max: [1024, 'Password has a limit of 1024 characters'],
    min: [6, 'Password has a minimum of 6 characters'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;

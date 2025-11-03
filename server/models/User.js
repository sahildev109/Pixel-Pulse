import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);
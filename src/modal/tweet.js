import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;

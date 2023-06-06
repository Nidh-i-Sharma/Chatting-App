import Schema from 'mongoose'
const { Schema } = mongoose;

// Define Post schema
const postSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  comments: [
    { userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }, 
  content: String 
}
],
likes: [
  { type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
});

var Post = mongoose.model('Post', postSchema);
export default Post;
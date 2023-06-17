// import express from 'express'
// import createPost, {getPost,updatePost,deletePost,commentAddOnPost,likeOnPost,retriveCommentOnPost,retriveLikeOnPost} 
// from "../controller/post.js";

// const router = express.Router()

// router.post('/posts',createPost)
// router.get('/posts',getPost)
// router.put('/posts/:id',updatePost)
// router.delete('/posts/:id',deletePost)
// router.post('/posts/:postId/comments',commentAddOnPost)
// router.post('/posts/:postId/likes',likeOnPost)
// router.get('/posts/:postId/comments',retriveCommentOnPost)
// router.get('/posts/:postId/likes',retriveLikeOnPost)
// export default router;
import { Router } from 'express';
import createTweet,{  getFollowedTweets, searchTweets } from '../controller/tweet.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Create a new tweet
router.post('/tweets', authenticateToken, createTweet);

// Get tweets from followed users
router.get('/tweets/followed', authenticateToken, getFollowedTweets);

// Search tweets by keyword or hashtag
router.get('/tweets/search/:query', authenticateToken, searchTweets);

export default router;

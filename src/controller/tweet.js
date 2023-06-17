import  { validationResult } from 'express-validator';
import  Tweet from '../modal/tweet.js';
import  User from '../modal/user.js';

// Create a tweet
export default async function createTweet(req, res){
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract tweet information from request body
    const { text } = req.body;

    // Create a new tweet
    const tweet = new Tweet({
      text,
      author: req.user.userId,
    });

    // Save the tweet to the database
    await tweet.save();

    res.status(201).json({ message: 'Tweet created successfully', tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get tweets from followed users
// Get tweets from followed users with pagination
export async function getFollowedTweets(req, res){
    try {
      const page = parseInt(req.query.page) || 1; // Current page number
      const limit = parseInt(req.query.limit) || 10; // Number of tweets per page
  
      // Find the user and populate the 'following' field
      const user = await User.findById(req.user.userId).populate('following');
  
      // Get total number of tweets from followed users
      const totalTweets = await Tweet.countDocuments({ author: { $in: user.following } });
  
      // Calculate the total number of pages
      const totalPages = Math.ceil(totalTweets / limit);
  
      // Calculate the starting index of the tweets
      const startIndex = (page - 1) * limit;
  
      // Fetch tweets from followed users with pagination
      const tweets = await Tweet.find({ author: { $in: user.following } })
        .sort({ createdAt: -1 })
        .populate('author')
        .skip(startIndex)
        .limit(limit);
  
      res.status(200).json({ tweets, totalPages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

// Search tweets by keyword or hashtag
export async function searchTweets(req, res){
  try {
    // Extract search query from request parameters
    const { query } = req.params;

    // Find tweets that match the query
    const tweets = await Tweet.find({ text: { $regex: query, $options: 'i' } })
      .sort({ createdAt: -1 })
      .populate('author');

    res.status(200).json({ tweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Search tweets by keyword or hashtag
// exports.searchTweet = async (req, res) => {
//     try {
//       const { query } = req.params; // Search query
  
//       const page = parseInt(req.query.page) || 1; // Current page number
//       const limit = parseInt(req.query.limit) || 10; // Number of tweets per page
  
//       // Get total number of matching tweets
//       const totalTweets = await Tweet.countDocuments({ text: { $regex: query, $options: 'i' } });
  
//       // Calculate the total number of pages
//       const totalPages = Math.ceil(totalTweets / limit);
  
//       // Calculate the starting index of the tweets
//       const startIndex = (page - 1) * limit;
  
//       // Fetch matching tweets with pagination
//       const tweets = await Tweet.find({ text: { $regex: query, $options: 'i' } })
//         .sort({ createdAt: -1 })
//         .populate('author')
//         .skip(startIndex)
//         .limit(limit);
  
//       res.status(200).json({ tweets, totalPages });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
  

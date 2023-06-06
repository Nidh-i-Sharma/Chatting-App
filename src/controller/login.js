import express from 'express'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModal from '../modal/user.js'
import { generateAccessToken } from '../middleware/auth.js';
import * as dotenv from 'dotenv'
dotenv.config()
let jwtkey = process.env.JWTSECRET_KEY

export default async function createUser(req, res) {

    let { fullname, email, password, contactNumber } = req.body;
    try {

        const existingUser = await userModal.findOne({ email: email });

        if (existingUser) return res.status(400).json({ message: "This User is already exist!" })
        //hash the  password
        bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            const saveUser = new userModal({fullname, email, password, contactNumber});
            let newUser = await saveUser.save();
            res.status(201).json({ message: "User Created Successfully", data: user })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: JSON.stringify(error), success: false })
    }
}

export async function logIn(req, res) {
    try {
        let { password, email } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and Password is required" })

        const user = await userModal.findOne({ email: email })
        if (!user) return res.status(400).json({ message: "User Is not exist" })
        var validPassword;
        if (user) {
            validPassword = await bcrypt.compare(password, user.password);
        }
        if (!validPassword) {
            return res.json({ message: "password is invalid" })
        }
        user.password = ""
        const token = generateAccessToken(user);
        return res.status(201).json({ message: "Logged in successfully", token: token, data: user, success: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: JSON.stringify(error), success: false })
    }
}

// Create user profile route
export  async function  uploadProfile(req,res){
    const { username, fullName } = req.body;
  
    try {
      const user = await userModal.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
  
      // Create a new user profile
      const newUser = new User({
        username,
        fullName,
        profilePicture: req.files['profilePicture'][0].filename,
        coverPhoto: req.files['coverPhoto'][0].filename,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'Profile created successfully' });
    } catch (err) {
      console.error('Error creating user profile:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  
  // Update user profile route
export  async function updateProfilePicture(req,res){
    const { username } = req.params;
    const { fullName } = req.body;
  
    try {
      const user = await userModal.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user profile
      user.fullName = fullName;
      if (req.files['profilePicture']) {
        user.profilePicture = req.files['profilePicture'][0].filename;
      }
      if (req.files['coverPhoto']) {
        user.coverPhoto = req.files['coverPhoto'][0].filename;
      }
  
      await user.save();
  
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
};
export  async function sendingFriendRequest(req, res) {
  const { userId } = req.params;
  const { senderId } = req.body;

  try {
    const senderUser = await userModal.findById(senderId);
    const receiverUser = await userModal.findById(userId);

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if friend request already exists
    if (receiverUser.friends.includes(senderId) || senderUser.friends.includes(userId)) {
      return res.status(400).json({ message: 'Friend request already sent or already friends' });
    }

    receiverUser.friends.push(senderId);
    senderUser.followers.push(userId);

    await receiverUser.save();
    await senderUser.save();

    res.json({ message: 'Friend request sent successfully' });
  } catch (err) {
    console.error('Error sending friend request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export  async function acceptingFriendRequst(req,res){
 
    const { userId } = req.params;
    const { friendId } = req.body;
  
    try {
      const user = await userModal.findById(userId);
      const friend = await userModal.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or friend not found' });
      }
  
      // Check if friend request exists
      if (!user.friends.includes(friendId) || !friend.followers.includes(userId)) {
        return res.status(400).json({ message: 'No pending friend request' });
      }
  
      user.friends.push(friendId);
      friend.followers.push(userId);
  
      // Remove friend request from user's followers
      user.followers = user.followers.filter((follower) => follower.toString() !== friendId.toString());
  
      await user.save();
      await friend.save();
  
      res.json({ message: 'Friend request accepted successfully' });
    } catch (err) {
      console.error('Error accepting friend request:', err);
      res.status(500).json({ message: 'Internal server error' });
    }  
}
export  async function retiveUsersFriends(req,res){
    const { userId } = req.params;
  
    try {
      const user = await userModal.findById(userId).populate('friends', 'username fullName');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.friends);
    } catch (err) {
      console.error('Error retrieving user friends:', err);
      res.status(500).json({ message: 'Internal server error' });
    }  
}
export  async function retiveUsersFollwoers(req,res){
    const { userId } = req.params;
  
    try {
      const user = await userModal.findById(userId).populate('followers', 'username fullName');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.followers);
    } catch (err) {
      console.error('Error retrieving user followers:', err);
      res.status(500).json({ message: 'Internal server error' });
    }  
}
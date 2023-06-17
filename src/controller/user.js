import  User from '../modal/user.js';

// Follow a user
export default async function followUser(req, res){
  try {
    // Get the current user's ID
    const { userId } = req.user;

    // Get the user to follow's ID
    const { userIdToFollow } = req.params;

    // Check if the user to follow exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current user is already following the user
    const currentUser = await User.findById(userId);
    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Add the user to follow's ID to the current user's 'following' array
    currentUser.following.push(userIdToFollow);
    await currentUser.save();

    // Add the current user's ID to the user to follow's 'followers' array
    userToFollow.followers.push(userId);
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Unfollow a user
export async function unfollowUser(req, res){
  try {
    // Get the current user's ID
    const { userId } = req.user;

    // Get the user to unfollow's ID
    const { userIdToUnfollow } = req.params;

    // Check if the user to unfollow exists
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current user is already not following the user
    const currentUser = await User.findById(userId);
    if (!currentUser.following.includes(userIdToUnfollow)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    // Remove the user to unfollow's ID from the current user's 'following' array
    currentUser.following.pull(userIdToUnfollow);
    await currentUser.save();

    // Remove the current user's ID from the user to unfollow's 'followers' array
    userToUnfollow.followers.pull(userId);
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

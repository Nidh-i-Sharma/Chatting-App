import { Router } from 'express';
import followUser, { unfollowUser } from '../controller/user.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Follow a user
router.post('/users/follow/:userIdToFollow', authenticateToken, followUser);

// Unfollow a user
router.post('/users/unfollow/:userIdToUnfollow', authenticateToken, unfollowUser);

export default router;

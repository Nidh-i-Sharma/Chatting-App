import { Router } from 'express';
import register, {  login, resetPassword } from '../controller/auth.js';

const router = Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Reset password
router.post('/reset-password', resetPassword);

router.get('/forgetpassword/:userId/:token',sendforgetpasswordLink)

export default router;

// import express from 'express'
// import multer from 'multer';

// const router = express.Router();
// const upload = multer({
//     dest: 'uploads/', // Directory where uploaded files will be stored
//   });
// import createUser, {retiveUsersFollwoers, uploadProfile, updateProfilePicture,logIn , sendingFriendRequest,acceptingFriendRequst,
//   retiveUsersFriends } from '../controller/login.js';
// router.post('/userregister', createUser)
// router.get('/login', logIn)
// router.post('/profile', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }] , uploadProfile))
// router.put('/profile/:username', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }] , updateProfilePicture))
// router.post('/friends/:userId/request',sendingFriendRequest)
// router.put('/friends/:userId/accept',acceptingFriendRequst)
// router.get('/friends/:userId',retiveUsersFriends )
// router.get('/followers/:userId', retiveUsersFollwoers)

// export default router;
import express, {  NextFunction ,Request,Response} from 'express'
const router = express.Router();
import { authenticateToken }  from './middleware/auth.js'
const upload = multer({
    dest: 'uploads/', // Directory where uploaded files will be stored
  });
import  { uploadProfile,createUser, updateProfilePicture,logIn , sendingFriendRequest,acceptingFriendRequst,retiveUsersFriends,retiveUsersFollwoers } from '../controller/login.js';
router.post('/userregister', createUser)
router.get('/login', authenticateToken, logIn)
router.post('/profile', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }] , uploadProfile))
router.put('/profile/:username', upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }] , updateProfilePicture))
router.post('/friends/:userId/request',sendingFriendRequest)
router.put('/friends/:userId/accept',acceptingFriendRequst)
router.get('/friends/:userId',retiveUsersFriends )
router.get('/followers/:userId', retiveUsersFollwoers)

export default router;
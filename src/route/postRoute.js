import express from 'express'
import { createConnection } from "mongoose";
import {createPost,getPost,updatePost,deletePost,commentAddOnPost,likeOnPost,retriveCommentOnPost,retriveLikeOnPost} 
from "../controller/post.js";

const router = express.Router()

router.post('/posts',createPost)
router.get('/posts',getPost)
router.put('/posts/:id',updatePost)
router.delete('/posts/:id',deletePost)
router.post('/posts/:postId/comments',commentAddOnPost)
router.post('/posts/:postId/likes',likeOnPost)
router.get('/posts/:postId/comments',retriveCommentOnPost)
router.get('/posts/:postId/likes',retriveLikeOnPost)
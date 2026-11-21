import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  joinEvent,
} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);
router.put('/updatepost/:postId/:userId', verifyUser, updatePost);
router.post('/join/:postId', verifyUser, joinEvent);

export default router;
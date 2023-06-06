import express from 'express'
import Post from '../modal/post'
export default async function createPost(req, res) {
  const { userId, content } = req.body;

  try {
    const post = new Post({ userId, content });
    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function getPost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function updatePost(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.content = content;
    await post.save();

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function commentAddOnPost(req, res) {
  const { postId } = req.params;
  const { userId, content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({ userId, content });
    await post.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function likeOnPost(req, res) {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(201).json({ message: 'Post liked successfully' });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function retriveCommentOnPost(req, res) {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post.comments);
  } catch (err) {
    console.error('Error retrieving comments:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export default async function retriveLikeOnPost(req, res) {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post.likes);
  } catch (err) {
    console.error('Error retrieving likes:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const Blog = require('../models/blog.model');

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id;

    const blog = await Blog.create({
      title,
      content,
      author: userId,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getMyBlogs };
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

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const deleteBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    if (blog.author.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog',
      });
      return;
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const blogs = await Blog.find({ author: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error('Get my blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getMyBlogs };
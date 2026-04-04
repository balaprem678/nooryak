import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content for this blog post.'],
  },
  excerpt: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: [true, 'Please provide an image for this blog post.'],
  },
  author: {
    type: String,
    default: 'Admin',
  },
  category: {
    type: String,
    default: 'General',
  },
  tags: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog post.'],
    unique: true,
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

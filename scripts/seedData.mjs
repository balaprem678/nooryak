import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nooryak';

// Define Schemas (Simplified for Seeding)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, default: '' },
  image: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  category: { type: String, default: 'General' },
  tags: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Published', 'Not Published'], default: 'Published' },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'flaticon-settings' },
}, { timestamps: true });

// Models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const sampleBlogs = [
  {
    title: "10 Essential Digital Marketing Strategies",
    excerpt: "Discover the most effective ways to grow your brand online in 2026.",
    content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><h3>1. Content is King</h3><p>Focus on creating high-quality, valuable content for your audience.</p>",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    tags: ["SEO", "Digital", "Growth"],
    slug: "10-essential-digital-marketing-strategies",
    isFeatured: true,
    status: "Published",
    views: 150
  },
  {
    title: "Why React 19 is a Game Changer",
    excerpt: "A deep dive into the latest features of React and how they improve performance.",
    content: "<p>React 19 introduces several revolutionary features that streamline the developer experience and boost application performance.</p><ul><li>Server Components</li><li>Actions API</li><li>Optimized Suspense</li></ul>",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Development",
    tags: ["React", "JavaScript", "Frontend"],
    slug: "why-react-19-is-a-game-changer",
    isFeatured: false,
    status: "Published",
    views: 85
  },
  {
    title: "The Future of AI in Business Automations",
    excerpt: "How artificial intelligence is reshaping mundane business tasks.",
    content: "<p>AI automations are no longer just for tech giants. Small businesses can now leverage AI to handle customer support, inventory management, and more.</p>",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    tags: ["AI", "Automation", "Future"],
    slug: "the-future-of-ai-in-business-automations",
    isFeatured: true,
    status: "Published",
    views: 210
  },
  {
    title: "Building Scalable Web Applications",
    excerpt: "Key principles to follow when designing architecture for high-traffic sites.",
    content: "<p>Scalability starts from the database and moves up to the load balancer. Learn the best practices for horizontal scaling.</p>",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Development",
    tags: ["Architecture", "Backend", "Scalability"],
    slug: "building-scalable-web-applications",
    isFeatured: false,
    status: "Published",
    views: 45
  },
  {
    title: "The Importance of Branding for Startups",
    excerpt: "Why your visual identity matters more than you think.",
    content: "<p>A brand is not just a logo; it's the personality of your business. Discover how to build a lasting brand identity.</p>",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Branding",
    tags: ["Design", "Identity", "Startup"],
    slug: "importance-of-branding-for-startups",
    isFeatured: false,
    status: "Published",
    views: 120
  },
  {
    title: "SEO Best Practices for 2026",
    excerpt: "Stay ahead of the competition with these vital search engine optimization tips.",
    content: "<p>SEO is constantly evolving. In 2026, user experience and semantic search will dominate the rankings.</p>",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    tags: ["SEO", "Google", "Ranking"],
    slug: "seo-best-practices-2026",
    isFeatured: false,
    status: "Published",
    views: 300
  }
];

const sampleServices = [
  {
    name: "Digital Marketing & Ads",
    slug: "digital-marketing-ads",
    description: "Results-driven digital marketing campaigns focused on ROI.",
    content: "<h3>Elevate Your Brand with Data-Driven Marketing</h3><p>We craft specialized marketing strategies that target your ideal audience across social media and search engines. Our services include PPC, Meta Ads, and comprehensive performance marketing.</p>",
    icon: "flaticon-marketing"
  },
  {
    name: "Web & App Development",
    slug: "web-app-development",
    description: "Building fast, secure, and scalable digital solutions.",
    content: "<h3>Modern Web and Mobile Solutions</h3><p>Using React, Next.js, and Node.js, we build high-performance applications tailored to your business goals. We focus on clean code, scalability, and exceptional user experience.</p>",
    icon: "flaticon-coding"
  },
  {
    name: "Branding & Design",
    slug: "branding-design",
    description: "Memorable visual identities that build trust.",
    content: "<h3>Crafting Unique Brand Identities</h3><p>Our design team specializes in creating minimalist and impactful brand identities. From logos to complete brand guidelines, we ensure your business looks professional and stand out.</p>",
    icon: "flaticon-branding"
  },
  {
    name: "AI & Automation",
    slug: "ai-automation",
    description: "Future-proof your business with smart systems.",
    content: "<h3>Efficiency through AI</h3><p>We help businesses implement AI-powered workflows that save time and reduce costs. From chatbot integration to automated logistics systems, we lead the way in business intelligence.</p>",
    icon: "flaticon-ai"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('--- Database Connected ---');

    // 1. Clear Existing Data
    console.log('Cleaning existing data...');
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Service.deleteMany({});

    // 2. Seed Admin User
    const adminEmail = 'admin@nooryak.com';
    const adminPassword = 'admin123';
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({ email: adminEmail, password: hashedAdminPassword });
    console.log('✅ Admin User Created: admin@nooryak.com / admin123');

    // 3. Seed Blogs
    await Blog.insertMany(sampleBlogs);
    console.log(`✅ ${sampleBlogs.length} Sample Blogs Seeded`);

    // 4. Seed Services
    await Service.insertMany(sampleServices);
    console.log(`✅ ${sampleServices.length} Sample Services Seeded`);

    console.log('--- Seeding Completed Successfully! ---');
  } catch (err) {
    console.error('❌ Seeding Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();

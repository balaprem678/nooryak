'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import "./blogdetail.scss"
import BlogSidebar from '../blogsidebar';
import FeatureProject from '../featureproject';
import { toast } from 'sonner';
import { Images } from '@/utils/Images';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  slug: string;
  date: string;
  createdAt: string;
  tags: string[];
  isFeatured?: boolean;
  status?: string;
  views?: number;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params ? (params as any).slug : null;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data.blog);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Failed to fetch blog post', err);
        setError('An error occurred while fetching the post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // Fetch blogs for sidebar and bottom section
  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        setAllBlogs(data.blogs || []);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const publishedBlogs = useMemo(() =>
    allBlogs.filter(b => !b.status || b.status === "Published"),
    [allBlogs]);

  const featuredBlogs = useMemo(() =>
    publishedBlogs.filter(b => b.isFeatured === true || String(b.isFeatured) === "true"),
    [publishedBlogs]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    publishedBlogs.forEach((b) => {
      if (b.category) {
        counts[b.category] = (counts[b.category] || 0) + 1;
      }
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));
  }, [publishedBlogs]);

  const popular = useMemo(() => {
    return [...publishedBlogs]
      .filter((b: Blog) => (b.views || 0) > 1)
      .sort((a: Blog, b: Blog) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  }, [publishedBlogs]);

  // Reading Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('reading-progress');
      if (progressBar) progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const words = content.trim().split(/\s+/).length || 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4 loadingstory">
        {/* <div className="w-100 h-100 border-4 border-t-[#ff7a18] border-[#1a1a1a] rounded-full animate-spin"></div> */}
        <svg
          viewBox="0 0 24 24"
          width="50"
          height="50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>
            {`
          @keyframes loader8 {
            0% { transform: scale(1) rotateZ(0); }
            50% { transform: scale(1.5) rotateZ(180deg); }
            100% { transform: scale(1) rotateZ(360deg); }
          }
        `}
          </style>

          <g
            style={{
              animation: "loader8 1s cubic-bezier(.72,.08,.38,.87) infinite both",
              transformOrigin: "center",
            }}
          >
            <path
              d="M12.035 8v8M16 12H8"
              stroke="#ff7a18"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="1.635" fill="#ff7a18" />
          </g>
        </svg>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-6">
        <div className="bg-[#111] border border-[#2a2a2a] p-10 rounded-2xl text-center max-w-md shadow-2xl text-[rgb(215, 222, 230)]">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-[#888] mb-8">{error || 'Post not found'}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff7a18] to-[#ff3d00] px-6 py-3 rounded-full font-semibold transition-transform hover:scale-105"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className="blog-detail">
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 details_sec">
            {/* 🔹 Breadcrumb */}
            <div className="breadcrumb">
              <Link href="/">Home</Link> › <Link href="/blog">Blog</Link> › <span>{blog.category}</span> ›
              <span className="active"> {blog.title}</span>
            </div>

            {/* 🔹 Category */}
            <p className="category">{blog.category?.toUpperCase()}</p>

            {/* 🔹 Title */}
            <h1 className="title">
              {blog.title}
            </h1>

            {/* 🔹 Description */}
            <p className="desc">
              {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, '').slice(0, 160) + "..." : "")}
            </p>

            {/* 🔹 Author + Share */}
            <div className="meta">
              <div className="author">
                <img src={Images.favicon.src} alt={blog.author} className='avatar' />
                <b>By {blog.author || "Admin"}</b>
                <span>• {formatDate(blog.date || blog.createdAt)}</span>
                {/* <span>• {estimateReadTime(blog.content)}</span> */}
              </div>

              <div className="share">
                <span>Share:</span>
                <a href="">
                  <i className="fa-brands fa-facebook"></i>

                </a>
                <a href="">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <i className="fa-solid fa-link" onClick={handleCopyLink} title="Copy Link"></i>
              </div>
            </div>

            {/* 🔹 Banner Image */}
            <div className="banner">
              <img src={blog.image} alt={blog.title} />
            </div>

            {/* 🔹 Content */}
            <div className="contents" dangerouslySetInnerHTML={{ __html: blog.content }}>
            </div>

            <div className="cta-wrapper">
              <div className="cta-banner">
                <div className="cta-content">
                  <h3>Ready to scale your business with digital marketing?</h3>
                  <p>
                    Let Nooryak Technologies help you create strategies that deliver
                    measurable results.
                  </p>
                </div>

                <button className="cta-btn">
                  Start a Project <span>→</span>
                </button>
              </div>

              {/* Share Section */}
              <div className="share-section">
                <span>Share this article:</span>

                <div className="icons">
                  <a href='' className="icon fb">f</a>
                  <a href='' className="icon x">x</a>
                  <a href='' className="icon in">in</a>
                  <a href='' className="icon link">🔗</a>
                </div>
              </div>

              {/* Author Card */}
              <div className="author-card">
                <div className="author-left">
                  <div className="logos">
                    <img src={Images.favicon.src} alt="Nooryak" />
                  </div>

                  <div>
                    <h4>Nooryak Team</h4>
                    <p>
                      We are a team of digital experts passionate about helping
                      businesses grow through innovative technology and data-driven
                      strategies.
                    </p>
                  </div>
                </div>

                <button className="view-posts">
                  View all posts →
                </button>
              </div>
            </div>
          </div>
          <div className=" col-lg-4 col-md-12 col-sm-12">
            <BlogSidebar
              search=""
              setSearch={() => { }}
              categories={categories}
              popular={popular}
              activeTab={blog?.category || ""}
              setActiveTab={() => { }}
            />
          </div>
          <div className="col-lg-12 ">
            <FeatureProject blogs={featuredBlogs} />
          </div>
        </div>
      </div>
    </>
  );
}




'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params ? (params as any).slug : null;
  const [blog, setBlog] = useState<Blog | null>(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-t-[#ff7a18] border-[#1a1a1a] rounded-full animate-spin"></div>
        <p className="text-[#888] animate-pulse">Loading story…</p>
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
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 h-1 bg-[#ff7a18] z-[101] transition-all duration-300" style={{ width: '0%' }} id="reading-progress"></div>

      <div className="blog-detail-root pt-150 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              
              {/* Breadcrumb Area */}
              <div className="breadcrumb-area mb-50">
                <div className="flex items-center gap-3 text-sm text-[#888]">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <span>/</span>
                  <span className="text-[#ff7a18] truncate max-w-[300px]">{blog.title}</span>
                </div>
              </div>

              {/* Header Title Section */}
              <header className="blog-detail-header mb-60">
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#111] border border-[#2a2a2a] text-[#ff7a18] text-[11px] font-bold uppercase tracking-widest">
                    {blog.category || "General"}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-white">
                  {blog.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-[13px] text-[#888]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                      <i className="fa-solid fa-user text-[10px] text-[#ff7a18]"></i>
                    </div>
                    <span className="text-white font-medium">{blog.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-calendar-days text-[#ff7a18]"></i>
                    <span>{formatDate(blog.date || blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-[#ff7a18]"></i>
                    <span>{estimateReadTime(blog.content)}</span>
                  </div>
                </div>
              </header>

              {/* Main Illustration Image */}
              <div className="featured-image-wrap mb-80">
                <div className="relative rounded-[30px] overflow-hidden border border-[#2a2a2a] bg-[#111]">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-auto object-cover max-h-[600px]" 
                  />
                </div>
              </div>

              {/* Body Content */}
              <article className="blog-content-body max-w-4xl mx-auto">
                <div 
                  className="blog-prose prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Categories & Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-80 pt-40 border-t border-[#1a1a1a]">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-[#888] font-semibold mr-2">TAGS:</span>
                      {blog.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-4 py-1.5 rounded-lg bg-[#111] border border-[#2a2a2a] text-[#888] text-xs hover:border-[#ff7a18] hover:text-white transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post Footer Actions */}
                <div className="mt-60 p-40 rounded-[30px] bg-[#111] border border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-6">
                  <Link href="/blog" className="flex items-center gap-3 text-white font-semibold hover:text-[#ff7a18] transition-colors group">
                    <div className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center group-hover:border-[#ff7a18]">
                      ←
                    </div>
                    Back to All Stories
                  </Link>

                  <div className="flex items-center gap-5">
                    <span className="text-[11px] font-bold tracking-widest text-[#888]">SHARE</span>
                    <div className="flex gap-3">
                      {['facebook-f', 'twitter', 'linkedin-in'].map((s, i) => (
                        <button 
                          key={i}
                          className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:text-white hover:border-white transition-all"
                        >
                          <i className={`fa-brands fa-${s} text-sm`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .blog-detail-root {
          background-color: #0a0a0a;
          color: white;
        }
        .blog-prose h2, .blog-prose h3 {
          margin-top: 3.5rem;
          margin-bottom: 2rem;
          font-weight: 800;
          color: white;
        }
        .blog-prose p {
          line-height: 1.8;
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #ccc;
        }
        .blog-prose blockquote {
          border-left: 5px solid #ff7a18;
          background: #111;
          padding: 3rem;
          margin: 3.5rem 0;
          border-radius: 0 2rem 2rem 0;
          font-style: italic;
          color: white;
        }
        .blog-prose img {
          border-radius: 20px;
          margin: 3rem 0;
        }
        .blog-prose ul, .blog-prose ol {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
        }
        .blog-prose li {
          margin-bottom: 0.8rem;
          color: #ccc;
        }
        .blog-prose a {
          color: #ff7a18;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

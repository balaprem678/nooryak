"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./blog.scss";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// BlogImage handles both regular URLs and base64 data URLs
function BlogImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const isBase64 = src.startsWith("data:");
  if (isBase64) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    );
  }
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data.blogs || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  /* ── Loading ── */
  if (loading) {
    return (
      <section className="blog-page">
        <div className="blog-status">
          <div className="blog-spinner" />
          <p>Loading posts…</p>
        </div>
      </section>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <section className="blog-page">
        <div className="blog-status">
          <p className="blog-error">⚠️ {error}</p>
        </div>
      </section>
    );
  }

  /* ── Empty ── */
  if (blogs.length === 0) {
    return (
      <section className="blog-page">
        <div className="blog-status">
          <p className="blog-empty">No blog posts yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <section className="blog-page">

      {/* Featured Blog */}
      <Link href={`/blog/${featured.slug}`} className="featured">
        <div className="featured-image">
          <BlogImage
            src={featured.image}
            alt={featured.title}
            width={1000}
            height={500}
          />
        </div>

        <div className="featured-content">
          <span className="category">{featured.category || "General"}</span>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt || featured.content.slice(0, 160) + "…"}</p>

          <div className="meta">
            <span>{formatDate(featured.date || featured.createdAt)}</span>
            <span>{estimateReadTime(featured.content)}</span>
          </div>
        </div>
      </Link>

      {/* Blog Grid */}
      {rest.length > 0 && (
        <div className="blog-grid">
          {rest.map((blog) => (
            <div key={blog._id} className="blog-card">

              <div className="image">
                <BlogImage
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={300}
                />
              </div>

              <div className="content">
                <span className="category">{blog.category || "General"}</span>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt || blog.content.slice(0, 120) + "…"}</p>

                <div className="meta">
                  <span>{formatDate(blog.date || blog.createdAt)}</span>
                  <span>{estimateReadTime(blog.content)}</span>
                </div>

                <Link href={`/blog/${blog.slug}`} className="read-more">
                  Read More →
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}
"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import "./blogmain.scss";
import BlogBanner from "./blog-banner";
import FeatureProject from "./featureproject";
import BlogSidebar from "./blogsidebar";

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
    status?: string;
    isFeatured?: boolean;
    views?: number;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function estimateReadTime(content: string) {
    const words = (content || "").trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("All Articles");
    const [search, setSearch] = useState("");
    const [tabs, setTabs] = useState<string[]>(["All Articles"]);
    const [visibleCount, setVisibleCount] = useState(9);

    // Reset page when tab or search changes
    useEffect(() => {
        setVisibleCount(9);
    }, [activeTab, search]);

    useEffect(() => {
        fetch("/api/admin/blogs")
            .then((res) => res.json())
            .then((data) => {
                const fetchedBlogs = data.blogs || [];
                console.log("DEBUG: Fetched Blogs Data:", fetchedBlogs);
                setBlogs(fetchedBlogs);
                const uniqueCategories = Array.from(new Set(fetchedBlogs.map((b: Blog) => b.category))).filter(Boolean) as string[];
                setTabs(["All Articles", ...uniqueCategories]);
            })
            .catch(err => console.error("Error fetching blogs:", err))
            .finally(() => setLoading(false));
    }, []);

    const publishedBlogs = useMemo(() =>
        blogs.filter(b => !b.status || b.status === "Published"),
        [blogs]);

    const featuredBlogs = useMemo(() =>
        publishedBlogs.filter(b => b.isFeatured === true || String(b.isFeatured) === "true"),
        [publishedBlogs]);

    const regularBlogs = useMemo(() => {
        return publishedBlogs.filter(b => {
            const isNotFeatured = !b.isFeatured || String(b.isFeatured) === "false";
            const matchSearch = (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
                (b.content || "").toLowerCase().includes(search.toLowerCase());
            const matchCategory = activeTab === "All Articles" || b.category === activeTab;
            return isNotFeatured && matchSearch && matchCategory;
        });
    }, [publishedBlogs, search, activeTab]);

    const displayedRegularBlogs = regularBlogs.slice(0, visibleCount);

    /* 📊 Category Count */
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
        return [...blogs]
            .filter((b: Blog) => (b.views || 0) > 1)
            .sort((a: Blog, b: Blog) => (b.views || 0) - (a.views || 0))
            .slice(0, 4);
    }, [publishedBlogs]);

    if (loading) return (
        <div className="blog-page">
            {/* <BlogBanner /> */}
            <p className="loading text-center py-20 text-white">Loading blogs...</p>
        </div>
    );

    return (
        <div className="blog-page">
            <BlogBanner
                search={search}
                setSearch={setSearch}
            />

            <div className="tabs">
                {tabs.map((t, i) => (
                    <button
                        key={i}
                        className={activeTab === t ? "active" : ""}
                        onClick={() => setActiveTab(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>


            <div className="content row">


                <div className="blogs col-xl-8 col-lg-12 col-md-12">
                    {displayedRegularBlogs.length === 0 && <p className="noblogfound">No regular articles found</p>}

                    {displayedRegularBlogs.map((b) => (
                        <div className="card fade-in" key={b._id}>
                            <div className="img">
                                <img src={b.image} alt={b.title} />
                            </div>

                            <div className="card-body">
                                <div className="top d-flex justify-content-between align-items-center">
                                    <span className="tag">{b.category}</span>
                                    <p className="date m-0">
                                        {formatDate(b.date || b.createdAt)}
                                    </p>
                                </div>
                                <h3>{b.title}</h3>
                                <p className="desc">{b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').slice(0, 100) + "..." : "")}</p>
                                <div className="bottom">
                                    <Link href={`/blog/${b.slug}`}>Read More →</Link>
                                    {/* <span>{estimateReadTime(b.content)}</span> */}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>


                <div className="col-xl-4 col-lg-12 col-md-12 sidebar_main">
                    <BlogSidebar
                        search={search}
                        setSearch={setSearch}
                        categories={categories}
                        popular={popular}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                <div className="col-12 load_more_main">
                    {visibleCount < regularBlogs.length && (
                        <div className="load-more-container d-flex justify-content-center w-100 mt-10 pt-10">
                            <button
                                className="header-btn"
                                style={{ border: 'none', cursor: 'pointer' }}
                                onClick={() => setVisibleCount(prev => prev + 6)}
                            >
                                <span className="btn-text">Load More Articles</span>
                            </button>
                        </div>
                    )}
                </div>
                {/* Featured Section */}
                <div className="col-lg-12 featured_main">
                    <FeatureProject blogs={featuredBlogs} />
                </div>
            </div>
        </div>
    );
}
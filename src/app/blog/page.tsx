"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import "./blogmain.scss";
import BlogBanner from "./blog-banner";

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Reset page when tab or search changes
    useEffect(() => {
        setCurrentPage(1);
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

    /* 🔍 Unified Filter Logic */
    const { featuredBlogs, regularBlogs } = useMemo(() => {
        const baseFiltered = blogs.filter((b: Blog) => {
            if (b.status && b.status !== "Published") return false;
            const matchSearch = (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
                (b.content || "").toLowerCase().includes(search.toLowerCase());
            return matchSearch;
        });

        return {
            featuredBlogs: baseFiltered.filter((b: Blog) => b.isFeatured === true || String(b.isFeatured) === "true"),
            regularBlogs: baseFiltered.filter((b: Blog) => {
                const isNotFeatured = !b.isFeatured || String(b.isFeatured) === "false";
                const matchCategory = activeTab === "All Articles" || b.category === activeTab;
                return isNotFeatured && matchCategory;
            })
        };
    }, [blogs, activeTab, search]);

    const totalPages = Math.ceil(regularBlogs.length / itemsPerPage);
    const displayedRegularBlogs = regularBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    /* 💡 Search Suggestions (Top 5 Categories) */
    const suggestions = useMemo(() => {
        return tabs.filter(t => t !== "All Articles").slice(0, 5);
    }, [tabs]);

    /* 📊 Category Count */
    const categoriesMap: Record<string, number> = {};
    blogs.forEach((b: Blog) => {
        if (b.category) {
            categoriesMap[b.category] = (categoriesMap[b.category] || 0) + 1;
        }
    });

    const categories = Object.keys(categoriesMap).map((key) => ({
        name: key,
        count: categoriesMap[key],
    }));

    const popular = useMemo(() => {
        return [...blogs]
            .filter((b: Blog) => (b.views || 0) > 1)
            .sort((a: Blog, b: Blog) => (b.views || 0) - (a.views || 0))
            .slice(0, 4);
    }, [blogs]);

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
                suggestions={suggestions}
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


                <div className="blogs col-lg-8 col-md-12">
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
                                <p className="desc">{b.excerpt || (b.content ? b.content.slice(0, 100) + "..." : "")}</p>
                                <div className="bottom">
                                    <Link href={`/blog/${b.slug}`}>Read More →</Link>
                                    {/* <span>{estimateReadTime(b.content)}</span> */}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>


                <div className="sidebar col-lg-4 col-md-12">
                    <div className="search">
                        <input
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button type="button" onClick={() => setSearch("")} className="search-clear-btn">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div className="popular">
                        <h4>Popular Posts</h4>
                        {popular.map((p) => (
                            <Link href={`/blog/${p.slug}`} className="pop-item" key={p._id}>
                                {p.image && <img src={p.image} alt={p.title} className="thumb" style={{ width: 70, height: 50, objectFit: 'cover' }} />}
                                <div>
                                    <p>{p.title}</p>
                                    <span>{formatDate(p.date || p.createdAt)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="categories">
                        <h4>Categories</h4>
                        {categories.map((c, i) => (
                            <div
                                className={`cat ${activeTab === c.name ? "active" : ""}`}
                                key={i}
                                onClick={() => setActiveTab(c.name)}
                            >
                                <span>{c.name}</span>
                                <span className="count">{c.count}</span>
                            </div>
                        ))}
                    </div>

                    <div className="subscribe">
                        <h4>Stay Ahead with Our Insights</h4>
                        <p>Subscribe to get the latest articles.</p>
                        <input placeholder="Enter your email" />
                        <button>Subscribe →</button>
                    </div>
                </div>

                <div className="col-12">
                    {totalPages > 1 && (
                        <div className="pagination-container d-flex justify-content-center w-100 mt-5">
                            <button 
                                className={`page-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                // Simple logic to show a few pages around current page
                                if (
                                    page === 1 || 
                                    page === totalPages || 
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={page}
                                            className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    );
                                } else if (
                                    page === currentPage - 2 || 
                                    page === currentPage + 2
                                ) {
                                    return <span key={page} className="pagination-dots">...</span>;
                                }
                                return null;
                            })}

                            <button 
                                className={`page-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Featured Section */}
                <div className="col-lg-12 featured_section">
                    <div className="row">
                        {featuredBlogs.length > 0 && (
                            <div className="featured_projects mb-10 w-full ">
                                <div className="section-title-wrap mb-6">
                                    <h3 className="section-title text-2xl font-bold">Featured Projects</h3>
                                    <div className="title-line w-20 h-1 bg-[#ff7a18] mt-1"></div>
                                </div>

                                <div className="featured_projects_child row ">
                                    {featuredBlogs.map((b) => (
                                        <div className="col-md-3 col-sm-12" key={b._id}>
                                            <div className="card">
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
                                                    <p className="desc">{b.excerpt || (b.content ? b.content.slice(0, 100) + "..." : "")}</p>
                                                    <div className="bottom">
                                                        <Link href={`/blog/${b.slug}`}>Read More →</Link>
                                                        {/* <span>{estimateReadTime(b.content)}</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
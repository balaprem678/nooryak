"use client";
import { useEffect, useState } from "react";
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

    /* 🔍 Filter Logic */
    const filteredBlogs = blogs.filter((b) => {
        if (b.status && b.status !== "Published") return false;
        const matchCategory = activeTab === "All Articles" || b.category === activeTab;
        const matchSearch = (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (b.content || "").toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const featuredBlogs = filteredBlogs.filter(b => b.isFeatured === true || String(b.isFeatured) === "true");
    const regularBlogs = filteredBlogs.filter(b => !b.isFeatured || String(b.isFeatured) === "false");

    /* 📊 Category Count */
    const categoriesMap: Record<string, number> = {};
    blogs.forEach((b) => {
        if (b.category) {
            categoriesMap[b.category] = (categoriesMap[b.category] || 0) + 1;
        }
    });

    const categories = Object.keys(categoriesMap).map((key) => ({
        name: key,
        count: categoriesMap[key],
    }));

    const popular = blogs.slice(0, 4);

    if (loading) return (
        <div className="blog-page">
            {/* <BlogBanner /> */}
            <p className="loading text-center py-20 text-white">Loading blogs...</p>
        </div>
    );

    return (
        <div className="blog-page">
            <BlogBanner search={search} setSearch={setSearch} />

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
                    {regularBlogs.length === 0 && <p className="noblogfound">No regular articles found</p>}

                    {regularBlogs.map((b) => (
                        <div className="card" key={b._id}>
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
                                        <div className="col-md-3 col-sm-12">
                                            <div className="card" key={b._id}>
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
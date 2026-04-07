// BlogPage.jsx
'use client';
import { useState } from "react";
import "./blogmain.scss";
import { Images } from "@/utils/Images";

const BlogPage = () => {
    const tabs = [
        "All Articles",
        "Digital Marketing",
        "Web Development",
        "UI/UX Design",
        "Business Strategy",
        "SEO",
        "Technology",
        "Growth",
    ];

    const [activeTab, setActiveTab] = useState("All Articles");

    const blogs = [
        { category: "Digital Marketing" },
        { category: "Web Development" },
        { category: "UI/UX Design" },
        { category: "Business Strategy" },
        { category: "SEO" },
        { category: "Technology" },
        { category: "Growth" },
        { category: "Digital Marketing" },
        { category: "SEO" },
    ].map((item) => ({
        ...item,
        title: "Blog Title Goes Here",
        date: "May 20, 2024",
        desc: "Short description of the blog content goes here for preview.",
        read: "5 min read",
    }));

    const filteredBlogs =
        activeTab === "All Articles"
            ? blogs
            : blogs.filter((b) => b.category === activeTab);

    const popular = Array(4).fill({
        title: "Popular Blog Title",
        date: "May 20, 2024",
    });

    const categories = [
        { name: "Digital Marketing", count: 12 },
        { name: "Web Development", count: 10 },
        { name: "UI/UX Design", count: 8 },
        { name: "Business Strategy", count: 7 },
        { name: "SEO", count: 6 },
        { name: "Technology", count: 9 },
        { name: "Growth", count: 5 },
    ];

    return (
        <div className="blog-page">

            {/* HERO */}
            <section className="hero">
                <div className="container">

                    <div className="row">
                        <div className="hero-left col-md-6">
                            <p className="subtitle">INSIGHTS & IDEAS</p>
                            <h1>Our <span>Blog</span></h1>
                            <p className="desc">
                                Stay updated with the latest trends in digital marketing, web <br /> development, technology.
                            </p>

                            <div className="search-box">
                                <input placeholder="Search articles, topics..." />
                                <button><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>

                            <div className="trusted">
                                <div className="avatars">
                                    <span></span><span></span><span></span><span></span>
                                </div>
                                <p>Trusted by 500+ readers every week</p>
                            </div>
                        </div>

                        <div className="hero-right col-md-6">
                            <img src={Images.blog_banner.src} alt="blog_banner" />
                        </div>
                    </div>
                </div>

            </section>

            {/* TABS */}
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

            {/* CONTENT */}
            <div className="content">

                {/* BLOG GRID */}
                <div className="blogs">
                    {filteredBlogs.map((b, i) => (
                        <div className="card" key={i}>
                            <div className="img"></div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="tag">{b.category}</span>
                                    <p className="date m-0">{b.date}</p>
                                </div>
                                <h3>{b.title}</h3>
                                <p className="desc">{b.desc}</p>
                                <div className="bottom">
                                    <span>Read More →</span>
                                    {/* <span>{b.read}</span> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SIDEBAR */}
                <div className="sidebar">

                    <div className="search">
                        <input placeholder="Search blogs..." />
                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div className="popular">
                        <h4>Popular Posts</h4>
                        {popular.map((p, i) => (
                            <div className="pop-item" key={i}>
                              <img src={Images.blog_banner.src} alt="" className="thumb" />
                                <div>
                                    <p>{p.title}</p>
                                    <span>{p.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="categories">
                        <h4>Categories</h4>
                        {categories.map((c, i) => (
                            <div className="cat" key={i}>
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
            </div>
        </div>
    );
};

export default BlogPage;


/* ================= SCSS ================= */
"use client";
import { useMemo } from "react";
import Link from "next/link";
import "./blogmain.scss";

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

interface BlogSidebarProps {
    search: string;
    setSearch: (value: string) => void;
    categories: { name: string; count: number }[];
    popular: Blog[];
    activeTab: string;
    setActiveTab: (value: string) => void;
}

export default function BlogSidebar({
    search,
    setSearch,
    categories,
    popular,
    activeTab,
    setActiveTab
}: BlogSidebarProps) {
    return (
        <div>
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
    );
}
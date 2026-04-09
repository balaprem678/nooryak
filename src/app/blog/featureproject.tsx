"use client";
import Link from "next/link";
import "./blogmain.scss";

interface Blog {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    slug: string;
    date: string;
    createdAt: string;
    isFeatured?: boolean;
    status?: string;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

interface FeatureProjectProps {
    blogs: Blog[];
}

export default function FeatureProject({ blogs }: FeatureProjectProps) {
    if (blogs.length === 0) return null;

    return (
        <div className="row">
            <div className="featured_projects mb-10 w-full">
                <div className="section-title-wrap mb-6">
                    <h3 className="section-title text-2xl font-bold">
                        Featured Projects
                    </h3>
                    <div className="title-line w-20 h-1 bg-[#ff7a18] mt-1"></div>
                </div>

                <div className="featured_projects_child row">
                    {blogs.map((b) => (
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

                                    <p className="desc">
                                        {b.excerpt ||
                                            (b.content
                                                ? b.content.slice(0, 100) + "..."
                                                : "")}
                                    </p>

                                    <div className="bottom">
                                        <Link href={`/blog/${b.slug}`}>
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
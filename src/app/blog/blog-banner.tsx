import "./blogmain.scss";
import { Images } from "@/utils/Images";

interface BlogBannerProps {
    search: string;
    setSearch: (value: string) => void;
    suggestions: string[];
}

export default function BlogBanner({ search, setSearch, suggestions }: BlogBannerProps) {
    return (
        <section className="blog_hero">
            <div className="container">

                <div className="row">
                    <div className="hero-left col-md-6">
                        <p className="subtitle">INSIGHTS & IDEAS</p>
                        <h1>Our <span>Blog</span></h1>
                        <p className="desc">
                            Stay updated with the latest trends in digital marketing, web <br /> development, technology.
                        </p>

                        <div className="search-box">
                            <input placeholder="Search articles, topics..." value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            {search && (
                                <button type="button" onClick={() => setSearch("")} className="search-clear-btn">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            )}
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        {suggestions.length > 0 && (
                            <div className="search-suggestions">
                                <span>Suggested: </span>
                                {suggestions.map((tag, idx) => (
                                    <button 
                                        key={idx} 
                                        className="suggestion-tag"
                                        onClick={() => setSearch(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="trusted">
                            <div className="avatars">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <p>Trusted by 500+ readers every week</p>
                        </div>
                    </div>

                    <div className="hero-right col-md-6 flex justify-center items-center relative">
                        <img src={Images.blog_banner.src} alt="blog_banner" className="main-img" />
                        
                        {/* Decorative bubbles to match the design */}
                        {suggestions.slice(0, 3).map((s, i) => (
                             <div key={i} className={`floating-tag tag-${i}`}>
                                {i === 0 && <i className="fa-solid fa-chart-line"></i>}
                                {i === 1 && <i className="fa-solid fa-code"></i>}
                                {i === 2 && <i className="fa-solid fa-lightbulb"></i>}
                                {s}
                             </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

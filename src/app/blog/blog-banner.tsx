import "./blogmain.scss";
import { Images } from "@/utils/Images";

interface BlogBannerProps {
    search: string;
    setSearch: (value: string) => void;
}

export default function BlogBanner({ search, setSearch }: BlogBannerProps) {
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
                        <div className="trusted">
                            <div className="avatars">
                                <span></span><span></span><span></span><span></span>
                            </div>
                            <p>Trusted by 500+ readers every week</p>
                        </div>
                    </div>

                    <div className="hero-right col-md-6 flex justify-center items-center relative">
                        <img src={Images.blog_banner.src} alt="blog_banner" className="main-img" />

                    </div>
                </div>
            </div>

        </section>
    );
};

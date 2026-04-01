
"use client";
import "./HomeMainAbout.scss"
import { useRef } from "react";
import { Images } from "@/utils/Images";

export default function HomeMainAbout() {
    const ref = useRef(null);

    return (
        <section className="about">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-left">
                        <div className="image-box">
                            <img src={Images.abt_sec.src} alt="about" />
                            <div className="projectCard" ref={ref}>
                                <div className="icon">
                                    🚀
                                </div>

                                <div className="text">
                                    {/* <h3>{count}+</h3> */}
                                    <h3>125+</h3>
                                    <p>Projects Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="about-right">
                        <div className="aboutTag">
                            <span className="about1">ABOUT</span>
                            <span className="brand">NOORYAK TECHNOLOGIES</span>
                            <span className="underline"></span>
                        </div>
                        <h2>
                            Building Brands That <br />
                            Scale Digitally.
                        </h2>

                        <p className="desc">
                            We help businesses grow through performance-driven marketing,
                            modern web solutions, and strategic brand positioning. Our focus
                            is simple—deliver measurable results and long-term digital success.
                        </p>

                        <ul className="features">
                            <li>✔ Performance Marketing</li>
                            <li>✔ Smart Targeting Strategy</li>
                            <li>✔ Scalable Web Development</li>
                            <li>✔ Data-Driven Growth</li>
                        </ul>

                        <div className="bottom">
                            <button className="cta">
                                Explore Our Work →
                            </button>

                            <div
                                className="dgm-about-review-wrap"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <div
                                    className="dgm-about-review-box d-inline-flex align-items-center"
                                    style={{ display: "flex", alignItems: "center", }}
                                >

                                    <div className="dgm-about-review">
                                        <div className="dgm-about-review_child">
                                            <h4 style={{ margin: 0 }}>5</h4>
                                            <div>
                                                <p className="google_ratings">Top Ratings in Google</p>
                                                <p className="rating_star">✮✮✮✮✮</p>
                                            </div>
                                        </div>
                                        <span style={{ color: "#777" }}>
                                            ( 60 Reviews )
                                        </span>
                                    </div>

                                    <div className="dgm-about-ratting">
                                        <h4 style={{ marginBottom: "5px" }}>
                                            Top Ratings in Trustpilot
                                        </h4>
                                        <div className="trustpilotratings">
                                            <img src={Images.trustpilot.src} alt="trustpilot" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


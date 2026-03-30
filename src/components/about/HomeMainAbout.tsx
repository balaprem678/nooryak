
"use client";
import "./HomeMainAbout.scss"
import { useEffect, useRef, useState } from "react";
import { Images } from "@/utils/Images";

export default function HomeMainAbout() {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    startCounting();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    const startCounting = () => {
        let start = 0;
        const end = 125;
        const duration = 1500;
        const incrementTime = 20;

        const step = Math.ceil(end / (duration / incrementTime));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(start);
        }, incrementTime);
    };

    return (
        <section className="about">
            <div className="container">
                <div className="about-wrapper">

                    {/* LEFT IMAGE */}
                    <div className="about-left">
                        <div className="image-box">
                            <img src={Images.abt_sec.src} alt="about" />
                            <div className="projectCard" ref={ref}>
                                <div className="icon">
                                    🚀
                                </div>

                                <div className="text">
                                    <h3>{count}+</h3>
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

                            {/* bottom gradient line */}
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
                                    style={{ display: "flex", alignItems: "center", gap: "20px" }}
                                >

                                    <div className="dgm-about-review">
                                        <h4 style={{ margin: 0 }}>5 <small className="rating_star">✮✮✮✮✮</small></h4>
                                        <span style={{ color: "#777" }}>
                                            ( 60 Reviews )
                                        </span>
                                    </div>

                                    <div className="dgm-about-ratting">
                                        <h4 style={{ marginBottom: "5px" }}>
                                            Top Ratings in Google 
                                        </h4>
                                        <img src={Images.trustpilot.src} alt="" />

                                        {/* <div
                                            className="dgm-about-ratting-icon"
                                            style={{ display: "flex", gap: "5px", color: "#ffb400" }}
                                        >
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div> */}
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
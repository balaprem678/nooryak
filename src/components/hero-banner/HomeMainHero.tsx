"use client";

import { useEffect, useState } from "react";
import "./HomeMainHero.scss";
import { Images } from "@/utils/Images";
// import Bganimation from "../bganimation/Bganimation";

/* ── TEXTS ── */
const texts = [
    "Digital Marketing & Web Development Company",
    "Ecommerce Development and Sales",
    "Web & App Development",
    "Product Design & Branding",
    "Social Media Marketing",
];

/* ── SOCIAL ICONS ── */
const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
);

const DribbbleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
    </svg>
);

export default function HomeMainHero() {
    /* ── TYPING EFFECT ── */
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = texts[textIndex];
        let timeout;

        if (charIndex < currentText.length) {
            timeout = setTimeout(() => {
                setDisplayText(currentText.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 70);
        } else {
            // Pause after full typing (10s), then move to next text
            timeout = setTimeout(() => {
                setTextIndex((textIndex + 1) % texts.length);
                setCharIndex(0);
                setDisplayText("");
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, textIndex]);


    return (

        <section className="hero" style={{ position: "relative", overflow: "hidden" }}>

            {/* 🔥 MAIN CONTENT */}
            <div className="main" style={{ position: "relative", zIndex: 2 }}>

                {/* LEFT */}
                <div className="left">
                    <div className="socialBar">
                        <span className="followLabel">Follow</span>
                        <FacebookIcon />
                        <XIcon />
                        <InstagramIcon />
                    </div>

                    <div className="mb_res">
                        <div className="mb_res_top">
                            <p className="tagline"><span className="dotIndicator"></span> AI Powered Digital Agency</p>

                            <h1 className="heading" style={{ fontWeight: "700", height: "117px" }}>
                                {displayText}
                                <span style={{ borderRight: "3px solid #ff5722", marginLeft: "5px" }} />
                            </h1>
                        </div>

                        <div className="stats">
                            <div className="stat">
                                <button className="ctaBtn">
                                    Hire Professional <span className="arrow">↗</span>
                                </button>
                                <div className="number">98%</div>
                                <div className="label">Clients Satisfied <br /> and Repeating</div>
                            </div>

                            <div className="stat">
                                <button className="ctaBtn">
                                    Start a Project <span className="arrow">↗</span>
                                </button>
                                <div className="number">138+</div>
                                <div className="label">Projects Completed in <br /> 5 Countries</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — desktop: panel image | tablet+mobile: full bg image */}
                <div className="right">
                    <div className="imageWrap">
                        <img src={Images.herobanner.src} alt="Hero" className="herobanner_1"/>
                        {/* <img src={Images.herobanner_person.src} alt="Hero" className="herobanner_3"/> */}
                        {/* <img src={Images.herobanner1.src} alt="Hero" className="herobanner_2"/> */}
                    </div>

                    <div className="floatingCard">
                        <p>
                            Results - <br />
                            Driven Digital <br />
                            Marketing - <br />
                            Scale Your <br />
                            Brand Online
                        </p>
                    </div>

                    <div className="awardLabel">Award Winning Agency</div>
                </div>
            </div>
        </section>
    );
}

"use client";
import Image from "next/image";
import { useRef } from "react";
import "./craftingwebsite.scss";
import { Images } from "@/utils/Images";
export default function CraftingWebsite() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Industries data
  const industries = [
    { name: "BUSINESS CONSULTING", icon: "/icons/business.png" },
    { name: "MEDICAL HEALTHCARE", icon: "/icons/healthcare.png" },
    { name: "BANK / INSURANCES", icon: "/icons/bank.png" },
    { name: "SAAS / SOFTWARE", icon: "/icons/saas.png" },
    { name: "MEDIA ENTERTAINMENT", icon: "/icons/media.png" },
    { name: "WEBSITE DESIGN", icon: "/icons/web-design.png" },
  ];

  return (
    <section className="design-showcase">
      <div className="ds-container">
        {/* LEFT IMAGE */}
        <div className="ds-left">
          <div className="ds-img-wrap">
            <img
              src={Images.craftingwebsite_banner.src}
              alt="Team working"
              className="ds-img"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="ds-right">
          <div className="ds-tag">
            <span><i className="fa-solid fa-face-smile"></i> DRIVEN BY CREATIVITY</span>
          </div>

          <h1 className="ds-title">
            Crafting Websites <span className="highlight">with
              <br />
              Purpose and Passion</span>
          </h1>

          <p className="ds-desc">
            We are a team of designers, developers, and strategists dedicated to transforming ideas into powerful digital experiences. From modern web applications to scalable platforms, we build solutions that drive real business growth.
          </p>

          {/* Progress Bars */}
          <div className="ds-progress">
            <div className="ds-item">
              <div className="ds-label">
                <span>UI/UX & Product Design</span>
                <span>98%</span>
              </div>
              <div className="ds-bar">
                <div className="ds-fill" style={{ width: "98%" }}></div>
              </div>
            </div>

            <div className="ds-item">
              <div className="ds-label">
                <span>Modern Web Development (React, Wordpress, Full Stack)</span>
                <span>99%</span>
              </div>
              <div className="ds-bar">
                <div className="ds-fill" style={{ width: "99%" }}></div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="gra_btn"
            onClick={() => window.open("https://wa.me/916374913298?text=Hello%20Nooryak%20Tech%2C%20I%20would%20like%20to%20discuss%20about%20your%20Digital%20Services", "_blank")}
          >
            Schedule a Consultation →
          </button>
        </div>
      </div>

      {/* INDUSTRIES INFINITE SLIDER */}
      <div className="ds-industries">
        <div className="industries-header">
          <span>INDUSTRIES WE SERVE</span>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee">
            {[...industries, ...industries].map((industry, i) => (   // Duplicate for seamless loop
              <div key={i} className="ds-chip">
                <img
                  src={Images.abt_sec.src}
                  alt={industry.name}
                  width={28}
                  height={28}
                  className="chip-icon"
                />
                {/* <Image
                  src={industry.icon}
                  alt={industry.name}
                  width={28}
                  height={28}
                  className="chip-icon"
                /> */}
                {industry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
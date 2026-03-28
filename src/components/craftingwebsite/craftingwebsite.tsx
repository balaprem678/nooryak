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
            <span>DRIVEN BY CREATIVITY</span>
          </div>

          <h1 className="ds-title">
            Crafting Websites <span className="highlight">with</span>
            <br />
            Purpose and Passion
          </h1>

          <p className="ds-desc">
            Our team of designers, developers, and strategists are passionate
            about bringing your brand’s vision to life through innovative user experiences.
          </p>

          {/* Progress Bars */}
          <div className="ds-progress">
            <div className="ds-item">
              <div className="ds-label">
                <span>User Interface Designer</span>
                <span>98%</span>
              </div>
              <div className="ds-bar">
                <div className="ds-fill" style={{ width: "98%" }}></div>
              </div>
            </div>

            <div className="ds-item">
              <div className="ds-label">
                <span>WordPress Developer</span>
                <span>99%</span>
              </div>
              <div className="ds-bar">
                <div className="ds-fill" style={{ width: "99%" }}></div>
              </div>
            </div>
          </div>

          <button className="gra_btn">
            SCHEDULE A CONSULTATION →
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
              <div key={i} className="ds-chip gra_btn">
                <Image
                  src={industry.icon}
                  alt={industry.name}
                  width={28}
                  height={28}
                  className="chip-icon"
                />
                {industry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';
import React from "react";
import { useParams } from "next/navigation";
import "../submenu.scss";
import { WebDevelopmentHeroData } from "./herobanner/webdevelopment";
import { AppDevelopmentHeroData } from "./herobanner/appdevelopment";

const heroDataMap = {
    web: WebDevelopmentHeroData,
    app: AppDevelopmentHeroData,
} as const;

const slugToKey = {
    "web-development": "web",
    "app-development": "app",
} as const;

type HeroKey = keyof typeof heroDataMap;
type ServiceSlug = keyof typeof slugToKey;

export default function ServicesHeroBanner() {
    const params = useParams();
    const type = params?.type;
    const slug = Array.isArray(type) ? type[0] : type;
    const key: HeroKey =
        slug && slug in slugToKey ? slugToKey[slug as ServiceSlug] : "web";

    const data = heroDataMap[key];

    return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="hero__content">
                            <p className="hero__label">{data.label}</p>

                            <h1 className="hero__title">
                                {data.title.line1}
                                <br />
                                {data.title.line2}{" "}
                                <span className="hero__title--accent">
                                    {data.title.highlight}
                                </span>
                            </h1>

                            <p className="hero__description">
                                {data.description}
                            </p>

                            <div className="hero__actions">
                                {data.buttons.map((btn, i) => (
                                    <a
                                        key={i}
                                        href={btn.link}
                                        className={`hero__btn ${btn.type === "primary"
                                            ? "gra_btn hero__btn--primary"
                                            : "hero__btn--secondary"
                                            }`}
                                    >
                                        {btn.text} &nbsp;→
                                    </a>
                                ))}
                            </div>

                            <div className="hero__features">
                                {data.features.map((item, i) => (
                                    <div key={i} className="hero__feature">
                                        <span className="hero__feature-icon">
                                            {item.icon}
                                        </span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-6">
                        <div className="hero__visual">
                            <img src={data.image.src} alt="hero" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

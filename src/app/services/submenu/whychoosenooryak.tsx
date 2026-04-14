'use client'
import "../submenu.scss"
import { useParams } from "next/navigation";
import Image from "next/image";
import { whyChooseDataWeb } from "./herobanner/webdevelopment";
import { whyChooseDataApp } from "./herobanner/appdevelopment";

const whyChooseDataMap = {
    web: whyChooseDataWeb,
    app: whyChooseDataApp,
};

const slugToKey = {
    'web-development': 'web',
    'app-development': 'app',
};

export default function WhyChooseNooryak() {
    const { type } = useParams() as { type: string };
    const key = slugToKey[type as keyof typeof slugToKey] || 'web';
    const data = whyChooseDataMap[key as keyof typeof whyChooseDataMap] || whyChooseDataMap.web;

    return (
        <section className="whychoose tac">
            <div className="container">
                <p className="tag">{data.heading}</p>

                <h2 className="title">{data.title}</h2>

                <p className="subtitle">{data.subtitle}</p>

                <div className="cards">
                    {data.items.map((item, index) => (
                        <div className="card" key={index}>
                            <Image src={item.icon} alt="" className="icon" width={50} height={50} />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};




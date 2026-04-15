// 'use client'
// import "../submenu.scss"
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { whyChooseDataWeb } from "./herobanner/webdevelopment";
// import { whyChooseDataApp } from "./herobanner/appdevelopment";

// const whyChooseDataMap = {
//     web: whyChooseDataWeb,
//     app: whyChooseDataApp,
// };

// const slugToKey = {
//     'web-development': 'web',
//     'app-development': 'app',
// };

// export default function WhyChooseNooryak() {
//     const { type } = useParams() as { type: string };
//     const key = slugToKey[type as keyof typeof slugToKey] || 'web';
//     const data = whyChooseDataMap[key as keyof typeof whyChooseDataMap] || whyChooseDataMap.web;

//     return (
//         <section className="whychoose tac">
//             <div className="container">
//                 <p className="tag">{data.heading}</p>

//                 <h2 className="title">{data.title}</h2>

//                 <p className="subtitle">{data.subtitle}</p>

//                 <div className="cards">
//                     {data.items.map((item, index) => (
//                         <div className="card" key={index}>
//                             <Image src={item.icon} alt="" className="icon" width={50} height={50} />
//                             <p>{item.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// 'use client'
// import "../submenu.scss"
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { whyChooseDataWeb } from "./herobanner/webdevelopment";
// import { whyChooseDataApp } from "./herobanner/appdevelopment";

// const whyChooseDataMap = {
//     web: whyChooseDataWeb,
//     app: whyChooseDataApp,
// };

// const slugToKey = {
//     'web-development': 'web',
//     'app-development': 'app',
// };

// export default function WhyChooseNooryak() {
//     const { type } = useParams() as { type: string };
//     const key = slugToKey[type as keyof typeof slugToKey] || 'web';
//     const data = whyChooseDataMap[key as keyof typeof whyChooseDataMap] || whyChooseDataMap.web;

//     return (
//         <section className="attraction-canvas">
//             <div className="container">
//                 <div className="content-stack">
//                     <h2 className="title-reveal">
//                         <span className="stroke-text">{data.heading}</span>
//                         {data.title}
//                     </h2>
//                     <p className="description">{data.subtitle}</p>
//                 </div>

//                 <div className="interactive-grid">
//                     {data.items.map((item, index) => (
//                         <div className="attraction-box" key={index}>
//                             <div className="visual-indicator">
//                                 <div className="dot"></div>
//                                 <div className="line"></div>
//                             </div>
//                             <div className="icon-main">
//                                 <Image src={item.icon} alt="" width={48} height={48} />
//                             </div>
//                             <div className="text-content">
//                                 <h4>{item.title || `Capability 0${index + 1}`}</h4>
//                                 <p>{item.description}</p>
//                             </div>
//                             {/* Visual flare for background */}
//                             <div className="card-flare"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };






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
        <section className="ultimate-stage">
            <div className="container">
                <div className="layout-grid">
                    {/* Left Side: Sticky Brand Messaging */}
                    <div className="sticky-box">
                        <span className="overline">{data.heading}</span>
                        <h2 className="glitch-title" data-text={data.title}>{data.title}</h2>
                        <p className="description">{data.subtitle}</p>
                        <div className="visual-line"></div>
                    </div>

                    {/* Right Side: High-Engagement Features */}
                    <div className="feature-stack">
                        {data.items.map((item, index) => (
                            <div className="feature-item" key={index}>
                                <div className="item-number">0{index + 1}</div>
                                <div className="item-content">
                                    <div className="icon-box">
                                        <Image src={item.icon} alt="" width={32} height={32} />
                                    </div>
                                    <div className="text-box">
                                        <h3>{item.title || "Elite Standard"}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="hover-background"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// 'use client'
// import "../submenu.scss"
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import { whyChooseDataWeb } from "./herobanner/webdevelopment";
// import { whyChooseDataApp } from "./herobanner/appdevelopment";

// const whyChooseDataMap = {
//     web: whyChooseDataWeb,
//     app: whyChooseDataApp,
// };

// const slugToKey = {
//     'web-development': 'web',
//     'app-development': 'app',
// };

// export default function WhyChooseNooryak() {
//     const { type } = useParams() as { type: string };
//     const key = slugToKey[type as keyof typeof slugToKey] || 'web';
//     const data = whyChooseDataMap[key as keyof typeof whyChooseDataMap] || whyChooseDataMap.web;

//     return (
//         <section className="cinematic-reveal">
//             <div className="container">
//                 <div className="reveal-split">
//                     {/* Left: Sticky Branding */}
//                     <div className="sticky-branding">
//                         <div className="label-pill">{data.heading}</div>
//                         <h2 className="massive-title">{data.title}</h2>
//                         <div className="visual-anchor">
//                             <div className="line-grow"></div>
//                         </div>
//                     </div>

//                     {/* Right: Interactive Rows */}
//                     <div className="feature-rows">
//                         {data.items.map((item, index) => (
//                             <div className="reveal-row" key={index}>
//                                 <div className="row-header">
//                                     <span className="row-num">0{index + 1}</span>
//                                     <div className="icon-platform">
//                                         <Image src={item.icon} alt="" width={30} height={30} />
//                                     </div>
//                                     <h3>{item.title || "Innovation"}</h3>
//                                 </div>
//                                 <div className="row-body">
//                                     <p>{item.description}</p>
//                                 </div>
//                                 <div className="row-glow"></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
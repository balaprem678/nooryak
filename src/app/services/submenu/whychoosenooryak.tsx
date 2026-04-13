import "../submenu.scss"
import { Images } from "@/utils/Images";
export const whyChooseData = {
    heading: "WHY CHOOSE NOORYAK",
    title: "We Build More Than Websites — We Build Success",
    subtitle:
        "Our solutions are designed to engage your audience, streamline your operations, and fuel your business growth.",
    items: [
        {
            icon: Images.dashboard,
            title: "Customized Solutions",
            description:
                "Every project is tailored to your unique business goals.",
        },
        {
            icon: Images.setting,
            title: "Performance Focused",
            description:
                "We build fast, secure, and high-performing websites.",
        },
        {
            icon: Images.optimization,
            title: "SEO Optimized",
            description:
                "Our websites are built to rank higher and get more traffic.",
        },
        {
            icon: Images.support,
            title: "Reliable Support",
            description:
                "We're here for you — before, during, and after the project.",
        },
    ],
};


export default function WhyChooseNooryak() {
    return (
        <section className="whychoose tac">
            <div className="container">
                <p className="tag">{whyChooseData.heading}</p>

                <h2 className="title">{whyChooseData.title}</h2>

                <p className="subtitle">{whyChooseData.subtitle}</p>

                <div className="cards">
                    {whyChooseData.items.map((item, index) => (
                        <div className="card" key={index}>
                            <img src={item.icon.src} alt="" className="icon"/>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};




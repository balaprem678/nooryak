import React from 'react';
import './whychoose.scss';
import { Images } from "@/utils/Images";
export default function WhyChoose() {
  const features = [
    {
      title: "Proven Expertise & Innovation",
      desc: "Skilled professionals delivering cutting edge solutions.",
      images: Images.why_choose_card_icon_1,
      variant: "orange"
    },
    {
      title: "Customized & Scalable Solutions",
      desc: "Tailored services to meet your business needs.",
      images: Images.why_choose_card_icon_2,
      variant: "white"
    },
    {
      title: "Seamless Integration & Support",
      desc: "Smooth digital transformation journey.",
      images: Images.why_choose_card_icon_3,
      variant: "white"
    },
    {
      title: "Quality & Excellence",
      desc: "High-quality results that exceed expectations.",
      images: Images.why_choose_card_icon_4,
      variant: "orange"
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="background-waves"></div>

      <div className="container">
        <header className="section-header">
          <h2 className="main-title">
            Why Choose <span>Nooryak <br /> Technologies?</span>
          </h2>
        </header>

        <div className="cards-grid">
          {features.map((f, index) => (
            <div key={index} className={`feature-card ${f.variant}`}>
              <div className="icon-wrapper">
                <img src={f.images.src} alt={f.title} />
              </div>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='df_c'>
          <button className='gra_btn'>Start a Project <i className="fa-solid fa-arrow-trend-down"></i></button>
          <button className='gra_btn'>Check Our Portfolio <i className="fa-solid fa-arrow-trend-up"></i></button>
        </div>
      </div>
    </section>
  );
};

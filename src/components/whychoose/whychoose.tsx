import React from 'react';
import './whychoose.scss';

export default function WhyChoose () {
  const features = [
    {
      title: "Proven Expertise & Innovation",
      desc: "Skilled professionals delivering cutting edge solutions.",
      icon: "🌐", // Replace with actual SVG or FontAwesome
      variant: "orange"
    },
    {
      title: "Customized & Scalable Solutions",
      desc: "Tailored services to meet your business needs.",
      icon: "⚙️",
      variant: "white"
    },
    {
      title: "Seamless Integration & Support",
      desc: "Smooth digital transformation journey.",
      icon: "🛡️",
      variant: "white"
    },
    {
      title: "Quality & Excellence",
      desc: "High-quality results that exceed expectations.",
      icon: "💬",
      variant: "orange"
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="background-waves"></div>

      <div className="container">
        <header className="section-header">
          <p className="sub-title">WHY CHOOSE US</p>
          <h2 className="main-title">
            Why Choose <span>Nooryak Technologies?</span>
          </h2>
        </header>

        <div className="cards-grid">
          {features.map((f, index) => (
            <div key={index} className={`feature-card ${f.variant}`}>
              <div className="icon-wrapper">
                <span className="icon">{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

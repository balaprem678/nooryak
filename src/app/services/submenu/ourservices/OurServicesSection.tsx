// ServicesSection.tsx
import React from "react";
import Link from "next/link";
import { servicesData, sectionMeta } from "./OurServicesData";
import { Images } from "@/utils/Images";

// ── Icon renderer ──────────────────────────────────────────────────────────
interface ServiceIconProps {
  type: string;
  color: string;
}

const ServiceIcon = ({ type, color }: ServiceIconProps) => {
  const icons: Record<string, React.ReactNode> = {
    code: (
      <img src={Images.programming.src} alt="" />
    ),
    globe: (
      <img src={Images.websitedevelopment.src} alt="" />
    ),
    wordpress: (
      <img src={Images.wordpress.src} alt="" />
    ),
    cart: (
      <img src={Images.shoppingcart.src} alt="" />
    ),
    shopify: (
      <img src={Images.shopify.src} alt="" />
    ),
    woo: (
      <img src={Images.wordpress.src} alt="" />
    ),
    php: (
      <img src={Images.php.src} alt="" />
    ),
    react: (
      <img src={Images.react.src} alt="" />
    ),
    bag: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    puzzle: (
      <img src={Images.customwebsite.src} alt="" />
    ),
    pen: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  };

  return icons[type] || icons["code"];
};

// ── ServiceCard ────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon, iconColor, title, description, link }: ServiceCardProps) => (
  <div className="service-card">
    <div className="service-card__icon-wrap" >
      <ServiceIcon type={icon} color={iconColor} />
    </div>
    <h3 className="service-card__title">{title}</h3>
    <p className="service-card__description">{description}</p>
    <Link href={link} className="service-card__link">
      Learn More &nbsp;→
    </Link>
  </div>
);

// ── ServicesSection (page) ─────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section__header">
          <p className="services-section__label">
            <span className="services-section__label-line" />
            {sectionMeta.label}
            <span className="services-section__label-line" />
          </p>
          <h2 className="services-section__heading">{sectionMeta.heading}</h2>
          <p className="services-section__subheading">{sectionMeta.subheading}</p>
        </div>

        <div className="services-section__grid">
          {servicesData.map((s: any) => (
            <ServiceCard
              key={s.id}
              icon={s.icon}
              iconColor={s.iconColor}
              title={s.title}
              description={s.description}
              link={s.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
}



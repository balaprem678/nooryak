import HomeFooterCopyright from "./subComponents/HomeFooterCopyright";
import Link from 'next/link';
import './HomeMainFooter.scss';
import Image from "next/image";
import { Images } from "@/utils/Images";

import React from 'react';
interface IHomeMainFooter {
    bgColor?: string;
    buttonCls?: string;
    quikLinkCls?: string;
    socialBtnCls?: string
}

const socials = [
    { name: "instagram", icon: "fa-instagram", link: "#" },
    { name: "linkedin", icon: "fa-facebook", link: "#" },
    { name: "linkedin", icon: "fa-linkedin-in", link: "#" },
    { name: "x", icon: "fa-x-twitter", link: "#" },
    { name: "youtube", icon: "fa-youtube", link: "#" },
];

const HomeMainFooter: React.FC<IHomeMainFooter> = ({ bgColor = "footer-main" }) => {
    return (
        <>
            <section className="contact-hero">
                <div className="top-bar">
                    <h3 className="">  <Image width={120} src={Images.logo} alt="logo" /></h3>
                </div>

                <div className="center-content">
                    <p className="sub-text">
                        CONTACT US AND LET’S BRING YOUR VISION TO LIFE
                    </p>

                    <Link href="/contact" className="main-title">
                        <span>C</span>
                        <span>O</span>
                        <span>N</span>
                        <span>T</span>
                        <span>A</span>
                        <span>C</span>
                        <span>T</span>&nbsp;
                        <span>U</span>
                        <span>S</span>
                    </Link>
                </div>

                <div className="bottom-bar">
                    <span><a href="/privacy-policy">Privacy Policy</a> - <a href="/terms-conditions">Terms & Conditions</a></span>

                    <div className="social-wrapper">
                        {socials.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className={`icon ${item.name}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={item.name}
                            >
                                <i className={`fab ${item.icon}`}></i>
                            </a>
                        ))}
                    </div>

                    <span>Copyright © 2026</span>
                </div>
            </section>

            {/* footer copyright */}
            <HomeFooterCopyright bgColor={bgColor} />
        </>
    );
};

export default HomeMainFooter;
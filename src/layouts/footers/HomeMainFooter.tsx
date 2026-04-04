import Link from 'next/link';
import './HomeMainFooter.scss';
import Image from "next/image";
import { Images } from "@/utils/Images";

import React from 'react';
import SocialMedia from "@/components/socialmedia/socialmedia";
interface IHomeMainFooter {
    bgColor?: string;
    buttonCls?: string;
    quikLinkCls?: string;
    socialBtnCls?: string
}



const HomeMainFooter: React.FC<IHomeMainFooter> = ({ bgColor = "footer-main" }) => {
    return (
        <div className="pb-10">
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

                    <SocialMedia />

                    <span>Copyright © 2026</span>
                </div>
            </section>

       
        </div>
    );
};

export default HomeMainFooter;
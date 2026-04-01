'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./HomeMainHeader.scss"

import OffCanvasPanel from "@/components/offcanvas/OffCanvasPanel";
import useStickyHeader from "../../hooks/useStickyHeader";
import { ArrowSvg, ButtonBlurFilter } from "@/svg";
import NavMenus from "../subComponents/NavMenus";
import { Images } from "@/utils/Images";

const HomeMainHeader = () => {
    const [openOffCanvas, setOpenOffCanvas] = useState(false);
    const isSticky = useStickyHeader(20);

    return (
        <>
            <header className={`custom-header ${isSticky ? "sticky" : ""}`}>
                <div className="header-inner">

                    {/* Logo */}
                    <div className="logo">
                        <Link href="/">
                            <Image width={120} src={Images.logo} alt="logo" />
                        </Link>
                    </div>

                    {/* Menu */}
                    <nav className="menu d-none d-xl-block">
                        <NavMenus />
                    </nav>

                    {/* Right */}
                    <div className="rights">
                        <Link href="/notfound" className="header-btn">
                            <span className="btn-text">Start a Project</span>
                            <span className="btn-icon">
                                <ArrowSvg />
                            </span>
                        </Link>

                        {/* Mobile */}
                        <button
                            onClick={() => setOpenOffCanvas(true)}
                            className="menu-btn d-xl-none"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                </div>
            </header>

            <OffCanvasPanel
                openOffcanvas={openOffCanvas}
                setOpenOffcanvas={setOpenOffCanvas}
            />
        </>
    );
};

export default HomeMainHeader;
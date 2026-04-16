'use client';

import { useState, useEffect } from "react";
import "./enquiryfrom.scss";

export default function EnquiryForm() {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (closing) {
            timeout = setTimeout(() => {
                setOpen(false);
                setClosing(false);
            }, 400);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [closing]);

    const handleOpen = () => {
        setClosing(false);
        setOpen(true);
    };

    const handleClose = () => {
        setClosing(true);
    };

    const isMounted = open || closing;
    const isActive = open && !closing;

    return (
        <div className="enquiryform">

            {/* 🔥 Floating Button */}
            <button onClick={handleOpen} className="gra_btn floating-trigger">
                <span className="btn-text">Enquiry</span>
                <i className="fa-solid fa-paper-plane"></i>
            </button>

            {isMounted && (
                <div
                    className={`enquiry-overlay ${isActive ? "open" : "closing"}`}
                    onClick={handleClose}
                >
                    <div
                        className={`enquiry-panel ${isActive ? "open" : "closing"}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-glow"></div>
                        <div className="bg-glow secondary"></div>

                        <button onClick={handleClose} className="close-btn" aria-label="Close Enquiry Form">
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="header-section">
                            <h2 className="title">Let’s Connect 🚀</h2>
                            <p className="subtitle">We’ll get back to you within 24 hours</p>
                        </div>

                        <form className="form">

                            <div className="input-group" style={{ "--idx": 1 } as React.CSSProperties}>
                                <input type="text" id="name" name="name" required placeholder=" " />
                                <label htmlFor="name">Your Name</label>
                                <span className="bar"></span>
                            </div>

                            <div className="input-group" style={{ "--idx": 2 } as React.CSSProperties}>
                                <input type="email" id="email" name="email" required placeholder=" " />
                                <label htmlFor="email">Email Address</label>
                                <span className="bar"></span>
                            </div>

                            <div className="input-group" style={{ "--idx": 3 } as React.CSSProperties}>
                                <input type="tel" id="phone" name="phone" required placeholder=" " />
                                <label htmlFor="phone">Phone Number</label>
                                <span className="bar"></span>
                            </div>

                            <div className="input-group services_select" style={{ "--idx": 4 } as React.CSSProperties}>
                                <label htmlFor="message">Services</label>
                                <select name="phone-type" id="phone-type">
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="App Development">App Development</option>
                                    <option value="Google Ads">Google Ads</option>
                                    <option value="Software Development">Software Development</option>
                                    <option value="Social Media Marketing">Social Media Marketing</option>
                                    <option value="Graphic Designing">Graphic Designing</option>
                                    <option value="Video Editing">Video Editing</option>
                                </select>
                                <span className="bar"></span>
                            </div>

                            <div className="input-group" style={{ "--idx": 5 } as React.CSSProperties}>
                                <textarea id="message" name="message" rows={4} required placeholder=" "></textarea>
                                <label htmlFor="message">Your Message</label>
                                <span className="bar"></span>
                            </div>

                            <button type="submit" className="submit-btn" style={{ "--idx": 5 } as React.CSSProperties}>
                                <span>Send Enquiry</span>
                                <i className="fa-solid fa-paper-plane-top"></i>
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}
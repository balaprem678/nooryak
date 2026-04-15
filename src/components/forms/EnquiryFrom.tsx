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
            <button onClick={handleOpen} className="gra_btn">
                Enquiry <i className="fa-solid fa-angles-left"></i>
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
                        {/* ❌ Close */}
                        <button onClick={handleClose} className="close-btn">
                            ✕
                        </button>

                        {/* 🧠 Header */}
                        <h2 className="title">Let’s Connect 🚀</h2>
                        <p className="subtitle">We’ll get back to you within 24 hours</p>

                        {/* 📝 Form */}
                        <form className="form">

                            <div className="input-group">
                                <label>Your Name</label>
                                <input type="text" required placeholder=" " />
                            </div>

                            <div className="input-group">
                                <label>Email Address</label>
                                <input type="email" required placeholder=" " />
                            </div>

                            <div className="input-group">
                                <label>Phone Number</label>
                                <input type="tel" required placeholder=" " />
                            </div>

                            <div className="input-group">
                                <label>Your Message</label>
                                <textarea rows={3} required placeholder=" "></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Enquiry 🚀
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}
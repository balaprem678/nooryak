"use client"
import { ArrowTwenty } from '@/svg/ArrowIcons';
import React from 'react';

const ContactFormArea = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div className="tp-contact-form-ptb pb-140">
            <div className="container container-1230">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="tp-contact-form-heading tp_fade_anim mb-50">
                            <div className="ar-about-us-4-title-box d-flex align-items-center mb-15">
                                <span className="tp-section-subtitle pre">Contact Us</span>
                                <div className="ar-about-us-4-icon">
                                    <ArrowTwenty />
                                </div>
                            </div>
                            <h3 className="tp-section-title lts">{`Let's`} make <br />
                                your brand <br />
                                brilliant!</h3>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-contact-form-wrap">
                            <form id="contact-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="tp-contact-form-input mb-20">
                                            <label>Full name*</label>
                                            <input name="name" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="tp-contact-form-input mb-20">
                                            <label>Email address*</label>
                                            <input name="email" type="email" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="tp-contact-form-input mb-20">
                                            <label>Company</label>
                                            <input name="subject" type="text" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="tp-contact-form-input mb-20">
                                            <label>Services</label>
                                           <select name="" id="">
                                            <option value="Digital Marketing">Digital Marketing</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="App Development">App Development</option>
                                            <option value="Google Ads">Google Ads</option>
                                            <option value="Software Development">Software Development</option>
                                            <option value="Social Media Marketing">Social Media Marketing</option>
                                            <option value="Graphic Designing">Graphic Designing</option>
                                            <option value="Video Editing">Video Editing</option>
                                           </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="tp-contact-form-input mb-20">
                                            <label>How Can We Help You*
                                            </label>
                                            <textarea name="message"></textarea>
                                        </div>
                                        <div className="tp-contact-form-btn">
                                            <button className="w-100" type="submit">
                                                <span>
                                                    <span className="text-1">Send Message</span>
                                                    <span className="text-2">Send Message</span>
                                                </span>
                                            </button>
                                            <p className="ajax-response mt-5"></p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactFormArea;
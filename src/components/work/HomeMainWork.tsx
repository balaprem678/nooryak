import "./HomeMainWork.scss"
const HomeMainWork = () => {
    return (
        <div className="homemainwork tp-work-area pb-145 tp-panel-pin-area" style={{ overflow: "hidden" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="tp-work-title-box tp-panel-pin">
                            <span className="tp-section-subtitle pre mb-20">How we Work</span>
                            <h2 className="tp-section-title fs-140">Our <br /> design thinking process</h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="tp-work-wrapper">
                            <div className="tp-work-item tp-panel-pin mb-15">
                                <div className="tp-work-number p-relative">
                                    <span></span>
                                    <i>01</i>
                                </div>
                                <div className="tp-work-content">
                                    <h4 className="tp-work-title">App Development</h4>
                                    <p>We build scalable and high-performance mobile & web applications tailored to your business needs.
                                        From idea to launch, we ensure seamless user experience and modern technology integration.</p>
                                </div>
                            </div>
                            <div className="tp-work-item tp-panel-pin mb-15">
                                <div className="tp-work-number p-relative">
                                    <span></span>
                                    <i>02</i>
                                </div>
                                <div className="tp-work-content">
                                    <h4 className="tp-work-title">Digital Marketing</h4>
                                    <p>Grow your brand with data-driven digital marketing strategies that deliver real results.
                                        We help you reach the right audience and boost engagement across all online platforms.</p>
                                </div>
                            </div>
                            <div className="tp-work-item tp-panel-pin mb-15">
                                <div className="tp-work-number p-relative">
                                    <span></span>
                                    <i>03</i>
                                </div>
                                <div className="tp-work-content">
                                    <h4 className="tp-work-title">Graphic Designing</h4>
                                    <p>Creative and impactful designs that elevate your brand identity and visual communication.
                                        We craft stunning visuals that leave a lasting impression on your audience.</p>
                                </div>
                            </div>
                            <div className="tp-work-item tp-panel-pin mb-15">
                                <div className="tp-work-number p-relative">
                                    <span></span>
                                    <i>04</i>
                                </div>
                                <div className="tp-work-content">
                                    <h4 className="tp-work-title">SEO & Testing</h4>
                                    <p>Optimize your website to rank higher and perform better in search engines.
                                        We ensure quality, speed, and flawless performance through advanced testing methods.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeMainWork;
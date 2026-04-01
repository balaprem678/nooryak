"use client";
import "./slidermarketing.scss";

export default function SliderMarketing() {
    return (
        <section className="idea-section mt-50 mb-50">
            <div className="slider">
                <div className="track">
                    <span className="outline">strategy.</span>
                    <span className="bold">marketing.</span>
                    <span className="outline">strategy.</span>
                    <span className="bold">marketing.</span>
                    <span className="outline">strategy.</span>
                    <span className="bold">marketing.</span>
                    <span className="outline">strategy.</span>
                    <span className="bold">marketing.</span>
                    <span className="outline">strategy.</span>
                    <span className="bold">marketing.</span>
                </div>
            </div>
            <div className="content">
                <h2>
                    Have an idea in your mind?
                    <br />
                    Let’s <span className="highlight">make</span> something great
                    <br />
                    together
                </h2>
                <button className="cta-btn">Let’s Get In Touch</button>
            </div>
        </section>
    );
}
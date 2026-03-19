import "./herosection.scss"
import { Images } from "@/utils/Images";

/* ── SVG Logo Icon ── */
const LogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="8" fill="#f47c20" />
    <path d="M8 32L18 10L24 22L28 15L36 32" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Social Icons ── */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const DribbbleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);



/* ── Chevron ── */
const Chevron = () => (
  <span className="chevron">▾</span>
);
const HomeMainHero = () => {
  return (
    <>
      <section className="hero">
        <div className="main">
          <div className="left">
            <div className="socialBar">
              <span className="followLabel">Follow</span>
              <FacebookIcon />
              <XIcon />
              <InstagramIcon />
              <DribbbleIcon />
            </div>
            <div>
              <div className="dotIndicator" />
              <p className="tagline">AI Powered Digital Marketing &amp; Web Development Company</p>

              <h1 className="heading">
                <span>Digital Marketing &amp;</span>
                <span>Web Development</span>
                <span>Company</span>
              </h1>

              <button className="ctaBtn">
                Hire Professional <span className="arrow">↗</span>
              </button>
              <button className="ctaBtn">
                Start Projects <span className="arrow">↗</span>
              </button>
              <div className="stats">
                <div className="stat">
                  <div className="number">98%</div>
                  <div className="label">Clients Satisfied and Repeating</div>
                </div>
                <div className="stat">
                  <div className="number">125+</div>
                  <div className="label">Projects Completed in 24 Countries</div>
                </div>
              </div>
            </div>


          </div>

          {/* ── RIGHT ── */}
          <div className="right">
            <div className="imageWrap">
              {/* Replace src with your actual image path */}
              <img
                src={Images.herobanner.src}
                alt="Team meeting with city skyline"
              />
            </div>

            {/* Floating card */}
            <div className="floatingCard">
              <p>Results <br /> Driven Digital <br /> Marketing &amp; <br /> Scale Your  <br /> Brand Online</p>
            </div>

            {/* Award label */}
            <div className="awardLabel">Award Winning Agency</div>
          </div>

        </div>
      </section>
    </>
  );
};

export default HomeMainHero;
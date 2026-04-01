import HomeMainHeader from "@/layouts/headers/HomeMainHeader";
import Link from "next/link";
// import "./notfound.scss";

const ArrowLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const Home = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

// ── component ─────────────────────────────────────────────────────────────────
export default function CommingSoon() {
    return (
        <div className="page-404">
            {/* Background */}
            <div className="bg-blobs">
                <div className="blob blob--1" />
                <div className="blob blob--2" />
                <div className="blob blob--3" />
            </div>
            <div className="grid-overlay" />
            <div className="particles">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="particle" />
                ))}
            </div>

            <HomeMainHeader />

            {/* Main */}
            <main className="container-404">
                {/* Orbit visual */}
                <div className="orbit-visual">
                    <div className="orbit-ring orbit-ring--outer" />
                    <div className="orbit-ring orbit-ring--inner" />
                    <div className="pulse-ring" />
                    <div className="orbit-dot orbit-dot--1" />
                    <div className="orbit-dot orbit-dot--2" />
                    <div className="orbit-dot orbit-dot--3" />
                    <div className="core">
                        <span className="core-number">ERR</span>
                    </div>
                </div>

                {/* Glitch 404 */}
                <div className="glitch-wrap">
                    <span className="number-404" data-text="404">
                        C<span className="accent-digit">o</span>mming S<span className="accent-digit">oo</span>n...
                    </span>
                </div>

                <h1 className="headline-404">Lost in the void?</h1>

                <p className="subtext-404">
                    The page you looking for has drifted into deep space.
                    Maybe it was moved, deleted, or never existed at all.
                    <span className="cursor" />
                </p>

                {/* CTAs */}
                <div className="cta-group">
                    <Link href="/" className="btn btn--primary">
                        <Home />
                        Back to Home
                    </Link>
                    <button
                        className="btn btn--ghost"
                        onClick={() => window.history.back()}>
                        <ArrowLeft />
                        Go Back
                    </button>
                </div>
            </main>
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import HomeMainHeader from "@/layouts/headers/HomeMainHeader";
import Link from "next/link";
import "./notfound.scss";

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default function NotFound() {


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

      <main className="container-404">
        {/* Orbit */}
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

        {/* Title */}
        <div className="glitch-wrap">
          <span className="number-404">
            C<span className="accent-digit">o</span>mming S
            <span className="accent-digit">oo</span>n...
          </span>
        </div>

        <h1 className="headline-404">Lost in the void?</h1>

        <p className="subtext-404">
          The page you are looking for has drifted into deep space.
          Maybe it was moved, deleted, or never existed at all.
          <span className="cursor" />
        </p>

        {/* Buttons */}
        <div className="cta-group">
          <Link href="/" className="btn btn--primary">
            <HomeIcon />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
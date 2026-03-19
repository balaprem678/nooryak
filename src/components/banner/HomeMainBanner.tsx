"use client";

import { useRef, useState } from "react";

const HomeMainBanner = ({ ColorStyleCls }: { ColorStyleCls?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="tp-banner-area" style={{ position: "relative" }}>
      
      <div className={`tp-banner-img ${ColorStyleCls}`}>
        
        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/assets/images/nooryak_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover"
          }}
        />

        {/* MUTE / UNMUTE BUTTON */}
        <button
          onClick={toggleMute}
          style={{
            position: "absolute",
            bottom: "50%",
            right: "20px",
            background: "#ff5622",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "18px"
          }}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

      </div>
    </div>
  );
};

export default HomeMainBanner;
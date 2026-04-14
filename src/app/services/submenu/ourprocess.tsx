'use client';
import React from "react";
import { useParams } from "next/navigation";
import { processDataWeb } from "./herobanner/webdevelopment";
import { processDataApp } from "./herobanner/appdevelopment";

export default function OurProcess() {
  const { type } = useParams() as { type: string };
  const key = { 'web-development': 'web', 'app-development': 'app' }[type] || 'web';
  const processData = key === 'web' ? processDataWeb : processDataApp;

  return (
    <>
      <section className="process">
        <div className="container">
          <p className="tag tac">{processData.tag}</p>
          <h2 className="title tac">{processData.title}</h2>
          <p className="subtitle tac">{processData.subtitle}</p>

          <div className="steps">
            {processData.steps.map((step, i) => (
              <div className="step" key={i}>
                <span className="number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className="cta">
            <h3>
              Ready to Build Your Next <br /> <span>Big Thing?</span>
            </h3>
            <p>
              Share your idea with us and lets create a <br /> website that drives
              real results.
            </p>
            <button className="gra_btn">Start a Project →</button>
          </div>
        </div>
      </section>
    </>

  );
};







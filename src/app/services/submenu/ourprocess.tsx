import React from "react";

export const processData = {
  tag: "OUR PROCESS",
  title: "How We Bring Your Ideas to Life",
  subtitle:
    "A proven process that ensures clarity, transparency, and outstanding results.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description:
        "We understand your goals, audience, and requirements.",
    },
    {
      number: "02",
      title: "Planning",
      description:
        "We create a clear roadmap and project strategy.",
    },
    {
      number: "03",
      title: "Development",
      description:
        "Our team builds your website using the latest technologies.",
    },
    {
      number: "04",
      title: "Testing",
      description:
        "We ensure everything works perfectly across all devices.",
    },
    {
      number: "05",
      title: "Launch & Support",
      description:
        "We launch your site and provide ongoing support.",
    },
  ],
};

export default function OurProcess() {
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
              Share your idea with us and let's create a <br /> website that drives
              real results.
            </p>
            <button className="gra_btn">Start a Project →</button>
          </div>
        </div>
      </section>
    </>

  );
};







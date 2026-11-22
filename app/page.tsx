import Image from "next/image";
import Link from "next/link";
import { ClipboardList, ScanLine, SlidersHorizontal } from "lucide-react";
import { proposedPrice } from "@/lib/product";

const steps = [
  { icon: ClipboardList, title: "Share your setup", detail: "Tell us what you play with and what you’d like to change about how your grip feels." },
  { icon: ScanLine, title: "We review the fit", detail: "We review your setup by hand. Compatibility stays unconfirmed until we physically verify your specific racket-handle profile." },
  { icon: SlidersHorizontal, title: "Help shape the prototype", detail: "If there’s a fit to explore, we may follow up. Personalization and prototype review are initially manual." },
];

const questions = [
  { question: "Will it fit my racket?", answer: "Compatibility is unconfirmed until your specific racket-handle profile has been physically verified. A brand, model name, or grip size alone can’t confirm fit." },
  { question: "What does it cost?", answer: `The proposed starting price is ${proposedPrice}, excluding shipping. The interest form is free to submit and takes no payment.` },
  { question: "What happens after I sign up?", answer: "We’ll review the racket and grip details you share. If there’s a potential fit or we need more information, we may email you about the pilot. Submitting the form doesn’t reserve a prototype." },
];

export default function Home() {
  return (
    <>
      <section className="shell hero" id="concept" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Prelaunch pilot</p>
          <h1 id="hero-title">Your racket.<br />Your grip.</h1>
          <p className="hero-description">A customizable tennis racket grip insert in development. Tell us what you play with and help shape what we prototype.</p>
          <Link className="button button-primary" href="/pilot">Join the pilot</Link>
          <p className="price"><strong>{proposedPrice}</strong><span>Proposed starting price<br />Excludes shipping</span></p>
        </div>
        <figure className="concept-figure">
          <Image src="/grip-concept.webp" alt="Exploded concept drawing of a lime-green grip insert above a dark tennis racket handle." width={1254} height={1254} preload sizes="(max-width: 767px) 92vw, (max-width: 1300px) 48vw, 580px" />
          <figcaption><span className="status-dot" /> Product concept illustration</figcaption>
        </figure>
      </section>

      <section className="process-section" id="how-it-works" aria-labelledby="process-title">
        <div className="shell section-space">
          <p className="eyebrow">How the pilot works</p>
          <h2 id="process-title">It starts with your setup.</h2>
          <div className="step-grid">
            {steps.map(({ icon: Icon, title, detail }) => (
              <article key={title} className="step-card">
                <span className="step-icon"><Icon aria-hidden="true" size={22} strokeWidth={1.7} /></span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Pilot questions</h2>
        <div>
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-12 sm:py-16">
          <div>
            <h2>Help shape the first prototype.</h2>
            <p>Share your racket and what you want from your grip.</p>
          </div>
          <Link className="button button-primary" href="/pilot">Join the pilot</Link>
        </div>
      </section>
    </>
  );
}

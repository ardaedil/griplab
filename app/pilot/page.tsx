import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { PilotForm } from "./pilot-form";
import { proposedPrice } from "@/lib/product";

export const metadata: Metadata = { title: "Join the pilot" };

export default function PilotPage() {
  return (
    <section className="shell section-space pilot-layout" aria-labelledby="pilot-title">
      <div className="pilot-intro">
        <p className="eyebrow"><span className="status-dot" /> Prelaunch pilot</p>
        <h1 id="pilot-title">Join the pilot.</h1>
        <p>Tell us what you play with and what you’d change about your grip. Your answers will help shape the first prototype.</p>
        <aside className="pilot-aside" aria-labelledby="pilot-expectations">
          <span className="step-icon"><ListChecks aria-hidden="true" size={22} /></span>
          <h2 id="pilot-expectations">What to expect</h2>
          <ul>
            <li>Personalization and prototype review are initially manual.</li>
            <li>Fit requires physical verification of your specific racket-handle profile.</li>
            <li>{proposedPrice} is the proposed starting price, excluding shipping. The form takes no payment.</li>
          </ul>
        </aside>
      </div>
      <PilotForm />
    </section>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>Pilot terms</h1>
      <p className="review-note">Draft for founder review before public launch.</p>
      <h2>Registering interest</h2>
      <p>Submitting the form expresses interest in a grip insert concept. It takes no payment and does not reserve a prototype or confirm participation.</p>
      <h2>Price and fit</h2>
      <p>The proposed starting price is $49, excluding shipping. Compatibility remains unconfirmed until a specific racket-handle profile is physically verified. Personalization and prototype review are initially manual.</p>
      <h2>Details pending review</h2>
      <p>The founder needs to confirm the responsible entity, contact details, eligibility, and any participation terms before launch.</p>
    </article>
  );
}

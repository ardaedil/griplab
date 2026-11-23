import Link from "next/link";
import type { Metadata } from "next";
import { proposedPrice } from "@/lib/product";

export const metadata: Metadata = { title: "Pilot terms" };

export default function TermsPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>Paltune pilot terms</h1>
      <p className="review-note">Founder-review draft — not approved for public launch</p>
      <p>Draft updated November 23, 2026. These terms describe the prelaunch interest process for a proposed customizable tennis-racket grip insert.</p>

      <h2>What you are signing up for</h2>
      <p>The form lets you express interest in a product concept and, if appropriate, be contacted about future research or testing. Submitting the form is free. <strong>It is not an order, purchase, deposit, paid reservation, guarantee of selection, or promise to deliver a prototype.</strong> Paltune may accept, decline, pause, or end pilot recruitment.</p>

      <h2>Who may participate</h2>
      <p>The pilot is intended only for people who are at least 18 years old and currently live in the United States. Registration requires you to attest to both conditions. This is self-attestation, not independent age, identity, or residency verification. Please do not submit a form if you are under 18, live outside the United States, impersonate someone else, or submit information you are not authorized to share. Keep your feedback relevant to your racket and grip experience and avoid including health records, payment details, or other sensitive information in the free-text field.</p>

      <h2>Product status, fit, and pricing</h2>
      <p>The racket-grip insert is a concept under development. Illustrations are design concepts, not evidence of manufactured dimensions, tested performance, or finalized materials. Customization and prototype review would initially be manual.</p>
      <p>The proposed starting price is <strong>{proposedPrice}, excluding shipping</strong>. It is a research price hypothesis and not an offer for sale. Final pricing, availability, materials, shipping, and compatibility may change. A specific racket-handle profile must be physically verified before Paltune can confirm fit.</p>
      <p>Paltune makes no present claim that this concept prevents injury, treats a medical condition, or improves athletic performance. Prototype handling or on-court trials, if offered later, will require separate safety instructions and any applicable participation terms.</p>

      <h2>Communications and your choices</h2>
      <p>Submitting the form requires permission for Paltune to email you about your pilot response. General product announcements are a separate, optional choice. Choosing not to receive product updates does not affect your application. The current site does not send automated emails. Before any marketing email program begins, Paltune must establish an appropriate unsubscribe process and sender contact details.</p>

      <h2>Privacy and use of the website</h2>
      <p>Our <Link href="/privacy">pilot privacy notice</Link> explains what the form collects and how it is used. Do not attempt to misuse the form, interfere with the website, or submit misleading, malicious, or unlawful content. Paltune may change the website and pilot process as the concept develops.</p>

      <h2>Important information before launch</h2>
      <p>Paltune is currently operated by Arda Edil as an individual, not an LLC. Questions and privacy requests can be sent to <a href="mailto:ardaedil@gmail.com">ardaedil@gmail.com</a>. The founder has approved a U.S.-only adult pilot and a 12-month application retention period. <strong>Before public launch, the deletion schedule, privacy request process, and marketing opt-out handling must be verified.</strong> This draft does not replace a separate agreement for physical prototype testing or any future sale.</p>
      <p>Nothing in these pilot terms is intended to waive rights that cannot legally be waived. For questions, contact Paltune using the email above.</p>
    </article>
  );
}

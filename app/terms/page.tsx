import Link from "next/link";
import type { Metadata } from "next";
import { proposedPrice } from "@/lib/product";

export const metadata: Metadata = { title: "Pilot terms" };

export default function TermsPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>GripLab pilot terms</h1>
      <p className="review-note">Founder-review draft — not approved for public launch</p>
      <p>Draft updated November 23, 2026. These terms describe the prelaunch interest process for a proposed customizable tennis-racket grip insert.</p>

      <h2>What you are signing up for</h2>
      <p>The form lets you express interest in a product concept and, if appropriate, be contacted about future research or testing. Submitting the form is free. <strong>It is not an order, purchase, deposit, paid reservation, guarantee of selection, or promise to deliver a prototype.</strong> GripLab may accept, decline, pause, or end pilot recruitment.</p>

      <h2>Who may participate</h2>
      <p>The intended pilot audience is adults aged 18 or older. Please do not submit a form if you are under 18, impersonate someone else, or submit information you are not authorized to share. Keep your feedback relevant to your racket and grip experience and avoid including health records, payment details, or other sensitive information in the free-text field.</p>

      <h2>Product status, fit, and pricing</h2>
      <p>The racket-grip insert is a concept under development. Illustrations are design concepts, not evidence of manufactured dimensions, tested performance, or finalized materials. Customization and prototype review would initially be manual.</p>
      <p>The proposed starting price is <strong>{proposedPrice}, excluding shipping</strong>. It is a research price hypothesis and not an offer for sale. Final pricing, availability, materials, shipping, and compatibility may change. A specific racket-handle profile must be physically verified before GripLab can confirm fit.</p>
      <p>GripLab makes no present claim that this concept prevents injury, treats a medical condition, or improves athletic performance. Prototype handling or on-court trials, if offered later, will require separate safety instructions and any applicable participation terms.</p>

      <h2>Communications and your choices</h2>
      <p>Submitting the form requires permission for GripLab to email you about your pilot response. General product announcements are a separate, optional choice. Choosing not to receive product updates does not affect your application. The current site does not send automated emails. Before any marketing email program begins, GripLab must establish an appropriate unsubscribe process and sender contact details.</p>

      <h2>Privacy and use of the website</h2>
      <p>Our <Link href="/privacy">pilot privacy notice</Link> explains what the form collects and how it is used. Do not attempt to misuse the form, interfere with the website, or submit misleading, malicious, or unlawful content. GripLab may change the website and pilot process as the concept develops.</p>

      <h2>Important information before launch</h2>
      <p><strong>Founder decision required:</strong> Identify the individual or legal entity operating GripLab, publish a working contact email, approve geographic eligibility, and establish the data-retention and privacy-request process before public registration opens. This draft does not replace a separate agreement for physical prototype testing or any future sale.</p>
      <p>Nothing in these pilot terms is intended to waive rights that cannot legally be waived. Questions about the pilot should be directed to GripLab using the contact method that will be added before launch.</p>
    </article>
  );
}

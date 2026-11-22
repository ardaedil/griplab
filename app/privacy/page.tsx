import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>Pilot privacy</h1>
      <p className="review-note">Draft for founder review before public launch.</p>
      <h2>What the form asks for</h2>
      <p>The pilot form asks for your email, your racket and grip setup, what you’d like to change, and how likely you’d be to buy at the proposed price. GripLab uses these details to review interest and potential fit and to contact you about the pilot. Product updates are a separate, optional choice.</p>
      <h2>Storage and analytics</h2>
      <p>GripLab stores pilot responses and consent choices in Supabase. This site uses a short-lived receipt cookie to show the confirmation page. GripLab measures pilot interest using totals from submitted responses and uses no third-party tracking scripts.</p>
      <h2>Details pending review</h2>
      <p>The founder needs to confirm the responsible entity, privacy contact, retention period, and process for accessing or deleting a submission before launch.</p>
    </article>
  );
}

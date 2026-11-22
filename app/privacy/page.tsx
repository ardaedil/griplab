import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>Pilot privacy</h1>
      <p className="review-note">Draft for founder review before public launch.</p>
      <h2>What the form asks for</h2>
      <p>The pilot form asks for your email, your racket and grip setup, and what you’d like to change. GripLab uses these details to review interest and potential fit and to contact you about the pilot. Product updates are a separate, optional choice.</p>
      <h2>Details pending review</h2>
      <p>The founder needs to confirm the responsible entity, privacy contact, retention period, and process for accessing or deleting a submission before launch.</p>
    </article>
  );
}

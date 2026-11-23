import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pilot privacy notice" };

export default function PrivacyPage() {
  return (
    <article className="shell section-space prose-page">
      <h1>Paltune pilot privacy notice</h1>
      <p className="review-note">Founder-review draft — not approved for public launch</p>
      <p>Draft updated November 23, 2026. This notice covers the Paltune tennis-grip pilot interest form, not a future store or product-ordering service.</p>

      <h2>Who is responsible</h2>
      <p>Paltune is a prelaunch project developing a customizable tennis-racket grip insert, currently operated by Arda Edil in an individual capacity (not by an LLC). <strong>A working privacy-contact email must be chosen and published before public registration opens.</strong> The project is currently testing privately; do not submit real personal information while this notice remains a draft.</p>

      <h2>Information you provide</h2>
      <p>The pilot form collects your email address, grip size, and your response about willingness to buy at the proposed price. It may also collect an optional racket brand/model and your written feedback about your current grip. We record the price shown to you, submission time, and the timestamps and versions of your consent choices.</p>
      <p>Permission to contact you about your specific pilot response is required to submit. Permission for general Paltune product updates is optional and separate. The form does not ask for payment details, hand photographs, precise hand measurements, or a shipping address.</p>

      <h2>How we use your information</h2>
      <p>We use submissions to understand tennis players&apos; grip needs, assess interest in the concept, review possible pilot participation, and—if you agreed—contact you about your application. We may analyze aggregate response counts to guide product research. General product announcements would be sent only to people who separately opted in. The current application does not automatically send email.</p>
      <p>We also use limited technical information as necessary to operate, secure, and troubleshoot the website. We do not sell pilot application details or use them for behavioral advertising.</p>

      <h2>Hosting, sharing, and location</h2>
      <p>Vercel hosts the website and processes web requests. Supabase stores submitted applications in a restricted database. The staging database is configured in US East (Ohio), and website functions in Cleveland; infrastructure providers may process technical information in other places under their service arrangements. Access to submitted application records is limited to authorized project administrators and infrastructure service providers as needed to operate the service.</p>
      <p>We may disclose information if legally required or necessary to protect the service, but we do not publish pilot responses or provide an applicant list to advertisers.</p>

      <h2>Cookies and analytics</h2>
      <p>After a successful submission, Paltune sets a short-lived, HTTP-only receipt cookie for the thank-you page; it lasts up to 15 minutes. The application currently has no third-party browser analytics, advertising pixels, or marketing tracking cookies. During private staging, Vercel Authentication may also use login-related cookies to restrict access.</p>

      <h2>Retention and deletion</h2>
      <p><strong>Founder decision required:</strong> Before opening registration to the public, Paltune must publish a specific application-retention period and establish a process for deleting records after that period or after a valid deletion request. Until those decisions are approved, this remains a private-test draft and is not a final public privacy notice.</p>
      <p>Once the contact channel is published, you will be able to request access to, correction of, or deletion of your application, or withdraw optional product-update permission, by contacting Paltune. Withdrawal of product-update permission will not affect any lawful processing already completed. Certain limited records may need to be retained where applicable law requires them.</p>

      <h2>Security and age</h2>
      <p>The application uses server-side validation, restricted database permissions, and HTTPS hosting. No service can guarantee absolute security. The pilot is intended for adults aged 18 or older; if we learn that a minor submitted personal information, we will take steps to remove it.</p>

      <h2>Changes and contact</h2>
      <p>We will post updates to this notice with a new effective date when practices change. <strong>Before public launch, the founder must confirm the published privacy-contact email, retention schedule, and requests process.</strong></p>
      <p>See the <Link href="/terms">pilot terms</Link> for the nature of this early-stage program.</p>
    </article>
  );
}

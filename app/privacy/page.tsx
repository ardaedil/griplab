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
      <p>Paltune is a prelaunch project developing a customizable tennis-racket grip insert, currently operated by Arda Edil in an individual capacity (not by an LLC). For questions or privacy requests, email <a href="mailto:ardaedil@gmail.com">ardaedil@gmail.com</a>. This is the approved pilot contact address until a verified Paltune-domain mailbox is available. The project is currently testing privately; do not submit real personal information while this notice remains a draft.</p>

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
      <p><strong>Founder-selected retention period: up to 12 months from the original application date.</strong> We intend to delete applications when they reach that limit, or sooner on a verified deletion request, except where applicable law requires keeping limited information. The automatic deletion job and its monitoring must be installed and verified before public registration opens; it is not active in this draft environment.</p>
      <p>To request access, correction, or deletion of your application, or to withdraw permission for optional product updates, email <a href="mailto:ardaedil@gmail.com">ardaedil@gmail.com</a>, preferably from the address used to sign up so we can verify the request. We will confirm control of the signup address before releasing or changing application details. Withdrawal will not undo lawful processing already completed. No automated marketing emails are currently sent.</p>

      <h2>Security and age</h2>
      <p>The application uses server-side validation, restricted database permissions, and HTTPS hosting. No service can guarantee absolute security. Registration requires applicants to confirm that they are at least 18 and currently live in the United States. These statements are self-attestations, not independent age, identity, or residency verification. We do not request birth dates or residential addresses. If we learn that an ineligible applicant submitted information, we will take steps to remove it.</p>

      <h2>Changes and contact</h2>
      <p>We will post updates to this notice with a new effective date when practices change. The founder has selected this pilot contact email and 12-month retention policy. <strong>The deletion schedule and privacy-request workflow still require operational verification before public launch.</strong></p>
      <p>See the <Link href="/terms">pilot terms</Link> for the nature of this early-stage program.</p>
    </article>
  );
}

import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { receiptCookie } from "@/lib/pilot";

export const metadata: Metadata = { title: "Pilot interest received" };

export default async function ThankYouPage() {
  if ((await cookies()).get(receiptCookie)?.value !== "1") redirect("/pilot");

  return (
    <section className="shell section-space prose-page" aria-labelledby="thanks-title">
      <div className="receipt-card">
        <span className="step-icon"><Check aria-hidden="true" size={24} /></span>
        <h1 id="thanks-title">Thanks for your interest.</h1>
        <p>We’ve received your pilot response. We’ll review your setup and may email you if there’s a potential fit or we need more details.</p>
        <p>We’ll confirm compatibility only after physically verifying your specific racket-handle profile.</p>
        <Link className="button button-outline" href="/">Back to Paltune</Link>
      </div>
    </section>
  );
}

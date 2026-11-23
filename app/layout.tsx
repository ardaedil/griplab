import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Paltune | Made to fit you", template: "%s | Paltune" },
  description: "Explore Paltune Grip, a customizable tennis racket grip insert in development. Join the free pilot interest list.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import Link from "next/link";

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Paltune home">
      <span className="brand-mark" aria-hidden="true"><span /><span /></span>
      Pal<span>tune</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell flex min-h-[4.5rem] items-center justify-between gap-3">
        <Brand />
        <nav className="flex items-center gap-6 lg:gap-9" aria-label="Main">
          <Link className="nav-detail" href="/#concept">The concept</Link>
          <Link className="nav-detail" href="/#how-it-works">How it works</Link>
          <Link className="button button-outline button-small" href="/pilot">Join the pilot</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-7">
        <Brand />
        <nav aria-label="Footer" className="flex items-center gap-6">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}

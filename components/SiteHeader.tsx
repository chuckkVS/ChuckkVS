import Link from 'next/link';

export default function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="brand">
          <Link href="/" className="logo">
            <span className="chukk">Chukk</span>
            <span className="vs">VS</span>
          </Link>
          <div className="tagline">// The cases they closed &nbsp;·&nbsp; The stories they buried</div>
        </div>
        <div className="header-right">
          <nav>
            <Link href="/investigations">Investigations</Link>
            <span className="nav-sep">◆</span>
            <Link href="/domestic">Domestic</Link>
            <span className="nav-sep">◆</span>
            <Link href="/international">International</Link>
            <span className="nav-sep">◆</span>
            <Link href="/archive">Archive</Link>
            <span className="nav-sep">◆</span>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </header>

      <div className="ticker">
        <div className="ticker-track">
          <span className="tick-item"><span className="dot">◆</span>Independent Investigative Dispatch</span>
          <span className="tick-item"><span className="dot">◆</span>No sponsors. No filters. No corporate editor.</span>
          <span className="tick-item"><span className="dot">◆</span>All cases. All receipts.</span>
          <span className="tick-item"><span className="dot">◆</span>Independent Investigative Dispatch</span>
          <span className="tick-item"><span className="dot">◆</span>No sponsors. No filters. No corporate editor.</span>
          <span className="tick-item"><span className="dot">◆</span>All cases. All receipts.</span>
        </div>
      </div>

      <Dateline />
    </>
  );
}

function Dateline() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="dateline">
      <span>Vol. 1 &nbsp;·&nbsp; The Dispatch</span>
      <span className="dateline-center">◆ &nbsp; Independent Investigative Dispatch &nbsp; ◆</span>
      <span>{today}</span>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer>
      <div className="foot-logo">Chukk<span className="vs">VS</span></div>
      <div className="foot-copy">© {new Date().getFullYear()} ChukkVS — Independent Investigative Media</div>
      <div className="foot-copy">All Cases. No Filters. No Sponsors.</div>
    </footer>
  );
}

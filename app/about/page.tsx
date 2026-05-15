export default function AboutPage() {
  return (
    <main>
      <div className="post-wrap">
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          ◆ About
        </div>
        <h1 className="post-title">
          About <span className="vs-i">ChukkVS</span>
        </h1>
        <div className="post-body">
          <p>
            ChukkVS is an independent investigative dispatch. No sponsors. No corporate editor. No algorithm telling the stories what to be.
          </p>
          <p>
            Every case filed here is independently reported. Every story is the story — not a press release rewritten.
          </p>
        </div>
      </div>
    </main>
  );
}

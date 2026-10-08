import "./SectionHeading.css";

// Kicker + big heading split into word masks; the parent section animates `.sh-word`
export default function SectionHeading({ kicker, title, accent, children }) {
  return (
    <header className="sh">
      <span className="sh-kicker">
        <span className="sh-line" />
        {kicker}
      </span>
      <h2 className="sh-title" aria-label={`${title} ${accent ?? ""}`.trim()}>
        {title.split(" ").map((word, i) => (
          <span className="sh-mask" key={i} aria-hidden="true">
            <span className="sh-word">{word}</span>
          </span>
        ))}
        {accent && (
          <span className="sh-mask" aria-hidden="true">
            <span className="sh-word sh-accent">{accent}</span>
          </span>
        )}
      </h2>
      {children && <p className="sh-sub">{children}</p>}
    </header>
  );
}

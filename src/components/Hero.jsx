import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-marquee" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="hero-marquee-group" key={copy}>
            {[0, 1, 2, 3].map((word) => (
              <span key={word}>ABIM</span>
            ))}
          </div>
        ))}
      </div>
      <div className="hero-portrait-anchor">
        <img
          src="/myself/Abim.png"
          alt="Abim Tamang"
          className="hero-portrait"
        />
      </div>
    </section>
  );
}

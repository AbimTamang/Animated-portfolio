import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import animateHeading from "../lib/animateHeading";
import "./GitHubActivity.css";

gsap.registerPlugin(ScrollTrigger);

const USER = "AbimTamang";
const CACHE_KEY = "gh-activity-v1";
// Repos that shouldn't be linked from the portfolio (company code)
const HIDDEN_REPOS = new Set(["Nextmind"]);

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#da5b0b",
  Python: "#3572a5",
};

const relativeTime = (iso) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const days = Math.round((new Date(iso) - Date.now()) / 86400000);
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(days) < 60) return rtf.format(Math.round(days / 7), "week");
  return rtf.format(Math.round(days / 30), "month");
};

const readCache = () => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    return cached && Date.now() - cached.at < 30 * 60 * 1000 ? cached.data : null;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage unavailable — fine, we'll just refetch next time
  }
};

async function loadActivity() {
  const [reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`),
  ]);
  if (!reposRes.ok) throw new Error("GitHub API unavailable");
  const repos = (await reposRes.json()).filter((r) => !r.fork && r.name !== USER);
  const contrib = contribRes.ok ? await contribRes.json() : null;

  const langCounts = {};
  repos.forEach((r) => r.language && (langCounts[r.language] = (langCounts[r.language] || 0) + 1));
  const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, pct: Math.round((count / langTotal) * 100) }));

  return {
    repoCount: repos.length,
    contributions: contrib?.total?.lastYear ?? null,
    days: contrib?.contributions?.slice(-53 * 7) ?? [],
    languages,
    recent: repos.filter((r) => !HIDDEN_REPOS.has(r.name)).slice(0, 4).map((r) => ({
      name: r.name,
      url: r.html_url,
      language: r.language,
      pushed: r.pushed_at,
      homepage: r.homepage,
    })),
  };
}

export default function GitHubActivity() {
  const sectionRef = useRef(null);
  const [data, setData] = useState(readCache);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (data) return;
    let cancelled = false;
    loadActivity()
      .then((result) => {
        if (cancelled) return;
        writeCache(result);
        setData(result);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [data]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      animateHeading(sectionRef.current);
    },
    { scope: sectionRef },
  );

  // Data-driven animations run once the numbers arrive
  useGSAP(
    () => {
      if (!data) return;
      const q = gsap.utils.selector(sectionRef);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        q(".gh-count").forEach((el) => (el.textContent = el.dataset.value));
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: q(".gh-grid")[0], start: "top 80%" },
      });

      tl.from(q(".gh-card"), { y: 60, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" });

      q(".gh-count").forEach((el) => {
        const counter = { n: 0 };
        tl.to(
          counter,
          {
            n: Number(el.dataset.value),
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = Math.round(counter.n)),
          },
          0.2,
        );
      });

      tl.from(
        q(".gh-cell"),
        { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(2)", stagger: { each: 0.0025, from: "start" } },
        0.3,
      )
        .from(q(".gh-lang-bar span"), { scaleX: 0, duration: 1.2, stagger: 0.08, ease: "power3.out" }, 0.4)
        .from(q(".gh-repo"), { x: -30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.5);
    },
    { scope: sectionRef, dependencies: [data], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} id="github" className="gh">
      <div className="gh-inner">
        <SectionHeading kicker="06 — Live from GitHub" title="Shipping" accent="every week.">
          Pulled straight from my GitHub, so it's always up to date.
        </SectionHeading>

        {failed && (
          <p className="gh-error">
            Couldn't reach GitHub right now.{" "}
            <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">
              See my profile directly ↗
            </a>
          </p>
        )}

        {!data && !failed && (
          <div className="gh-grid gh-loading" aria-busy="true">
            <div className="gh-card gh-skeleton" />
            <div className="gh-card gh-skeleton" />
            <div className="gh-card gh-skeleton gh-wide" />
          </div>
        )}

        {data && (
          <div className="gh-grid">
            <div className="gh-card gh-stat">
              <span className="gh-label">Public repositories</span>
              <span className="gh-big">
                <span className="gh-count" data-value={data.repoCount}>
                  {data.repoCount}
                </span>
              </span>
            </div>

            {data.contributions !== null && (
              <div className="gh-card gh-stat">
                <span className="gh-label">Contributions this year</span>
                <span className="gh-big">
                  <span className="gh-count" data-value={data.contributions}>
                    {data.contributions}
                  </span>
                </span>
              </div>
            )}

            <div className="gh-card gh-langs">
              <span className="gh-label">Languages across repos</span>
              <div className="gh-lang-bar" aria-hidden="true">
                {data.languages.map((lang) => (
                  <span
                    key={lang.name}
                    style={{ width: `${lang.pct}%`, background: languageColors[lang.name] ?? "var(--ember)" }}
                  />
                ))}
              </div>
              <ul className="gh-lang-list">
                {data.languages.map((lang) => (
                  <li key={lang.name}>
                    <i style={{ background: languageColors[lang.name] ?? "var(--ember)" }} />
                    {lang.name} <b>{lang.pct}%</b>
                  </li>
                ))}
              </ul>
            </div>

            {data.days.length > 0 && (
              <div className="gh-card gh-wide gh-heat-card">
                <div className="gh-heat-head">
                  <span className="gh-label">Contribution graph · last 12 months</span>
                  <span className="gh-legend" aria-hidden="true">
                    Less
                    {[0, 1, 2, 3, 4].map((l) => (
                      <i key={l} className={`gh-l${l}`} />
                    ))}
                    More
                  </span>
                </div>
                <div className="gh-heat-scroll">
                  <div className="gh-heat" role="img" aria-label={`${data.contributions} contributions in the last year`}>
                    {/* pad so each column starts on Sunday */}
                    {Array.from({ length: new Date(data.days[0].date).getUTCDay() }, (_, i) => (
                      <i key={`pad${i}`} className="gh-pad" />
                    ))}
                    {data.days.map((day) => (
                      <i
                        key={day.date}
                        className={`gh-cell gh-l${day.level}`}
                        title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="gh-card gh-wide gh-recent">
              <span className="gh-label">Recently pushed</span>
              <ul>
                {data.recent.map((repo) => (
                  <li key={repo.name}>
                    <a className="gh-repo" href={repo.url} target="_blank" rel="noreferrer">
                      <span className="gh-repo-name">{repo.name}</span>
                      {repo.language && (
                        <span className="gh-repo-lang">
                          <i style={{ background: languageColors[repo.language] ?? "var(--ember)" }} />
                          {repo.language}
                        </span>
                      )}
                      <span className="gh-repo-time">{relativeTime(repo.pushed)}</span>
                      <span className="gh-repo-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

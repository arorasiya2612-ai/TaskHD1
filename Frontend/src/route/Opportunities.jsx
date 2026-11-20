
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useAuth } from "../AuthContext";
import "./Opportunities.css";

const pathways = [
  {
    title: "Software Engineering Intern",
    category: "Internship",
    description: "Frontend, backend and mobile application development",
    skills: ["React", "JavaScript", "Git"]
  },
  {
    title: "Graduate Software Engineer",
    category: "Graduate",
    description: "Entry-level software development and engineering programs",
    skills: ["Programming", "Algorithms", "Git"]
  },
  {
    title: "QA Automation Intern",
    category: "Internship",
    description: "Automated testing, APIs and quality engineering",
    skills: ["Playwright", "Selenium", "API Testing"]
  },
  {
    title: "Data Analyst Intern",
    category: "Internship",
    description: "Data cleaning, visualisation and reporting",
    skills: ["SQL", "Python", "Power BI"]
  },
  {
    title: "Cybersecurity Intern",
    category: "Internship",
    description: "Security operations, testing and risk",
    skills: ["Networking", "Linux", "Security"]
  },
  {
    title: "Graduate Cloud Engineer",
    category: "Graduate",
    description: "Cloud platforms, infrastructure and deployment",
    skills: ["AWS", "Azure", "DevOps"]
  },
  {
    title: "Frontend Developer",
    category: "Entry-level",
    description: "Build accessible and responsive web products",
    skills: ["HTML", "CSS", "React"]
  },
  {
    title: "IT Support Analyst",
    category: "Part-time",
    description: "Support users, systems and technical operations",
    skills: ["Troubleshooting", "Windows", "Networking"]
  }
];

const locations = [
  {
    code: "AU",
    geoId: "101452733",
    label: "Australia",
    indeed: "https://au.indeed.com/jobs",
    linkedIn: "Australia",
    cities: ["All cities", "Melbourne", "Sydney", "Brisbane", "Perth", "Adelaide"]
  },
  {
    code: "IN",
    geoId: "102713980",
    label: "India",
    indeed: "https://in.indeed.com/jobs",
    linkedIn: "India",
    cities: ["All cities", "Bengaluru", "Hyderabad", "Pune", "Delhi", "Mumbai", "Chandigarh"]
  },
  {
    code: "US",
    geoId: "103644278",
    label: "United States",
    indeed: "https://www.indeed.com/jobs",
    linkedIn: "United States",
    cities: ["All cities", "New York", "San Francisco", "Seattle", "Austin"]
  },
  {
    code: "GB",
    geoId: "101165590",
    label: "United Kingdom",
    indeed: "https://uk.indeed.com/jobs",
    linkedIn: "United Kingdom",
    cities: ["All cities", "London", "Manchester", "Birmingham"]
  },
  {
    code: "CA",
    geoId: "101174742",
    label: "Canada",
    indeed: "https://ca.indeed.com/jobs",
    linkedIn: "Canada",
    cities: ["All cities", "Toronto", "Vancouver", "Montreal"]
  }
];

const savedKey = user =>
  `devdeakin-career-saves-${user?.id ?? user?._id ?? user?.email ?? "member"}`;

function readSaved(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function buildLinks(pathway, country, city) {
  const place = city === "All cities"
    ? country.label
    : `${city}, ${country.label}`;

  return {
    linkedin: `https://www.linkedin.com/jobs/search/?${new URLSearchParams({
      keywords: pathway.title,
      location: place,
      geoId: country.geoId
    }).toString()}`,

    indeed: `${country.indeed}?${new URLSearchParams({
      q: pathway.title,
      l: place
    }).toString()}`
  };
}

export default function Opportunities() {
  const { user } = useAuth();

  const paid = user?.plan === "paid" || user?.role === "admin";

  const [countryCode, setCountryCode] = useState("AU");
  const [city, setCity] = useState("All cities");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState("");
  const [onlyMatches, setOnlyMatches] = useState(false);
  const [saved, setSaved] = useState(() => readSaved(savedKey(user)));
  const [showSaved, setShowSaved] = useState(false);

  const country = locations.find(item => item.code === countryCode) || locations[0];

  const skillTokens = useMemo(
    () => skills
      .split(",")
      .map(skill => skill.trim().toLowerCase())
      .filter(Boolean),
    [skills]
  );

  const scored = useMemo(
    () => pathways.map(pathway => ({
      ...pathway,
      matches: pathway.skills.filter(skill =>
        skillTokens.some(token =>
          skill.toLowerCase().includes(token) ||
          token.includes(skill.toLowerCase())
        )
      ).length
    })),
    [skillTokens]
  );

  const results = scored
    .filter(pathway =>
      (category === "All" || pathway.category === category) &&
      `${pathway.title} ${pathway.description} ${pathway.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!showSaved || saved.includes(pathway.title)) &&
      (!paid || !onlyMatches || skillTokens.length === 0 || pathway.matches > 0)
    )
    .sort((a, b) =>
      paid && skillTokens.length ? b.matches - a.matches : 0
    );

  const toggleSave = title => {
    const next = saved.includes(title)
      ? saved.filter(item => item !== title)
      : [...saved, title];

    setSaved(next);
    localStorage.setItem(savedKey(user), JSON.stringify(next));
  };

  const locationLabel = city === "All cities"
    ? country.label
    : `${city}, ${country.label}`;

  return (
    <>
      <Header />

      <main className="opportunities-page">
        <section className="opportunities-hero">
          <p className="opportunities-eyebrow">
            DEV@DEAKIN · CAREERS & INTERNSHIPS
          </p>

          <h1>Explore your next opportunity</h1>

          <p className="opportunities-hero-description">
            Discover technology career paths, find the skills that matter, and explore
            relevant roles across global job platforms.
          </p>

          <p className="opportunities-membership">
            {paid
              ? "Paid member · Career tools unlocked"
              : "Free member · Upgrade for saved pathways and skill matching"}
          </p>
        </section>

        <section className="opportunities-discovery">
          <div className="opportunities-section-header">
            <span className="opportunities-section-kicker">EXPLORE YOUR OPTIONS</span>
            <h2>Find a pathway that fits your goals</h2>
            <p className="opportunities-section-intro">
              Browse technology career paths and refine them by specialty, experience level,
              and location. Each pathway links to external job searches.
            </p>
          </div>

          <div className="opportunities-filters">
            <label>
              Keyword
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g. software, data, testing"
              />
            </label>

            <label>
              Type
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>Internship</option>
                <option>Graduate</option>
                <option>Entry-level</option>
                <option>Part-time</option>
              </select>
            </label>

            <label>
              Country
              <select
                value={countryCode}
                onChange={e => {
                  setCountryCode(e.target.value);
                  setCity("All cities");
                }}
              >
                {locations.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              City
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
              >
                {country.cities.map(city => (
                  <option key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="opportunities-location">
            <span>Job search location: <strong>{locationLabel}</strong></span>
            <span aria-hidden="true">·</span>
            <a
              href={buildLinks({
                title: query.trim() || "software internship"
              }, country, city).linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse roles on LinkedIn ↗
            </a>
          </p>

          <p className="opportunities-results-count" aria-live="polite">
            Showing {results.length} {results.length === 1 ? "career pathway" : "career pathways"}
          </p>

          <div className="opportunities-grid">
            {results.map(role => {
              const links = buildLinks(role, country, city);

              return (
                <article className="opportunity-card" key={role.title}>
                  <span className="opportunity-tag">
                    {role.category}
                  </span>

                  <h3>{role.title}</h3>

                  <p>{role.description}</p>

                  <div className="opportunity-skills">
                    {role.skills.map(skill => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {paid && skillTokens.length > 0 && (
                    <p className="opportunities-match">
                      {role.matches} of {role.skills.length} skills matched
                    </p>
                  )}

                  <div className="opportunity-actions">
                    <a
                      href={links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn jobs ↗
                    </a>

                    <a
                      href={links.indeed}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Indeed jobs ↗
                    </a>
                  </div>

                  {paid && (
                    <button
                      type="button"
                      className="opportunity-save"
                      aria-pressed={saved.includes(role.title)}
                      onClick={() => toggleSave(role.title)}
                    >
                      {saved.includes(role.title)
                        ? "★ Saved"
                        : "☆ Save pathway"}
                    </button>
                  )}
                </article>
              );
            })}

            {results.length === 0 && (
              <p className="opportunities-empty">
                No pathways match your current filters. Try a broader keyword or select another role type.
              </p>
            )}
          </div>

          <p className="opportunities-disclaimer">
            Note: These are career pathway guides, not verified live vacancies.
            LinkedIn and Indeed apply their own search and location settings.
          </p>
        </section>

        <section className="opportunities-premium">
          <span className="opportunities-toolkit-status">
            {paid ? "PAID MEMBERSHIP ACTIVE" : "PREMIUM FEATURE"}
          </span>
          <h2>Make your next move with confidence</h2>

          {paid ? (
            <>
              <p>
                Save the roles that interest you and compare the skills employers commonly seek
                with the skills you already have.
              </p>

              <div className="opportunities-tools">
                <label>
                  Skills you already have
                  <input
                    value={skills}
                    onChange={e => setSkills(e.target.value)}
                    placeholder="React, Python, SQL"
                  />
                </label>

                <label className="opportunity-check">
                  <input
                    type="checkbox"
                    checked={onlyMatches}
                    onChange={e => setOnlyMatches(e.target.checked)}
                  />
                  Show matching pathways
                </label>

                <label className="opportunity-check">
                  <input
                    type="checkbox"
                    checked={showSaved}
                    onChange={e => setShowSaved(e.target.checked)}
                  />
                  Saved only ({saved.length})
                </label>
              </div>

              <p className="opportunities-hint">
                Skill matching uses keyword comparisons, not AI assessment.
                Saved pathways are stored in this browser only.
              </p>
            </>
          ) : (
            <>
              <p>
                Unlock saved career pathways and skill comparison tools to help
                organise your next steps.
              </p>

              <Link className="opportunity-upgrade" to="/pricing">
                Explore Paid plan
              </Link>
            </>
          )}
        </section>

        <section className="opportunities-resources">
          <div className="opportunities-section-header">
            <span className="opportunities-section-kicker">EXPLORE FURTHER</span>
            <h2>Resources for your career journey</h2>
            <p className="opportunities-section-intro">
              Explore trusted platforms for career advice, internships and graduate opportunities.
            </p>
          </div>

          <div className="resource-grid">
            <a
              href="https://www.deakin.edu.au/students/careers-and-graduation/careers-and-employability"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Deakin careers & employability</strong>
              <span>
                Official university careers and employability resources ↗
              </span>
            </a>

            <a
              href={buildLinks({
                title: "internship"
              }, country, city).linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>LinkedIn</strong>
              <span>
                Search internships in {locationLabel} ↗
              </span>
            </a>

            <a
              href={buildLinks({
                title: "internship"
              }, country, city).indeed}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Indeed</strong>
              <span>
                Search internships in {locationLabel} ↗
              </span>
            </a>
          </div>

          <div className="opportunities-community-cta">
            <p>Have a career insight or project experience worth sharing?</p>
            <Link to="/post">Share with the community ↗</Link>
          </div>
        </section>
      </main>

      <Footer className="careers-footer" />
    </>
  );
}

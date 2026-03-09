import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const SERVICES = [
  {
    icon: "⬡",
    title: "UI/UX Design",
    desc: "Crafting intuitive interfaces that users love — from wireframes to pixel-perfect designs.",
  },
  {
    icon: "◈",
    title: "Frontend Development",
    desc: "Building blazing-fast, responsive web apps with React, Next.js & modern CSS.",
  },
  {
    icon: "◉",
    title: "Backend & APIs",
    desc: "Robust Node.js services, REST & GraphQL APIs that scale with your product.",
  },
  {
    icon: "⬟",
    title: "Brand Identity",
    desc: "Logo systems, color palettes, and visual languages that make you unforgettable.",
  },
];

const PORTFOLIO_ITEMS = [
  { tag: "Web App", title: "Fintrack Dashboard", year: "2024", color: "#00c2ff" },
  { tag: "Mobile", title: "Pulse Health App", year: "2024", color: "#b97cff" },
  { tag: "Branding", title: "Neon Studio Identity", year: "2023", color: "#00ffc2" },
  { tag: "Web App", title: "Orbit SaaS Platform", year: "2023", color: "#ff6b6b" },
  { tag: "E-commerce", title: "Luxe Fashion Store", year: "2023", color: "#ffd166" },
  { tag: "Portfolio", title: "Photographer Site", year: "2022", color: "#06d6a0" },
];

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "120+", label: "Projects Done" },
  { value: "80+", label: "Happy Clients" },
  { value: "15+", label: "Awards Won" },
];

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [typed, setTyped] = useState("");
  const roles = ["Frontend Developer", "UI/UX Designer", "React Specialist", "Creative Coder"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const type = () => {
      const current = roles[roleRef.current];
      if (!deletingRef.current) {
        setTyped(current.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) {
          deletingRef.current = true;
          setTimeout(type, 1400);
          return;
        }
      } else {
        setTyped(current.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
      setTimeout(type, deletingRef.current ? 55 : 90);
    };
    const t = setTimeout(type, 600);
    return () => clearTimeout(t);
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.root}>
      {/* Animated background */}
      <div style={styles.bgGrid} />
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      {/* NAV */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <span style={styles.logo}>
            <span style={styles.logoDot}>J</span>acob.
          </span>
          <div style={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                style={{
                  ...styles.navLink,
                  ...(activeNav === link ? styles.navLinkActive : {}),
                }}
              >
                {link}
                {activeNav === link && <span style={styles.navUnderline} />}
              </button>
            ))}
          </div>
          <button style={styles.ctaBtn} onClick={() => scrollToSection("Contact")}>
            Hire Me
          </button>
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar1Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar2Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar3Open : {}) }} />
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {NAV_LINKS.map((link) => (
              <button key={link} style={styles.mobileLink} onClick={() => scrollToSection(link)}>
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroGreeting}>
            <span style={styles.greetingLine} /> Hello, I'm
          </p>
          <h1 style={styles.heroName}>Jacob Aiden</h1>
          <h2 style={styles.heroRole}>
            <span style={styles.accent}>{typed}</span>
            <span style={styles.cursor}>|</span>
          </h2>
          <p style={styles.heroDesc}>
            I build exceptional digital experiences that live at the intersection of design and engineering.
            Passionate about clean code, bold interfaces, and products that make a difference.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.primaryBtn} onClick={() => scrollToSection("Portfolio")}>
              View Work
            </button>
            <button style={styles.outlineBtn} onClick={() => scrollToSection("Contact")}>
              Let's Talk
            </button>
          </div>
          <div style={styles.socialRow}>
            {["in", "gh", "tw", "dr"].map((s) => (
              <a key={s} href="#" style={styles.socialIcon}>
                {s === "in" ? "𝗶𝗻" : s === "gh" ? "◎" : s === "tw" ? "𝕏" : "⬡"}
              </a>
            ))}
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.photoRing}>
            <div style={styles.photoRingInner}>
              <div style={styles.photoPlaceholder}>
                <div style={styles.silhouette}>
                  <div style={styles.silHead} />
                  <div style={styles.silBody} />
                </div>
                <div style={styles.photoOverlay} />
              </div>
            </div>
          </div>
          <div style={styles.floatBadge1}>
            <span style={styles.badgeNum}>5+</span>
            <span style={styles.badgeLabel}>Yrs Exp.</span>
          </div>
          <div style={styles.floatBadge2}>
            <span style={styles.badgeNum}>120+</span>
            <span style={styles.badgeLabel}>Projects</span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={styles.statsStrip}>
        {STATS.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" style={styles.section}>
        <div style={styles.sectionLabel}>
          <span style={styles.labelLine} />
          <span style={styles.labelText}>Who I Am</span>
        </div>
        <h2 style={styles.sectionTitle}>
          About <span style={styles.accent}>Me</span>
        </h2>
        <div style={styles.aboutGrid}>
          <div style={styles.aboutLeft}>
            <p style={styles.aboutText}>
              I'm a frontend developer and designer with over 5 years of experience building products for startups
              and enterprise teams. I specialize in turning complex problems into elegant, performant interfaces.
            </p>
            <p style={styles.aboutText}>
              My approach combines technical rigor with strong design sensibility. I care deeply about the
              details — from micro-animations to accessibility — because great products are built in the details.
            </p>
            <div style={styles.skillsGrid}>
              {["React", "TypeScript", "Next.js", "Node.js", "Figma", "TailwindCSS", "GraphQL", "AWS"].map((sk) => (
                <span key={sk} style={styles.skillChip}>{sk}</span>
              ))}
            </div>
          </div>
          <div style={styles.aboutRight}>
            {[
              { label: "Frontend Development", pct: 94 },
              { label: "UI/UX Design", pct: 88 },
              { label: "Backend / APIs", pct: 75 },
              { label: "Mobile (React Native)", pct: 70 },
            ].map((bar) => (
              <div key={bar.label} style={styles.skillBarWrap}>
                <div style={styles.skillBarHeader}>
                  <span style={styles.skillBarLabel}>{bar.label}</span>
                  <span style={styles.skillBarPct}>{bar.pct}%</span>
                </div>
                <div style={styles.skillBarBg}>
                  <div style={{ ...styles.skillBarFill, width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={styles.sectionLabel}>
          <span style={styles.labelLine} />
          <span style={styles.labelText}>What I Do</span>
        </div>
        <h2 style={styles.sectionTitle}>
          My <span style={styles.accent}>Services</span>
        </h2>
        <div style={styles.servicesGrid}>
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              style={styles.serviceCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00c2ff";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,194,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={styles.serviceIcon}>{svc.icon}</span>
              <h3 style={styles.serviceTitle}>{svc.title}</h3>
              <p style={styles.serviceDesc}>{svc.desc}</p>
              <span style={styles.serviceArrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={styles.section}>
        <div style={styles.sectionLabel}>
          <span style={styles.labelLine} />
          <span style={styles.labelText}>My Work</span>
        </div>
        <h2 style={styles.sectionTitle}>
          Recent <span style={styles.accent}>Projects</span>
        </h2>
        <div style={styles.portfolioGrid}>
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                ...styles.portfolioCard,
                ...(hoveredProject === i ? { ...styles.portfolioCardHover, borderColor: item.color } : {}),
              }}
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div style={{ ...styles.portfolioThumb, background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)` }}>
                <span style={{ ...styles.portfolioThumbIcon, color: item.color }}>◈</span>
              </div>
              <div style={styles.portfolioInfo}>
                <span style={{ ...styles.portfolioTag, color: item.color, borderColor: item.color }}>
                  {item.tag}
                </span>
                <h3 style={styles.portfolioTitle}>{item.title}</h3>
                <span style={styles.portfolioYear}>{item.year}</span>
              </div>
              <span style={{ ...styles.portfolioArrow, color: item.color }}>↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={styles.sectionLabel}>
          <span style={styles.labelLine} />
          <span style={styles.labelText}>Get In Touch</span>
        </div>
        <h2 style={styles.sectionTitle}>
          Let's <span style={styles.accent}>Connect</span>
        </h2>
        <div style={styles.contactGrid}>
          <div style={styles.contactLeft}>
            <p style={styles.contactDesc}>
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities,
              creative ideas, or how we can work together.
            </p>
            <div style={styles.contactInfo}>
              {[
                { icon: "✉", label: "Email", val: "jacob@example.com" },
                { icon: "◎", label: "Location", val: "San Francisco, CA" },
                { icon: "☎", label: "Phone", val: "+1 (555) 000-0000" },
              ].map((c) => (
                <div key={c.label} style={styles.contactRow}>
                  <span style={styles.contactIcon}>{c.icon}</span>
                  <div>
                    <span style={styles.contactLabel}>{c.label}</span>
                    <span style={styles.contactVal}>{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form style={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.formRow}>
              <input placeholder="Your Name" style={styles.input} />
              <input placeholder="Your Email" style={styles.input} />
            </div>
            <input placeholder="Subject" style={{ ...styles.input, width: "100%" }} />
            <textarea placeholder="Your Message..." style={styles.textarea} rows={5} />
            <button type="submit" style={styles.submitBtn}>
              Send Message →
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.logo}>
          <span style={styles.logoDot}>J</span>acob.
        </span>
        <p style={styles.footerText}>© 2024 Jacob Aiden. Designed & Built with ♥</p>
        <div style={styles.footerLinks}>
          {NAV_LINKS.map((l) => (
            <button key={l} style={styles.footerLink} onClick={() => scrollToSection(l)}>
              {l}
            </button>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060a12; }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.12); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bar-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#060a12",
    color: "#e8ecf4",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,194,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,194,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGlow1: {
    position: "fixed",
    top: "-20%",
    right: "-10%",
    width: "60vw",
    height: "60vw",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,194,255,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
    animation: "glow-pulse 5s ease-in-out infinite",
  },
  bgGlow2: {
    position: "fixed",
    bottom: "10%",
    left: "-15%",
    width: "50vw",
    height: "50vw",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(185,124,255,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  // NAV
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "20px 0",
    transition: "all 0.3s ease",
  },
  navScrolled: {
    background: "rgba(6,10,18,0.92)",
    backdropFilter: "blur(20px)",
    padding: "12px 0",
    borderBottom: "1px solid rgba(0,194,255,0.1)",
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "1.6rem",
    fontWeight: 800,
    color: "#e8ecf4",
    marginRight: "auto",
    letterSpacing: "-0.02em",
  },
  logoDot: {
    color: "#00c2ff",
  },
  navLinks: {
    display: "flex",
    gap: "8px",
    "@media (max-width: 768px)": { display: "none" },
  },
  navLink: {
    background: "none",
    border: "none",
    color: "rgba(232,236,244,0.6)",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    cursor: "pointer",
    padding: "8px 14px",
    position: "relative",
    transition: "color 0.2s",
    letterSpacing: "0.02em",
  },
  navLinkActive: {
    color: "#e8ecf4",
  },
  navUnderline: {
    position: "absolute",
    bottom: 4,
    left: "50%",
    transform: "translateX(-50%)",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#00c2ff",
  },
  ctaBtn: {
    background: "linear-gradient(135deg, #00c2ff, #0080ff)",
    border: "none",
    color: "#fff",
    fontSize: "0.85rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    padding: "10px 22px",
    borderRadius: "6px",
    letterSpacing: "0.04em",
    transition: "opacity 0.2s",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "2px",
    background: "#e8ecf4",
    borderRadius: "2px",
    transition: "all 0.3s",
  },
  bar1Open: { transform: "rotate(45deg) translate(5px, 5px)" },
  bar2Open: { opacity: 0 },
  bar3Open: { transform: "rotate(-45deg) translate(5px, -5px)" },
  mobileMenu: {
    background: "rgba(6,10,18,0.98)",
    padding: "16px 32px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  mobileLink: {
    background: "none",
    border: "none",
    color: "rgba(232,236,244,0.8)",
    fontSize: "1rem",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    padding: "12px 0",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },

  // HERO
  hero: {
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "120px 32px 80px",
    display: "flex",
    alignItems: "center",
    gap: "80px",
    position: "relative",
    zIndex: 1,
  },
  heroContent: {
    flex: 1,
    maxWidth: "580px",
  },
  heroGreeting: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.9rem",
    color: "rgba(232,236,244,0.5)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  greetingLine: {
    display: "inline-block",
    width: "32px",
    height: "1px",
    background: "#00c2ff",
  },
  heroName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(2.8rem, 6vw, 5rem)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    marginBottom: "12px",
    background: "linear-gradient(135deg, #e8ecf4 0%, rgba(232,236,244,0.7) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroRole: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    fontWeight: 600,
    marginBottom: "24px",
    minHeight: "2.4rem",
  },
  accent: {
    color: "#00c2ff",
  },
  cursor: {
    color: "#00c2ff",
    animation: "blink 1s step-end infinite",
    marginLeft: "2px",
  },
  heroDesc: {
    fontSize: "1rem",
    lineHeight: 1.75,
    color: "rgba(232,236,244,0.55)",
    marginBottom: "36px",
    maxWidth: "460px",
  },
  heroBtns: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #00c2ff, #0070e0)",
    border: "none",
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    padding: "14px 32px",
    borderRadius: "8px",
    letterSpacing: "0.03em",
    boxShadow: "0 8px 32px rgba(0,194,255,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  outlineBtn: {
    background: "transparent",
    border: "1px solid rgba(0,194,255,0.4)",
    color: "#00c2ff",
    fontSize: "0.95rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    padding: "14px 32px",
    borderRadius: "8px",
    letterSpacing: "0.03em",
    transition: "all 0.2s",
  },
  socialRow: {
    display: "flex",
    gap: "12px",
  },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(232,236,244,0.5)",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "all 0.2s",
    fontStyle: "normal",
  },

  // HERO VISUAL
  heroVisual: {
    flex: "0 0 auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "float 6s ease-in-out infinite",
  },
  photoRing: {
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background: "conic-gradient(from 0deg, #00c2ff, #0040ff, #b97cff, #00c2ff)",
    padding: "3px",
    position: "relative",
    animation: "spin-slow 12s linear infinite",
    boxShadow: "0 0 60px rgba(0,194,255,0.2)",
  },
  photoRingInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#0d1220",
    overflow: "hidden",
    animation: "spin-slow 12s linear infinite reverse",
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "linear-gradient(160deg, #0d1a2e 0%, #06101c 100%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  silhouette: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: "0",
  },
  silHead: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(160deg, #1a2a40, #0f1e30)",
    marginBottom: "4px",
    boxShadow: "0 0 20px rgba(0,194,255,0.2)",
  },
  silBody: {
    width: "160px",
    height: "130px",
    background: "linear-gradient(160deg, #152030, #0a1520)",
    borderRadius: "80px 80px 0 0",
    boxShadow: "0 0 30px rgba(0,194,255,0.15)",
  },
  photoOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,194,255,0.08), transparent 60%)",
    borderRadius: "50%",
  },
  floatBadge1: {
    position: "absolute",
    top: "20px",
    left: "-30px",
    background: "rgba(6,10,18,0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(0,194,255,0.2)",
    borderRadius: "12px",
    padding: "12px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 5s ease-in-out infinite",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  floatBadge2: {
    position: "absolute",
    bottom: "30px",
    right: "-30px",
    background: "rgba(6,10,18,0.9)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(185,124,255,0.2)",
    borderRadius: "12px",
    padding: "12px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 7s ease-in-out infinite",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  badgeNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#00c2ff",
    lineHeight: 1,
  },
  badgeLabel: {
    fontSize: "0.7rem",
    color: "rgba(232,236,244,0.5)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginTop: "3px",
  },

  // STATS
  statsStrip: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  statItem: {
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(13,18,32,0.6)",
    gap: "6px",
  },
  statValue: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "2.4rem",
    fontWeight: 800,
    color: "#00c2ff",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "rgba(232,236,244,0.45)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  // SECTIONS
  section: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 32px",
  },
  sectionAlt: {
    maxWidth: "100%",
    background: "rgba(13,18,32,0.5)",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  labelLine: {
    display: "inline-block",
    width: "28px",
    height: "1px",
    background: "#00c2ff",
  },
  labelText: {
    fontSize: "0.8rem",
    color: "#00c2ff",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    marginBottom: "56px",
    lineHeight: 1.1,
  },

  // ABOUT
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "64px",
    alignItems: "start",
  },
  aboutLeft: {},
  aboutText: {
    fontSize: "0.98rem",
    lineHeight: 1.8,
    color: "rgba(232,236,244,0.6)",
    marginBottom: "20px",
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "28px",
  },
  skillChip: {
    fontSize: "0.8rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    color: "#00c2ff",
    border: "1px solid rgba(0,194,255,0.25)",
    borderRadius: "6px",
    padding: "5px 14px",
    letterSpacing: "0.04em",
    background: "rgba(0,194,255,0.05)",
  },
  aboutRight: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  skillBarWrap: {},
  skillBarHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  skillBarLabel: {
    fontSize: "0.9rem",
    color: "rgba(232,236,244,0.7)",
  },
  skillBarPct: {
    fontSize: "0.85rem",
    color: "#00c2ff",
    fontWeight: 600,
  },
  skillBarBg: {
    height: "4px",
    borderRadius: "4px",
    background: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  skillBarFill: {
    height: "100%",
    borderRadius: "4px",
    background: "linear-gradient(90deg, #00c2ff, #0060ff)",
    boxShadow: "0 0 12px rgba(0,194,255,0.5)",
    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
  },

  // SERVICES
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px",
  },
  serviceCard: {
    background: "rgba(13,18,32,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "36px 32px",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  serviceIcon: {
    display: "block",
    fontSize: "1.8rem",
    color: "#00c2ff",
    marginBottom: "20px",
  },
  serviceTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "#e8ecf4",
  },
  serviceDesc: {
    fontSize: "0.9rem",
    lineHeight: 1.7,
    color: "rgba(232,236,244,0.5)",
    marginBottom: "20px",
  },
  serviceArrow: {
    fontSize: "1.2rem",
    color: "rgba(0,194,255,0.5)",
  },

  // PORTFOLIO
  portfolioGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  portfolioCard: {
    background: "rgba(13,18,32,0.6)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
  },
  portfolioCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  },
  portfolioThumb: {
    height: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  portfolioThumbIcon: {
    fontSize: "3rem",
    opacity: 0.6,
  },
  portfolioInfo: {
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  portfolioTag: {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    border: "1px solid",
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "4px",
    width: "fit-content",
    background: "rgba(255,255,255,0.03)",
  },
  portfolioTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#e8ecf4",
    marginTop: "4px",
  },
  portfolioYear: {
    fontSize: "0.8rem",
    color: "rgba(232,236,244,0.35)",
  },
  portfolioArrow: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "1.1rem",
    opacity: 0.6,
  },

  // CONTACT
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "64px",
    alignItems: "start",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 32px",
  },
  contactLeft: {},
  contactDesc: {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: "rgba(232,236,244,0.55)",
    marginBottom: "36px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  contactIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "rgba(0,194,255,0.08)",
    border: "1px solid rgba(0,194,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
  },
  contactLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "rgba(232,236,244,0.4)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "2px",
  },
  contactVal: {
    display: "block",
    fontSize: "0.9rem",
    color: "rgba(232,236,244,0.8)",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  input: {
    background: "rgba(13,18,32,0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#e8ecf4",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "14px 18px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
  },
  textarea: {
    background: "rgba(13,18,32,0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "#e8ecf4",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "14px 18px",
    outline: "none",
    resize: "vertical",
    width: "100%",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #00c2ff, #0060ff)",
    border: "none",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "15px 32px",
    borderRadius: "10px",
    letterSpacing: "0.04em",
    boxShadow: "0 8px 32px rgba(0,194,255,0.25)",
    transition: "transform 0.2s, box-shadow 0.2s",
    alignSelf: "flex-start",
  },

  // FOOTER
  footer: {
    position: "relative",
    zIndex: 1,
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "40px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerText: {
    fontSize: "0.85rem",
    color: "rgba(232,236,244,0.35)",
  },
  footerLinks: {
    display: "flex",
    gap: "4px",
  },
  footerLink: {
    background: "none",
    border: "none",
    color: "rgba(232,236,244,0.4)",
    fontSize: "0.82rem",
    cursor: "pointer",
    padding: "4px 10px",
    fontFamily: "'DM Sans', sans-serif",
    transition: "color 0.2s",
  },
};

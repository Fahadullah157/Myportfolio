import fahadPhoto from "./fahad.jpg";
import { useState, useEffect, useRef } from "react";

// ── EmailJS Config
const EMAILJS_SERVICE_ID = "service_mho56fa";
const EMAILJS_TEMPLATE_ID = "template_w5bvafs";
const EMAILJS_PUBLIC_KEY = "e0cqwnsdHYkggT0NH";

// ── Design Tokens
const C = {
  bg: "#070b14",
  bgCard: "#0d1526",
  bgAlt: "#0a1020",
  navy: "#0f1e3c",
  navyLight: "#162444",
  gold: "#c9a84c",
  goldLight: "#e4c068",
  goldGlow: "rgba(201,168,76,0.15)",
  white: "#f0f4ff",
  textMid: "rgba(240,244,255,0.6)",
  textFaint: "rgba(240,244,255,0.35)",
  border: "rgba(201,168,76,0.12)",
  borderHov: "rgba(201,168,76,0.45)",
};

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const SERVICES = [
  {
    icon: "✦",
    title: "UI/UX Design",
    desc: "Crafting intuitive, pixel-perfect interfaces from wireframes to polished final designs.",
  },
  {
    icon: "⬡",
    title: "Frontend Development",
    desc: "Building fast, responsive web apps with React.js and modern JavaScript.",
  },
  {
    icon: "◈",
    title: "Component Architecture",
    desc: "Scalable, reusable component systems following industry best practices.",
  },
  {
    icon: "⬟",
    title: "Performance & QA",
    desc: "Optimising load times, accessibility, and cross-browser compatibility.",
  },
];

const PORTFOLIO_ITEMS = [
  {
    tag: "React.js",
    title: "Dairy Ease",
    year: "2025",
    desc: "Full dairy management system",
  },
  {
    tag: "React.js",
    title: "eCommerce Frontend",
    year: "2026",
    desc: "Amazon-style shopping UI",
  },
  {
    tag: "React.js",
    title: "Portfolio Website",
    year: "2026",
    desc: "Animated personal portfolio",
  },
];

const STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "3+", label: "Projects Built" },
  { value: "100%", label: "Dedication" },
  { value: "3", label: "Certifications" },
];

const SKILLS = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Git",
  "GitHub",
  "Figma",
  "VS Code",
  "Microsoft 365",
];

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [typed, setTyped] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  const roles = ["Frontend Developer", "React.js Developer", "UI/UX Designer"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const cur = roles[roleRef.current];
      if (!deletingRef.current) {
        setTyped(cur.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === cur.length) {
          deletingRef.current = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        setTyped(cur.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
      setTimeout(tick, deletingRef.current ? 48 : 85);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    setActiveNav(id);
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill required fields!");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || "Portfolio message",
            message: formData.message,
          },
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 4000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div style={s.root}>
      {/* BG LAYERS */}
      <div style={s.bgGrid} />
      <div style={s.bgGlow1} />
      <div style={s.bgGlow2} />

      {/* ── NAV ── */}
      <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
        <div style={s.navInner}>
          <span style={s.logo}>
            F<span style={s.logoGold}>.</span>
          </span>
          <div style={s.navLinks}>
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  ...s.navLink,
                  ...(activeNav === l ? s.navActive : {}),
                }}
              >
                {l}
                {activeNav === l && <span style={s.navDot} />}
              </button>
            ))}
          </div>
          <button style={s.hireBtn} onClick={() => scrollTo("Contact")}>
            Hire Me
          </button>
          <button style={s.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ ...s.bar, ...(menuOpen ? s.b1 : {}) }} />
            <span style={{ ...s.bar, ...(menuOpen ? s.b2 : {}) }} />
            <span style={{ ...s.bar, ...(menuOpen ? s.b3 : {}) }} />
          </button>
        </div>
        {menuOpen && (
          <div style={s.mobileMenu}>
            {NAV_LINKS.map((l) => (
              <button key={l} style={s.mobileLink} onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={s.hero}>
        <div style={s.heroLeft}>
          <p style={s.greeting}>
            <span style={s.greetLine} /> Hello, I'm
          </p>
          <h1 style={s.heroName}>
            Fahad
            <br />
            Ullah
          </h1>
          <h2 style={s.heroRole}>
            <span style={s.goldText}>{typed}</span>
            <span style={s.cursor}>|</span>
          </h2>
          <p style={s.heroDesc}>
            Computer Science graduate passionate about building beautiful,
            responsive web applications. Currently interning at DevelopersHub
            Corporation — open to opportunities in{" "}
            <strong style={{ color: C.goldLight }}>UAE 🇦🇪</strong>
          </p>
          <div style={s.heroBtns}>
            <button style={s.primaryBtn} onClick={() => scrollTo("Portfolio")}>
              View My Work
            </button>
            <button style={s.outlineBtn} onClick={() => scrollTo("Contact")}>
              Let's Talk
            </button>
          </div>
          <div style={s.socialRow}>
            {[
              { label: "LI", href: "https://linkedin.com/in/fahadullah-dev" },
              { label: "GH", href: "https://github.com/Fahadullah157" },
              { label: "✉", href: "mailto:fahadullah0065@gmail.com" },
            ].map((sc) => (
              <a
                key={sc.label}
                href={sc.href}
                target="_blank"
                rel="noreferrer"
                style={s.socialIcon}
              >
                {sc.label}
              </a>
            ))}
          </div>
        </div>

        <div style={s.heroRight}>
          <div style={s.photoOuter}>
            <div style={s.photoRing}>
              <div style={s.photoInner}>
                <img
                  src={fahadPhoto}
                  alt="Fahad Ullah"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>
            </div>
            <div style={s.badge1}>
              <span style={s.badgeVal}>CS</span>
              <span style={s.badgeLbl}>Graduate</span>
            </div>
            <div style={s.badge2}>
              <span style={s.badgeVal}>UAE</span>
              <span style={s.badgeLbl}>Ready 🇦🇪</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={s.statsBar}>
        {STATS.map((st, i) => (
          <div key={i} style={s.statItem}>
            <span style={s.statVal}>{st.value}</span>
            <span style={s.statLbl}>{st.label}</span>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={s.section}>
        <div style={s.secLabel}>
          <span style={s.secLine} />
          <span style={s.secLabelTxt}>Who I Am</span>
        </div>
        <h2 style={s.secTitle}>
          About <span style={s.goldText}>Me</span>
        </h2>
        <div style={s.aboutGrid}>
          <div>
            <p style={s.bodyTxt}>
              I'm a Computer Science graduate from the University of Gujrat,
              Pakistan, currently completing a frontend development internship
              at DevelopersHub Corporation. I specialise in building responsive,
              scalable web applications using React.js and modern JavaScript.
            </p>
            <p style={{ ...s.bodyTxt, marginTop: 14 }}>
              I hold certifications from{" "}
              <strong style={{ color: C.goldLight }}>Coursera</strong> and{" "}
              <strong style={{ color: C.goldLight }}>
                Cisco Networking Academy
              </strong>
              , and I am actively pursuing Microsoft Azure knowledge to expand
              into cloud technologies. My goal is to bring my skills to the UAE
              tech market. 🇦🇪
            </p>
            <div style={s.skillsWrap}>
              {SKILLS.map((sk) => (
                <span key={sk} style={s.skillChip}>
                  {sk}
                </span>
              ))}
            </div>
          </div>
          <div style={s.barsCol}>
            {[
              { label: "React.js / JavaScript", pct: 80 },
              { label: "HTML5 & CSS3", pct: 92 },
              { label: "UI/UX & Figma", pct: 75 },
              { label: "Git & GitHub", pct: 78 },
            ].map((b) => (
              <div key={b.label} style={s.barWrap}>
                <div style={s.barHead}>
                  <span style={s.barLabel}>{b.label}</span>
                  <span style={s.barPct}>{b.pct}%</span>
                </div>
                <div style={s.barBg}>
                  <div style={{ ...s.barFill, width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ ...s.section, ...s.altSection }}>
        <div style={s.secLabel}>
          <span style={s.secLine} />
          <span style={s.secLabelTxt}>What I Do</span>
        </div>
        <h2
          style={{
            ...s.secTitle,
            maxWidth: 1200,
            margin: "0 auto 48px",
            padding: "0 32px",
          }}
        >
          My <span style={s.goldText}>Services</span>
        </h2>
        <div style={s.svcGrid}>
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              style={s.svcCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.gold;
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 24px 60px ${C.goldGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={s.svcIcon}>{svc.icon}</span>
              <h3 style={s.svcTitle}>{svc.title}</h3>
              <p style={s.svcDesc}>{svc.desc}</p>
              <span style={s.svcArrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={s.section}>
        <div style={s.secLabel}>
          <span style={s.secLine} />
          <span style={s.secLabelTxt}>My Work</span>
        </div>
        <h2 style={s.secTitle}>
          Recent <span style={s.goldText}>Projects</span>
        </h2>
        <div style={s.projGrid}>
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{ ...s.projCard, ...(hovered === i ? s.projCardHov : {}) }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={s.projThumb}>
                <span style={s.projThumbIcon}>⬡</span>
                <div style={s.projOverlay} />
              </div>
              <div style={s.projBody}>
                <span style={s.projTag}>{item.tag}</span>
                <h3 style={s.projTitle}>{item.title}</h3>
                <p style={s.projDesc}>{item.desc}</p>
                <div style={s.projFooter}>
                  <span style={s.projYear}>{item.year}</span>
                  <a
                    href="https://github.com/Fahadullah157"
                    target="_blank"
                    rel="noreferrer"
                    style={s.projLink}
                  >
                    View on GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...s.section, ...s.altSection }}>
        <div style={s.secLabel}>
          <span style={s.secLine} />
          <span style={s.secLabelTxt}>Get In Touch</span>
        </div>
        <h2
          style={{
            ...s.secTitle,
            maxWidth: 1200,
            margin: "0 auto 48px",
            padding: "0 32px",
          }}
        >
          Let's <span style={s.goldText}>Connect</span>
        </h2>
        <div style={s.contactGrid}>
          <div style={s.contactLeft}>
            <p style={s.bodyTxt}>
              Have an opportunity or just want to say hi? I am always open to
              discussing new roles, creative ideas, or how we can work together
              — especially in UAE! 🇦🇪
            </p>
            <div style={s.contactInfoList}>
              {[
                { icon: "✉", label: "Email", val: "fahadullah0065@gmail.com" },
                {
                  icon: "📍",
                  label: "Location",
                  val: "Gujrat, Pakistan → UAE",
                },
                { icon: "📞", label: "Phone", val: "+92 303 6820412" },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  val: "linkedin.com/in/fahadullah-dev",
                },
              ].map((c) => (
                <div key={c.label} style={s.cRow}>
                  <div style={s.cIcon}>{c.icon}</div>
                  <div>
                    <span style={s.cLabel}>{c.label}</span>
                    <span style={s.cVal}>{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form style={s.form} onSubmit={handleSubmit}>
            <div style={s.formRow}>
              <input
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                style={s.input}
                required
              />
              <input
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                style={s.input}
                type="email"
                required
              />
            </div>
            <input
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              style={{ ...s.input, width: "100%" }}
            />
            <textarea
              name="message"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              style={s.textarea}
              rows={5}
              required
            />
            {formStatus === "success" && (
              <div style={s.successMsg}>
                ✅ Message sent! I will reply soon.
              </div>
            )}
            {formStatus === "error" && (
              <div style={s.errorMsg}>
                ❌ Failed to send. Please email me directly.
              </div>
            )}
            <button
              type="submit"
              style={{
                ...s.submitBtn,
                ...(formStatus === "sending"
                  ? { opacity: 0.65, cursor: "not-allowed" }
                  : {}),
              }}
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending... ⏳" : "Send Message →"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <span style={s.logo}>
            F<span style={s.logoGold}>.</span>
          </span>
          <p style={s.footerTxt}>© 2026 Fahad Ullah — Frontend Developer</p>
          <div style={s.footerLinks}>
            {NAV_LINKS.map((l) => (
              <button key={l} style={s.footerLink} onClick={() => scrollTo(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:${C.bg};}
        input,textarea,select{outline:none;}
        input::placeholder,textarea::placeholder{color:rgba(240,244,255,0.3);}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes goldPulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}

// ── STYLES ───────────────────────────────────────────────────────
const s = {
  root: {
    fontFamily: "'Outfit',sans-serif",
    background: C.bg,
    color: C.white,
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },

  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage: `linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,
    backgroundSize: "64px 64px",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgGlow1: {
    position: "fixed",
    top: "-15%",
    right: "-10%",
    width: "55vw",
    height: "55vw",
    borderRadius: "50%",
    background: `radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)`,
    pointerEvents: "none",
    zIndex: 0,
    animation: "goldPulse 6s ease-in-out infinite",
  },
  bgGlow2: {
    position: "fixed",
    bottom: "5%",
    left: "-15%",
    width: "45vw",
    height: "45vw",
    borderRadius: "50%",
    background: `radial-gradient(circle,rgba(15,30,60,0.8) 0%,transparent 70%)`,
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
    padding: "18px 0",
    transition: "all 0.3s",
  },
  navScrolled: {
    background: "rgba(7,11,20,0.95)",
    backdropFilter: "blur(20px)",
    padding: "10px 0",
    borderBottom: `1px solid ${C.border}`,
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  logo: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "2rem",
    fontWeight: 700,
    color: C.white,
    marginRight: "auto",
    letterSpacing: "-0.02em",
    cursor: "pointer",
  },
  logoGold: { color: C.gold },
  navLinks: { display: "flex", gap: 4 },
  navLink: {
    background: "none",
    border: "none",
    color: C.textMid,
    fontSize: "0.88rem",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 400,
    cursor: "pointer",
    padding: "8px 14px",
    position: "relative",
    transition: "color 0.2s",
    letterSpacing: "0.03em",
  },
  navActive: { color: C.white, fontWeight: 600 },
  navDot: {
    position: "absolute",
    bottom: 4,
    left: "50%",
    transform: "translateX(-50%)",
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: C.gold,
    display: "block",
  },
  hireBtn: {
    background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
    border: "none",
    color: C.bg,
    fontSize: "0.85rem",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    cursor: "pointer",
    padding: "10px 22px",
    borderRadius: "6px",
    letterSpacing: "0.04em",
    boxShadow: `0 4px 20px rgba(201,168,76,0.35)`,
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
  },
  bar: {
    display: "block",
    width: 22,
    height: 2,
    background: C.white,
    borderRadius: 2,
    transition: "all 0.3s",
  },
  b1: { transform: "rotate(45deg) translate(5px,5px)" },
  b2: { opacity: 0 },
  b3: { transform: "rotate(-45deg) translate(5px,-5px)" },
  mobileMenu: {
    background: "rgba(7,11,20,0.98)",
    padding: "12px 32px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mobileLink: {
    background: "none",
    border: "none",
    color: C.textMid,
    fontSize: "0.95rem",
    fontFamily: "'Outfit',sans-serif",
    cursor: "pointer",
    padding: "11px 0",
    textAlign: "left",
    borderBottom: `1px solid ${C.border}`,
  },

  // HERO
  hero: {
    minHeight: "100vh",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "120px 32px 80px",
    display: "flex",
    alignItems: "center",
    gap: 80,
    position: "relative",
    zIndex: 1,
  },
  heroLeft: { flex: 1, maxWidth: 560 },
  greeting: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: "0.8rem",
    color: C.textFaint,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  greetLine: {
    display: "inline-block",
    width: 28,
    height: 1,
    background: C.gold,
  },
  heroName: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "clamp(3rem,7vw,5.5rem)",
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    marginBottom: 14,
    background: `linear-gradient(135deg,${C.white} 0%,rgba(240,244,255,0.7) 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroRole: {
    fontFamily: "'Outfit',sans-serif",
    fontSize: "clamp(1.2rem,2.5vw,1.6rem)",
    fontWeight: 500,
    marginBottom: 22,
    minHeight: "2rem",
  },
  goldText: { color: C.gold },
  cursor: {
    color: C.gold,
    animation: "blink 1s step-end infinite",
    marginLeft: 2,
  },
  heroDesc: {
    fontSize: "0.98rem",
    lineHeight: 1.8,
    color: C.textMid,
    marginBottom: 36,
    maxWidth: 460,
  },
  heroBtns: { display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 },
  primaryBtn: {
    background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
    border: "none",
    color: C.bg,
    fontSize: "0.95rem",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    cursor: "pointer",
    padding: "14px 32px",
    borderRadius: "8px",
    letterSpacing: "0.04em",
    boxShadow: `0 8px 32px rgba(201,168,76,0.35)`,
    transition: "transform 0.2s,box-shadow 0.2s",
  },
  outlineBtn: {
    background: "transparent",
    border: `1px solid ${C.borderHov}`,
    color: C.gold,
    fontSize: "0.95rem",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    padding: "14px 32px",
    borderRadius: "8px",
    letterSpacing: "0.04em",
    transition: "all 0.2s",
  },
  socialRow: { display: "flex", gap: 10 },
  socialIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    color: C.textMid,
    fontSize: "0.8rem",
    textDecoration: "none",
    fontStyle: "normal",
    transition: "all 0.2s",
    background: "rgba(201,168,76,0.04)",
  },

  // HERO VISUAL
  heroRight: {
    flex: "0 0 auto",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "float 7s ease-in-out infinite",
  },
  photoOuter: { position: "relative" },
  photoRing: {
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: `conic-gradient(from 0deg,${C.gold},${C.navyLight},${C.goldLight},${C.gold})`,
    padding: 3,
    animation: "spin 14s linear infinite",
    boxShadow: `0 0 60px rgba(201,168,76,0.2)`,
  },
  photoInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: C.bgCard,
    overflow: "hidden",
    animation: "spin 14s linear infinite reverse",
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: `linear-gradient(160deg,${C.navyLight},${C.bgCard})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarCircle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "4rem",
    fontWeight: 700,
    color: C.gold,
    letterSpacing: "-0.02em",
  },
  photoGrad: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: `linear-gradient(to top,rgba(201,168,76,0.08),transparent 60%)`,
  },
  badge1: {
    position: "absolute",
    top: 20,
    left: -30,
    background: "rgba(7,11,20,0.92)",
    backdropFilter: "blur(12px)",
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 5s ease-in-out infinite",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  badge2: {
    position: "absolute",
    bottom: 20,
    right: -30,
    background: "rgba(7,11,20,0.92)",
    backdropFilter: "blur(12px)",
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 8s ease-in-out infinite",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  badgeVal: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: C.gold,
    lineHeight: 1,
  },
  badgeLbl: {
    fontSize: "0.68rem",
    color: C.textFaint,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginTop: 3,
  },

  // STATS
  statsBar: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1200,
    margin: "0 auto 0",
    padding: "0 32px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 1,
    background: C.border,
    borderRadius: 16,
    overflow: "hidden",
    border: `1px solid ${C.border}`,
  },
  statItem: {
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: C.bgCard,
    gap: 5,
  },
  statVal: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "2.4rem",
    fontWeight: 700,
    color: C.gold,
    lineHeight: 1,
  },
  statLbl: {
    fontSize: "0.76rem",
    color: C.textFaint,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },

  // SECTIONS
  section: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 32px",
  },
  altSection: {
    maxWidth: "100%",
    background: `rgba(13,21,38,0.5)`,
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
  },
  secLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  secLine: {
    display: "inline-block",
    width: 28,
    height: 1,
    background: C.gold,
  },
  secLabelTxt: {
    fontSize: "0.78rem",
    color: C.gold,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  secTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: "clamp(2rem,4vw,3rem)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    marginBottom: 48,
    lineHeight: 1.1,
  },

  // ABOUT
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 56,
    alignItems: "start",
  },
  bodyTxt: { fontSize: "0.97rem", lineHeight: 1.82, color: C.textMid },
  skillsWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 },
  skillChip: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: C.gold,
    border: `1px solid rgba(201,168,76,0.25)`,
    borderRadius: 6,
    padding: "5px 13px",
    letterSpacing: "0.04em",
    background: "rgba(201,168,76,0.05)",
  },
  barsCol: { display: "flex", flexDirection: "column", gap: 20 },
  barWrap: {},
  barHead: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  barLabel: { fontSize: "0.88rem", color: C.textMid },
  barPct: { fontSize: "0.82rem", color: C.gold, fontWeight: 700 },
  barBg: {
    height: 4,
    borderRadius: 4,
    background: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
    background: `linear-gradient(90deg,${C.gold},${C.goldLight})`,
    boxShadow: `0 0 12px rgba(201,168,76,0.4)`,
    transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
  },

  // SERVICES
  svcGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 20,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
  },
  svcCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: "36px 32px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
  },
  svcIcon: {
    display: "block",
    fontSize: "1.6rem",
    color: C.gold,
    marginBottom: 18,
  },
  svcTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    marginBottom: 10,
    color: C.white,
  },
  svcDesc: {
    fontSize: "0.88rem",
    lineHeight: 1.72,
    color: C.textMid,
    marginBottom: 16,
  },
  svcArrow: { fontSize: "1.1rem", color: `rgba(201,168,76,0.5)` },

  // PORTFOLIO
  projGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
  projCard: {
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  projCardHov: {
    transform: "translateY(-5px)",
    boxShadow: `0 20px 60px rgba(201,168,76,0.12)`,
    borderColor: C.gold,
  },
  projThumb: {
    height: 160,
    background: `linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  projThumbIcon: { fontSize: "3rem", color: `rgba(201,168,76,0.3)` },
  projOverlay: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(to bottom,transparent 60%,rgba(13,21,38,0.6))`,
  },
  projBody: { padding: "20px 22px" },
  projTag: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: C.gold,
    border: `1px solid rgba(201,168,76,0.3)`,
    borderRadius: 4,
    padding: "3px 10px",
    display: "inline-block",
    marginBottom: 8,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  projTitle: {
    fontFamily: "'Outfit',sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    color: C.white,
    marginBottom: 6,
  },
  projDesc: { fontSize: "0.82rem", color: C.textFaint, marginBottom: 14 },
  projFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projYear: { fontSize: "0.78rem", color: C.textFaint },
  projLink: {
    fontSize: "0.8rem",
    color: C.gold,
    textDecoration: "none",
    fontWeight: 600,
  },

  // CONTACT
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 56,
    alignItems: "start",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
  },
  contactLeft: {},
  contactInfoList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    marginTop: 28,
  },
  cRow: { display: "flex", alignItems: "center", gap: 14 },
  cIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: "rgba(201,168,76,0.08)",
    border: `1px solid rgba(201,168,76,0.15)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
  },
  cLabel: {
    display: "block",
    fontSize: "0.72rem",
    color: C.textFaint,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cVal: { display: "block", fontSize: "0.88rem", color: C.textMid },

  // FORM
  form: { display: "flex", flexDirection: "column", gap: 14 },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  input: {
    background: "rgba(13,21,38,0.8)",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    color: C.white,
    fontFamily: "'Outfit',sans-serif",
    fontSize: "0.9rem",
    padding: "13px 16px",
    width: "100%",
    transition: "border-color 0.2s",
  },
  textarea: {
    background: "rgba(13,21,38,0.8)",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    color: C.white,
    fontFamily: "'Outfit',sans-serif",
    fontSize: "0.9rem",
    padding: "13px 16px",
    resize: "vertical",
    width: "100%",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
    border: "none",
    color: C.bg,
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "14px 30px",
    borderRadius: 10,
    letterSpacing: "0.04em",
    boxShadow: `0 8px 28px rgba(201,168,76,0.3)`,
    alignSelf: "flex-start",
    transition: "transform 0.2s,box-shadow 0.2s",
  },
  successMsg: {
    background: "rgba(0,255,135,0.08)",
    border: "1px solid rgba(0,255,135,0.25)",
    borderRadius: 8,
    padding: "11px 14px",
    color: "#00ff87",
    fontSize: "0.86rem",
    fontWeight: 500,
  },
  errorMsg: {
    background: "rgba(255,80,80,0.08)",
    border: "1px solid rgba(255,80,80,0.25)",
    borderRadius: 8,
    padding: "11px 14px",
    color: "#ff6b6b",
    fontSize: "0.86rem",
    fontWeight: 500,
  },

  // FOOTER
  footer: {
    position: "relative",
    zIndex: 1,
    borderTop: `1px solid ${C.border}`,
    padding: "32px",
    background: `rgba(7,11,20,0.95)`,
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  footerTxt: { fontSize: "0.82rem", color: C.textFaint },
  footerLinks: { display: "flex", gap: 4 },
  footerLink: {
    background: "none",
    border: "none",
    color: C.textFaint,
    fontSize: "0.8rem",
    cursor: "pointer",
    padding: "4px 10px",
    fontFamily: "'Outfit',sans-serif",
    transition: "color 0.2s",
  },
};

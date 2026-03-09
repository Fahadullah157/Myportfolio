import { useState } from "react";

// =============================================
// WEEK 1 - ECOMMERCE HEADER + FOOTER
// DevelopersHub Internship Task
// Built with React (JSX) + Inline CSS
// =============================================

// ---- HEADER COMPONENT ----
function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [cartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const navLinks = ["Home", "Products", "Deals", "About", "Contact"];
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Toys",
  ];

  return (
    <header style={headerStyles.wrapper}>
      {/* ---- TOP BAR ---- */}
      <div style={headerStyles.topBar}>
        <div style={headerStyles.topBarInner}>
          <span style={headerStyles.topBarText}>
            🚚 Free shipping on orders over <strong>$50</strong>
          </span>
          <div style={headerStyles.topBarRight}>
            <a href="#" style={headerStyles.topBarLink}>
              Sell on ShopHub
            </a>
            <span style={headerStyles.topBarDivider}>|</span>
            <a href="#" style={headerStyles.topBarLink}>
              Track Order
            </a>
            <span style={headerStyles.topBarDivider}>|</span>
            <a href="#" style={headerStyles.topBarLink}>
              Help
            </a>
          </div>
        </div>
      </div>

      {/* ---- MAIN HEADER ---- */}
      <div style={headerStyles.mainBar}>
        <div style={headerStyles.mainBarInner}>
          {/* LOGO */}
          <div style={headerStyles.logo}>
            <span style={headerStyles.logoIcon}>🛒</span>
            <span style={headerStyles.logoText}>
              Shop<span style={headerStyles.logoAccent}>Hub</span>
            </span>
          </div>

          {/* SEARCH BAR */}
          <div style={headerStyles.searchWrapper}>
            <select style={headerStyles.searchCategory}>
              <option>All</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <div style={headerStyles.searchDivider} />
            <input
              type="text"
              placeholder="Search products, brands and more..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={headerStyles.searchInput}
            />
            <button style={headerStyles.searchBtn}>🔍</button>
          </div>

          {/* RIGHT ICONS */}
          <div style={headerStyles.rightIcons}>
            {/* Account */}
            <div style={headerStyles.iconGroup}>
              <span style={headerStyles.iconEmoji}>👤</span>
              <div style={headerStyles.iconTextGroup}>
                <span style={headerStyles.iconLabel}>Hello, Sign in</span>
                <span style={headerStyles.iconBold}>Account ▾</span>
              </div>
            </div>

            {/* Orders */}
            <div style={headerStyles.iconGroup}>
              <span style={headerStyles.iconEmoji}>📦</span>
              <div style={headerStyles.iconTextGroup}>
                <span style={headerStyles.iconLabel}>Returns</span>
                <span style={headerStyles.iconBold}>& Orders</span>
              </div>
            </div>

            {/* Wishlist */}
            <div style={headerStyles.iconGroup}>
              <span style={headerStyles.iconEmoji}>🤍</span>
              <div style={headerStyles.iconTextGroup}>
                <span style={headerStyles.iconLabel}>Saved</span>
                <span style={headerStyles.iconBold}>Wishlist</span>
              </div>
            </div>

            {/* Cart */}
            <div style={headerStyles.cartBtn}>
              <span style={headerStyles.cartEmoji}>🛒</span>
              <span style={headerStyles.cartBadge}>{cartCount}</span>
              <span style={headerStyles.cartLabel}>Cart</span>
            </div>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            style={headerStyles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ---- NAV BAR ---- */}
      <nav style={headerStyles.navBar}>
        <div style={headerStyles.navInner}>
          {/* All Categories */}
          <button style={headerStyles.allCategoriesBtn}>
            ☰ &nbsp; All Categories
          </button>

          {/* Nav Links */}
          <div style={headerStyles.navLinks}>
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveNav(link)}
                style={{
                  ...headerStyles.navLink,
                  ...(activeNav === link ? headerStyles.navLinkActive : {}),
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Promo tag */}
          <div style={headerStyles.promoTag}>🔥 Today's Deals</div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div style={headerStyles.mobileMenu}>
          {navLinks.map((link) => (
            <button
              key={link}
              style={headerStyles.mobileMenuLink}
              onClick={() => {
                setActiveNav(link);
                setMobileMenuOpen(false);
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; }
        select:focus { outline: none; }
        button:hover { opacity: 0.88; cursor: pointer; }
      `}</style>
    </header>
  );
}

// ---- FOOTER COMPONENT ----
function Footer() {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        "About ShopHub",
        "Careers",
        "Press Releases",
        "ShopHub Cares",
        "Gift Cards",
      ],
    },
    {
      title: "Make Money With Us",
      links: [
        "Sell on ShopHub",
        "Sell Under Private Brands",
        "Associates Programme",
        "Advertise Products",
      ],
    },
    {
      title: "ShopHub Services",
      links: [
        "ShopHub Business",
        "ShopHub Fresh",
        "ShopHub Prime",
        "ShopHub Pay",
        "ShopHub Wallet",
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        "Your Account",
        "Track Your Orders",
        "Returns & Replacements",
        "Help Center",
        "Contact Us",
      ],
    },
  ];

  return (
    <footer style={footerStyles.wrapper}>
      {/* ---- BACK TO TOP ---- */}
      <div
        style={footerStyles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ &nbsp; Back to top
      </div>

      {/* ---- MAIN FOOTER ---- */}
      <div style={footerStyles.mainFooter}>
        <div style={footerStyles.mainFooterInner}>
          {/* Logo + Description */}
          <div style={footerStyles.brandCol}>
            <div style={footerStyles.footerLogo}>
              <span style={footerStyles.footerLogoIcon}>🛒</span>
              <span style={footerStyles.footerLogoText}>
                Shop<span style={footerStyles.footerLogoAccent}>Hub</span>
              </span>
            </div>
            <p style={footerStyles.brandDesc}>
              Your one-stop destination for everything you need. Quality
              products, fast delivery, and unbeatable prices — delivered to your
              door.
            </p>
            {/* Social Icons */}
            <div style={footerStyles.socialRow}>
              {[
                { icon: "f", label: "Facebook" },
                { icon: "𝕏", label: "Twitter" },
                { icon: "in", label: "Instagram" },
                { icon: "▶", label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  style={footerStyles.socialIcon}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          {footerSections.map((section) => (
            <div key={section.title} style={footerStyles.linkCol}>
              <h4 style={footerStyles.linkColTitle}>{section.title}</h4>
              <ul style={footerStyles.linkList}>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={footerStyles.footerLink}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---- MIDDLE FOOTER — App + Payment ---- */}
      <div style={footerStyles.midFooter}>
        <div style={footerStyles.midFooterInner}>
          {/* App Download */}
          <div style={footerStyles.appSection}>
            <span style={footerStyles.midLabel}>Download the App</span>
            <div style={footerStyles.appBtns}>
              <a href="#" style={footerStyles.appBtn}>
                <span style={footerStyles.appBtnIcon}>🍎</span>
                <div>
                  <span style={footerStyles.appBtnSub}>Download on the</span>
                  <span style={footerStyles.appBtnMain}>App Store</span>
                </div>
              </a>
              <a href="#" style={footerStyles.appBtn}>
                <span style={footerStyles.appBtnIcon}>▶</span>
                <div>
                  <span style={footerStyles.appBtnSub}>Get it on</span>
                  <span style={footerStyles.appBtnMain}>Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={footerStyles.midDivider} />

          {/* Payment Methods */}
          <div style={footerStyles.paymentSection}>
            <span style={footerStyles.midLabel}>We Accept</span>
            <div style={footerStyles.paymentIcons}>
              {["VISA", "MC", "PayPal", "Amex", "ApplePay"].map((p) => (
                <span key={p} style={footerStyles.paymentBadge}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- BOTTOM FOOTER ---- */}
      <div style={footerStyles.bottomFooter}>
        <div style={footerStyles.bottomInner}>
          <span style={footerStyles.copyright}>
            © 2024 ShopHub, Inc. All Rights Reserved.
          </span>
          <div style={footerStyles.bottomLinks}>
            {[
              "Privacy Policy",
              "Terms of Use",
              "Cookie Settings",
              "Sitemap",
            ].map((l, i) => (
              <span
                key={l}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {i > 0 && <span style={footerStyles.bottomDivider}>|</span>}
                <a href="#" style={footerStyles.bottomLink}>
                  {l}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================
// MAIN APP — Combines Header + Demo + Footer
// =============================================
export default function EcommerceLayout() {
  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <Header />

      {/* DEMO BODY — just to show header/footer in context */}
      <main style={demoStyles.main}>
        <div style={demoStyles.card}>
          <span style={demoStyles.weekBadge}>📋 Week 1 Complete</span>
          <h2 style={demoStyles.cardTitle}>Header & Footer Built ✅</h2>
          <p style={demoStyles.cardText}>
            This is the placeholder for your page content.
            <br />
            <strong>Week 2</strong> will add the Home Page hero + product grid
            here.
          </p>
          <div style={demoStyles.checklist}>
            {[
              "✅ Top announcement bar",
              "✅ Logo with brand name",
              "✅ Category dropdown in search",
              "✅ Search bar with button",
              "✅ Account / Orders / Cart icons",
              "✅ Navigation bar with active state",
              "✅ Mobile hamburger menu",
              "✅ Footer with 4 link columns",
              "✅ App download buttons",
              "✅ Payment method badges",
              "✅ Social media icons",
              "✅ Copyright bar",
            ].map((item) => (
              <div key={item} style={demoStyles.checkItem}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// =============================================
// STYLES
// =============================================

const COLORS = {
  primary: "#131921", // Amazon-style dark navy
  secondary: "#232f3e", // Slightly lighter navy
  accent: "#f90", // Amazon orange
  accentDark: "#e47911", // Darker orange for hover
  navBg: "#37475a", // Nav bar color
  white: "#ffffff",
  lightGray: "#f3f4f6",
  midGray: "#dddddd",
  textLight: "rgba(255,255,255,0.75)",
  textFaint: "rgba(255,255,255,0.45)",
};

const headerStyles = {
  wrapper: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
  },

  // TOP BAR
  topBar: {
    background: COLORS.secondary,
    padding: "6px 0",
  },
  topBarInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topBarText: {
    fontSize: "0.78rem",
    color: COLORS.textLight,
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  topBarLink: {
    fontSize: "0.78rem",
    color: COLORS.textLight,
    textDecoration: "none",
    transition: "color 0.2s",
  },
  topBarDivider: {
    color: COLORS.textFaint,
    fontSize: "0.7rem",
  },

  // MAIN BAR
  mainBar: {
    background: COLORS.primary,
    padding: "10px 0",
  },
  mainBarInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  // LOGO
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "2px solid transparent",
    transition: "border-color 0.2s",
  },
  logoIcon: { fontSize: "1.4rem" },
  logoText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.4rem",
    fontWeight: 800,
    color: COLORS.white,
    letterSpacing: "-0.02em",
  },
  logoAccent: { color: COLORS.accent },

  // SEARCH
  searchWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    background: COLORS.white,
    borderRadius: "8px",
    overflow: "hidden",
    height: "42px",
    border: "2px solid transparent",
    transition: "border-color 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
  },
  searchCategory: {
    height: "100%",
    padding: "0 10px",
    background: "#e8e8e8",
    border: "none",
    fontSize: "0.82rem",
    color: "#333",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    flexShrink: 0,
  },
  searchDivider: {
    width: "1px",
    height: "60%",
    background: COLORS.midGray,
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    border: "none",
    padding: "0 14px",
    fontSize: "0.9rem",
    color: "#111",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: "transparent",
  },
  searchBtn: {
    height: "100%",
    padding: "0 18px",
    background: COLORS.accent,
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
    flexShrink: 0,
  },

  // RIGHT ICONS
  rightIcons: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "border-color 0.2s",
  },
  iconEmoji: { fontSize: "1.2rem" },
  iconTextGroup: {
    display: "flex",
    flexDirection: "column",
  },
  iconLabel: {
    fontSize: "0.7rem",
    color: COLORS.textLight,
    lineHeight: 1.2,
  },
  iconBold: {
    fontSize: "0.82rem",
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1.2,
  },

  // CART
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "2px solid transparent",
    position: "relative",
    background: "transparent",
    transition: "border-color 0.2s",
  },
  cartEmoji: { fontSize: "1.5rem" },
  cartBadge: {
    position: "absolute",
    top: "2px",
    left: "22px",
    background: COLORS.accent,
    color: COLORS.primary,
    fontSize: "0.7rem",
    fontWeight: 800,
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartLabel: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: COLORS.white,
    marginLeft: "4px",
  },

  // HAMBURGER
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    color: COLORS.white,
    fontSize: "1.4rem",
    cursor: "pointer",
    padding: "6px",
  },

  // NAV BAR
  navBar: {
    background: COLORS.navBg,
    padding: "0",
  },
  navInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  allCategoriesBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "none",
    color: COLORS.white,
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "10px 16px",
    cursor: "pointer",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    borderRadius: "4px",
    transition: "background 0.2s",
    flexShrink: 0,
    marginRight: "8px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "2px",
  },
  navLink: {
    background: "none",
    border: "2px solid transparent",
    color: COLORS.white,
    fontSize: "0.85rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s",
    fontWeight: 500,
  },
  navLinkActive: {
    border: "2px solid white",
    fontWeight: 700,
  },
  promoTag: {
    background: COLORS.accent,
    color: COLORS.primary,
    fontSize: "0.8rem",
    fontWeight: 700,
    padding: "6px 14px",
    borderRadius: "4px",
    flexShrink: 0,
    marginLeft: "auto",
    cursor: "pointer",
  },

  // MOBILE MENU
  mobileMenu: {
    background: COLORS.secondary,
    padding: "8px 20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  mobileMenuLink: {
    background: "none",
    border: "none",
    color: COLORS.white,
    fontSize: "0.95rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    padding: "10px 0",
    cursor: "pointer",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
};

const footerStyles = {
  wrapper: {
    background: COLORS.primary,
    marginTop: "40px",
  },

  // BACK TO TOP
  backToTop: {
    background: COLORS.secondary,
    color: COLORS.white,
    textAlign: "center",
    padding: "14px",
    fontSize: "0.88rem",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "background 0.2s",
  },

  // MAIN FOOTER
  mainFooter: {
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "40px 0",
  },
  mainFooterInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 40px",
    display: "grid",
    gridTemplateColumns: "260px repeat(4, 1fr)",
    gap: "32px",
    alignItems: "start",
  },

  // BRAND COL
  brandCol: {},
  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px",
  },
  footerLogoIcon: { fontSize: "1.6rem" },
  footerLogoText: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.5rem",
    fontWeight: 800,
    color: COLORS.white,
    letterSpacing: "-0.02em",
  },
  footerLogoAccent: { color: COLORS.accent },
  brandDesc: {
    fontSize: "0.83rem",
    color: COLORS.textLight,
    lineHeight: 1.7,
    marginBottom: "20px",
  },
  socialRow: {
    display: "flex",
    gap: "10px",
  },
  socialIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "background 0.2s",
    fontStyle: "normal",
  },

  // LINK COLUMNS
  linkCol: {},
  linkColTitle: {
    color: COLORS.white,
    fontSize: "0.9rem",
    fontWeight: 700,
    marginBottom: "14px",
    letterSpacing: "0.02em",
  },
  linkList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },
  footerLink: {
    color: COLORS.textLight,
    textDecoration: "none",
    fontSize: "0.83rem",
    transition: "color 0.2s",
    lineHeight: 1.4,
  },

  // MID FOOTER
  midFooter: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "24px 0",
  },
  midFooterInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  midLabel: {
    color: COLORS.textFaint,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "10px",
  },
  appSection: { flexShrink: 0 },
  appBtns: {
    display: "flex",
    gap: "10px",
  },
  appBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: COLORS.secondary,
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    padding: "8px 14px",
    textDecoration: "none",
    transition: "background 0.2s",
    cursor: "pointer",
  },
  appBtnIcon: { fontSize: "1.4rem" },
  appBtnSub: {
    display: "block",
    fontSize: "0.68rem",
    color: COLORS.textLight,
    lineHeight: 1,
    marginBottom: "2px",
  },
  appBtnMain: {
    display: "block",
    fontSize: "0.88rem",
    fontWeight: 700,
    color: COLORS.white,
    lineHeight: 1,
  },
  midDivider: {
    width: "1px",
    height: "60px",
    background: "rgba(255,255,255,0.1)",
    flexShrink: 0,
  },
  paymentSection: {},
  paymentIcons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  paymentBadge: {
    background: COLORS.white,
    color: COLORS.primary,
    fontSize: "0.7rem",
    fontWeight: 800,
    padding: "5px 10px",
    borderRadius: "5px",
    letterSpacing: "0.04em",
  },

  // BOTTOM FOOTER
  bottomFooter: {
    padding: "16px 0",
    background: "#0d1117",
  },
  bottomInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  copyright: {
    fontSize: "0.8rem",
    color: COLORS.textFaint,
  },
  bottomLinks: {
    display: "flex",
    alignItems: "center",
    gap: "0",
  },
  bottomLink: {
    color: COLORS.textLight,
    textDecoration: "none",
    fontSize: "0.8rem",
    transition: "color 0.2s",
  },
  bottomDivider: {
    color: COLORS.textFaint,
    fontSize: "0.7rem",
  },
};

const demoStyles = {
  main: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 20px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  weekBadge: {
    display: "inline-block",
    background: "#fff3e0",
    color: "#e47911",
    fontSize: "0.82rem",
    fontWeight: 700,
    padding: "6px 16px",
    borderRadius: "20px",
    marginBottom: "16px",
    letterSpacing: "0.04em",
  },
  cardTitle: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#131921",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: 1.7,
    marginBottom: "28px",
  },
  checklist: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    textAlign: "left",
  },
  checkItem: {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "0.83rem",
    color: "#333",
    fontWeight: 500,
  },
};

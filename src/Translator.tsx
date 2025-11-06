import React, { useState, useEffect } from "react";

// ✅ Browser-safe translator package
import {
  englishToIgbo,
  englishToYoruba,
  englishToHausa,
  igboToEnglish,
  yorubaToEnglish,
  hausaToEnglish,
} from "nigeria-translator-browser";

export default function Translator() {
  // ✅ Persist language
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("translator_lang") || "ig"
  );

  const [text, setText] = useState("come");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ WEBSITE TEXT (auto-translated)
  const [headerTitle, setHeaderTitle] = useState("🇳🇬 Nigeria Translator");
  const [heroTitle, setHeroTitle] = useState("Translate Nigerian Languages Instantly");
  const [heroSubtitle, setHeroSubtitle] = useState(
    "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
  );
  
  const [whyTitle, setWhyTitle] = useState("Why Choose Nigeria Translator?");
  const [howTitle, setHowTitle] = useState("How It Works");
  const [testimonialsTitle, setTestimonialsTitle] = useState("What Users Say");
  const [faqTitle, setFaqTitle] = useState("Frequently Asked Questions");
  const [pricingTitle, setPricingTitle] = useState("Pricing Plans");
  const [developerTitle, setDeveloperTitle] = useState("Developers API");

  // ✅ MULTI-SECTION TEXTS THAT CAN BE TRANSLATED
  const translateWebsiteText = async () => {
    const translate = async (msg: string) => {
      if (selectedLang === "ig") return englishToIgbo(msg);
      if (selectedLang === "yo") return englishToYoruba(msg);
      if (selectedLang === "ha") return englishToHausa(msg);
      return msg; // English
    };

    // Hero
    setHeaderTitle(await translate("Nigeria Translator"));
    setHeroTitle(await translate("Translate Nigerian Languages Instantly"));
    setHeroSubtitle(
      await translate(
        "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
      )
    );

    // Section titles
    setWhyTitle(await translate("Why Choose Nigeria Translator?"));
    setHowTitle(await translate("How It Works"));
    setTestimonialsTitle(await translate("What Users Say"));
    setFaqTitle(await translate("Frequently Asked Questions"));
    setPricingTitle(await translate("Pricing Plans"));
    setDeveloperTitle(await translate("Developers API"));
  };

  useEffect(() => {
    localStorage.setItem("translator_lang", selectedLang);
    translateWebsiteText();
  }, [selectedLang]);

  // ✅ Translator Function
  const doTranslate = async () => {
    try {
      setLoading(true);
      const input = text.trim();
      if (!input) return setTranslated("");

      let result = "";

      switch (selectedLang) {
        case "ig":
          result = await englishToIgbo(input);
          break;
        case "yo":
          result = await englishToYoruba(input);
          break;
        case "ha":
          result = await englishToHausa(input);
          break;
        case "en-ig":
          result = await igboToEnglish(input);
          break;
        case "en-yo":
          result = await yorubaToEnglish(input);
          break;
        case "en-ha":
          result = await hausaToEnglish(input);
          break;
        default:
          result = input;
      }

      setTranslated(result);
    } catch {
      setTranslated("⚠️ Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    doTranslate();
  }, [text, selectedLang]);

  const copyToClipboard = async () => {
    if (!translated) return;
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={styles.page}>
      {/* ✅ HEADER */}
      <header style={styles.header}>
        <h2 style={styles.headerTitle}>{headerTitle}</h2>
      </header>

      {/* ✅ HERO / INTRO */}
      <div style={styles.intro}>
        <h1 style={styles.title}>{heroTitle}</h1>
        <p style={styles.subtitle}>{heroSubtitle}</p>
        <button style={styles.ctaBtn}>Start Translating</button>
      </div>

      {/* ✅ TRANSLATOR CARD */}
      <div style={styles.card}>
        <div style={styles.field}>
          <label style={styles.label}>Translate</label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            style={styles.select}
          >
            <option value="ig">English → Igbo</option>
            <option value="yo">English → Yoruba</option>
            <option value="ha">English → Hausa</option>
            <option value="en-ig">Igbo → English</option>
            <option value="en-yo">Yoruba → English</option>
            <option value="en-ha">Hausa → English</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Enter Text</label>
          <textarea
            style={styles.textArea}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here…"
            rows={6}
          />
        </div>

        <div style={styles.output}>
          <div style={styles.outputHeader}>
            <span style={styles.outputTitle}>Translation</span>
            <button onClick={copyToClipboard} style={styles.copyBtn}>
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>

          {loading ? (
            <div style={styles.loading}>Translating…</div>
          ) : (
            <div style={styles.translated}>{translated}</div>
          )}
        </div>
      </div>

      {/* ✅ WHY CHOOSE US */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{whyTitle}</h2>

        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <h3>Fast & Instant</h3>
            <p>Translations happen in milliseconds with no page reload.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Accurate Nigerian Languages</h3>
            <p>Specialized models trained for Igbo, Yoruba, and Hausa.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>100% Browser Safe</h3>
            <p>No API keys, no servers, no tracking — everything happens locally.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>Free Forever Plan</h3>
            <p>Start translating instantly without signup.</p>
          </div>
        </div>
      </section>

      {/* ✅ HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{howTitle}</h2>
        <ol style={styles.howList}>
          <li>Choose your translation direction.</li>
          <li>Type any English, Igbo, Yoruba, or Hausa text.</li>
          <li>Instant translation appears immediately.</li>
          <li>Copy and share with one click.</li>
        </ol>
      </section>

      {/* ✅ PRICING SECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{pricingTitle}</h2>

        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3>Free Tier</h3>
            <p>✅ 200 translations/day</p>
            <p>✅ Igbo, Yoruba, Hausa</p>
            <p>✅ Browser usage</p>
            <h4>₦0 / month</h4>
          </div>

          <div style={styles.priceCardPro}>
            <h3>Pro Tier</h3>
            <p>✅ Unlimited translations</p>
            <p>✅ API Access</p>
            <p>✅ Faster translation engine</p>
            <p>✅ Priority support</p>
            <h4>₦3,500 / month</h4>
            <button style={styles.subscribeBtn}>Subscribe</button>
          </div>

          <div style={styles.priceCardEnterprise}>
            <h3>Enterprise</h3>
            <p>✅ Dedicated servers</p>
            <p>✅ Custom language models</p>
            <p>✅ SLA + phone support</p>
            <h4>Contact Sales</h4>
            <button style={styles.contactBtn}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* ✅ DEVELOPERS API SECTION */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{developerTitle}</h2>
        <p style={styles.subtitle}>Integrate translation into apps, bots, CRMs, and more.</p>

        <pre style={styles.codeBox}>
{`GET https://api.nigeria-translator.com/translate?q=hello&to=ig`}
        </pre>

        <p style={styles.subtitle}>Available for Node, Python, PHP, React, Flutter, and more.</p>

        <button style={styles.ctaBtnSecondary}>Get API Key</button>
      </section>

      {/* ✅ TESTIMONIALS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{testimonialsTitle}</h2>

        <div style={styles.testimonialGrid}>
          <div style={styles.testimonialCard}>
            <p>"A lifesaver for my app. The translations are very accurate."</p>
            <strong>- Chinedu, Lagos</strong>
          </div>

          <div style={styles.testimonialCard}>
            <p>"Finally a proper Nigerian language translator!"</p>
            <strong>- Tola, Ibadan</strong>
          </div>

          <div style={styles.testimonialCard}>
            <p>"API integration was smooth. Highly recommend."</p>
            <strong>- Musa, Abuja</strong>
          </div>
        </div>
      </section>

      {/* ✅ FAQ */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>{faqTitle}</h2>

        <div style={styles.faqItem}>
          <h4>Is the translator free?</h4>
          <p>Yes! The free plan offers up to 200 translations per day.</p>
        </div>
        <div style={styles.faqItem}>
          <h4>How accurate is it?</h4>
          <p>One of the most accurate Nigerian translation systems available.</p>
        </div>
        <div style={styles.faqItem}>
          <h4>Can I integrate it into my app?</h4>
          <p>Yes. Use our REST API or SDK packages.</p>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer style={styles.footer}>
        <p>Made with ❤️ by <strong>Achu-ulim Agbama</strong></p>
        <p>© {new Date().getFullYear()} Nigeria Translator SaaS</p>
        <p style={{ opacity: 0.5 }}>All Rights Reserved.</p>
      </footer>
    </div>
  );
}

/* ✅ EXTENDED STYLES */
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "40px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },

  header: { marginBottom: "20px" },
  headerTitle: { fontSize: "26px", fontWeight: 800 },

  intro: { textAlign: "center", marginBottom: "40px", maxWidth: "600px" },
  title: { fontSize: "36px", fontWeight: 900 },
  subtitle: { fontSize: "18px", color: "#475569" },

  ctaBtn: {
    marginTop: "15px",
    padding: "12px 24px",
    background: "#1e40af",
    color: "white",
    borderRadius: "6px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    maxWidth: "500px",
    width: "100%",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
    marginBottom: "50px",
  },

  field: { marginBottom: "22px" },
  label: { fontSize: "16px", fontWeight: 700 },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },
  textArea: {
  width: "100%",
  padding: "16px",
  minHeight: "140px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  lineHeight: "1.6",
  resize: "vertical",
  outline: "none",
  background: "#ffffff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
},


  output: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  outputTitle: { fontWeight: 600, color: "#64748b" },
  copyBtn: {
    background: "#1e40af",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  loading: { color: "#64748b" },
  translated: { fontSize: "22px", fontWeight: 700, color: "#1e293b" },

  section: {
    marginTop: "40px",
    textAlign: "center",
    maxWidth: "800px",
  },
  sectionTitle: {
    fontSize: "30px",
    fontWeight: 900,
    marginBottom: "20px",
  },

  featureGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  featureCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "230px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },

  howList: {
    textAlign: "left",
    maxWidth: "400px",
    margin: "auto",
    fontSize: "16px",
    lineHeight: "1.8",
  },

  pricingGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  priceCard: {
    background: "#fff",
    padding: "24px",
    width: "240px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.07)",
  },
  priceCardPro: {
    background: "#1e3a8a",
    color: "white",
    padding: "24px",
    width: "240px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.15)",
  },
  priceCardEnterprise: {
    background: "#0f172a",
    color: "white",
    padding: "24px",
    width: "240px",
    borderRadius: "12px",
    boxShadow: "0 5px 18px rgba(0,0,0,0.20)",
  },

  subscribeBtn: {
    marginTop: "12px",
    background: "#fff",
    color: "#1e40af",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  contactBtn: {
    marginTop: "12px",
    background: "#334155",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  apiText: { color: "#475569", marginBottom: "12px" },
  codeBox: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    marginBottom: "20px",
  },
  ctaBtnSecondary: {
    padding: "12px 20px",
    background: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  testimonialGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  testimonialCard: {
    background: "white",
    padding: "20px",
    width: "260px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
    fontStyle: "italic",
  },

  faqItem: {
    background: "#fff",
    padding: "18px",
    borderRadius: "8px",
    marginBottom: "12px",
    textAlign: "left",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    fontSize: "14px",
    color: "#475569",
  },
};

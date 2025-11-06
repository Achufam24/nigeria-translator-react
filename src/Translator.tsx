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
  const [title, setTitle] = useState("Translate Nigerian Languages Instantly");
  const [subtitle, setSubtitle] = useState(
    "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
  );
  const [headerTitle, setHeaderTitle] = useState("🇳🇬 Nigeria Translator");

  const translateWebsiteText = async () => {
    if (selectedLang === "ig") {
      setHeaderTitle(await englishToIgbo("Nigeria Translator"));
      setTitle(await englishToIgbo("Translate Nigerian Languages Instantly"));
      setSubtitle(
        await englishToIgbo(
          "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
        )
      );
    } else if (selectedLang === "yo") {
      setHeaderTitle(await englishToYoruba("Nigeria Translator"));
      setTitle(await englishToYoruba("Translate Nigerian Languages Instantly"));
      setSubtitle(
        await englishToYoruba(
          "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
        )
      );
    } else if (selectedLang === "ha") {
      setHeaderTitle(await englishToHausa("Nigeria Translator"));
      setTitle(await englishToHausa("Translate Nigerian Languages Instantly"));
      setSubtitle(
        await englishToHausa(
          "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
        )
      );
    } else {
      // English
      setHeaderTitle("🇳🇬 Nigeria Translator");
      setTitle("Translate Nigerian Languages Instantly");
      setSubtitle(
        "A fast, lightweight English ↔ Igbo, Yoruba, and Hausa translator that works entirely in your browser."
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("translator_lang", selectedLang);
    translateWebsiteText();
  }, [selectedLang]);

  // ✅ Translation logic for input text
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

      {/* ✅ HERO SECTION */}
      <div style={styles.intro}>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.subtitle}>{subtitle}</p>
      </div>

      {/* ✅ TRANSLATOR CARD */}
      <div style={styles.card}>
        {/* Language Selector */}
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

        {/* Text Input */}
        <div style={styles.field}>
          <label style={styles.label}>Enter Text</label>
          <input
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something…"
          />
        </div>

        {/* Output */}
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

      {/* ✅ PRICING SECTION */}
      <section style={styles.pricingSection}>
        <h2 style={styles.sectionTitle}>Pricing</h2>
        
        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3>Free Tier</h3>
            <p>✅ 200 translations/day</p>
            <p>✅ Igbo, Yoruba, Hausa</p>
            <p>✅ Browser-only usage</p>
            <h4 style={{ marginTop: 10 }}>₦0 / month</h4>
          </div>

          <div style={styles.priceCardPro}>
            <h3>Pro Tier</h3>
            <p>✅ Unlimited translations</p>
            <p>✅ Faster performance</p>
            <p>✅ Priority support</p>
            <h4 style={{ marginTop: 10 }}>₦3,500 / month</h4>
          </div>
        </div>
      </section>

      {/* ✅ DEVELOPERS API SECTION */}
      <section style={styles.apiSection}>
        <h2 style={styles.sectionTitle}>Developers API</h2>
        <p style={styles.apiText}>
          Integrate Nigerian language translation into your app in seconds.
        </p>

        <pre style={styles.codeBox}>
{`GET https://api.nigeria-translator.com/translate
?q=hello&to=ig`}
        </pre>

        <p style={styles.apiText}>
          API Keys available for backend & production apps.
        </p>
      </section>

      {/* ✅ FOOTER */}
      <footer style={styles.footer}>
        <p>Made with ❤️ by <strong>Achu-ulim Agbama</strong></p>
        <p style={{ opacity: 0.6 }}>Powered by nigeria-translator-browser</p>
      </footer>
    </div>
  );
}


/* ✅ STYLES BELOW — SAME LOOK AND FEEL */
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
  headerTitle: { fontSize: "22px", fontWeight: 700 },

  intro: { textAlign: "center", maxWidth: "600px", marginBottom: "30px" },
  title: { fontSize: "32px", fontWeight: 800 },
  subtitle: { fontSize: "16px", color: "#475569" },

  card: {
    background: "#fff",
    maxWidth: "500px",
    width: "100%",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 6px 22px rgba(0,0,0,0.08)",
    marginBottom: "40px",
  },

  field: { marginBottom: "22px" },
  label: { fontSize: "14px", fontWeight: 600, marginBottom: "6px" },
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
    background: "#2563eb",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  loading: { fontStyle: "italic", color: "#64748b" },

  translated: { fontSize: "22px", fontWeight: 700, color: "#1e293b" },

  pricingSection: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: 800,
    marginBottom: "20px",
  },
  pricingGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  priceCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  priceCardPro: {
    background: "#1e40af",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "240px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
  },

  apiSection: {
    textAlign: "center",
    marginTop: "20px",
  },
  apiText: {
    fontSize: "15px",
    color: "#475569",
    marginBottom: "10px",
  },
  codeBox: {
    background: "#1e293b",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    margin: "auto",
    fontSize: "14px",
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    fontSize: "14px",
    color: "#475569",
  },
};

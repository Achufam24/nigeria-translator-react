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
  const [text, setText] = useState("come");
  const [selectedLang, setSelectedLang] = useState("ig");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const doTranslate = async () => {
    try {
      setLoading(true);

      const input = text.trim();
      if (!input) {
        setTranslated("");
        return;
      }

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
    } catch (err) {
      setTranslated("⚠️ Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!translated) return;
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    doTranslate();
  }, [text, selectedLang]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🇳🇬 Nigerian Language Translator (React)</h1>

      <div style={styles.card}>
        {/* Language Selector */}
        <div style={styles.field}>
          <label style={styles.label}>Translate</label>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            style={styles.select}
          >
            <option disabled value="">
              Select a language
            </option>

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
    </div>
  );
}

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
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    maxWidth: "450px",
    width: "100%",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 6px 22px rgba(0,0,0,0.08)",
  },
  field: {
    marginBottom: "22px",
  },
  label: {
    fontSize: "14px",
    color: "#334155",
    fontWeight: 600,
    marginBottom: "6px",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
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
  outputTitle: {
    fontWeight: 600,
    color: "#64748b",
  },
  copyBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  loading: {
    fontStyle: "italic",
    color: "#64748b",
  },
  translated: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1e293b",
  },
};

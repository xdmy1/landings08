import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: "clamp(64px, 14vw, 160px)", fontWeight: 300, letterSpacing: "-0.05em", lineHeight: 1 }}>404</h1>
      <p style={{ color: "var(--ink-2)", fontSize: 15 }}>Pagina nu există.</p>
      <Link href="/" className="tlink">
        Înapoi acasă
      </Link>
    </main>
  );
}

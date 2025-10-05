"use client";
import { useEffect, useState } from "react";

function calculateScore(answers) {
  // ⚠️ Mesma ordem das suas 32 questões:
  const correct = [
    1, 1, 2, 1, 1, 1, 2, 0,
    0, 1, 0, 3, 1, 2, 2, 0,
    0, 2, 2, 1, 1, 1, 1, 1,
    2, 1, 3, 2, 0, 2, 1, 1,
  ];
  let c = 0;
  for (let i = 0; i < correct.length; i++) {
    if (answers?.[i] === correct[i]) c++;
  }
  return c;
}

function estimateIQ(score) {
  const percentage = (score / 32) * 100;
  if (percentage >= 90) return 140 + Math.floor((percentage - 90) * 2);
  if (percentage >= 80) return 120 + Math.floor((percentage - 80) * 2);
  if (percentage >= 70) return 110 + Math.floor((percentage - 70) * 1);
  if (percentage >= 60) return 100 + Math.floor((percentage - 60) * 1);
  if (percentage >= 50) return 90 + Math.floor((percentage - 50) * 1);
  return 70 + Math.floor(percentage * 0.4);
}

function performanceLabel(pt, score) {
  const percentage = (score / 32) * 100;
  const labels = pt
    ? { excellent: "Excelente", good: "Bom", average: "Médio", below: "Abaixo da Média" }
    : { excellent: "Excellent", good: "Good", average: "Average", below: "Below Average" };

  if (percentage >= 85) return labels.excellent;
  if (percentage >= 70) return labels.good;
  if (percentage >= 50) return labels.average;
  return labels.below;
}

export default function SuccessPage() {
  const [status, setStatus] = useState("checking"); // checking | paid | not_paid | error
  const [sessionId, setSessionId] = useState(null);
  const [score, setScore] = useState(null);
  const [iq, setIq] = useState(null);
  const [langPt, setLangPt] = useState(true); // default PT

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("session_id");
    setSessionId(id);

    if (!id) {
      setStatus("error");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/verify?session_id=${encodeURIComponent(id)}`);
        const data = await res.json();

        if (res.ok && data?.paid) {
          // Marca como pago (opcional)
          try { localStorage.setItem("iq_paid", "1"); } catch {}

          // Recupera respostas/metadados
          let answers = [];
          let language = "pt";

          try {
            const saved = localStorage.getItem("iq_answers");
            if (saved) answers = JSON.parse(saved);

            const meta = JSON.parse(localStorage.getItem("iq_meta") || "{}");
            if (meta?.language) language = meta.language;
          } catch {}

          const s = calculateScore(answers || []);
          const q = estimateIQ(s);

          setScore(s);
          setIq(q);
          setLangPt(language === "pt");
          setStatus("paid");
        } else {
          setStatus("not_paid");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  if (status === "checking") return <main className="p-8">Verificando pagamento…</main>;
  if (status === "not_paid") return <main className="p-8">Pagamento não confirmado. Tente novamente.</main>;
  if (status === "error") return <main className="p-8">Erro ao verificar pagamento.</main>;

  // paid
  const t = langPt
    ? {
        title: "Pagamento confirmado ✅",
        results: "Resultados",
        yourScore: "Sua Pontuação",
        outOf: "de",
        iq: "QI Estimado",
        performance: "Desempenho",
        back: "Voltar ao início",
        session: "Sessão",
      }
    : {
        title: "Payment confirmed ✅",
        results: "Results",
        yourScore: "Your Score",
        outOf: "out of",
        iq: "Estimated IQ",
        performance: "Performance",
        back: "Back to start",
        session: "Session",
      };

  const perf = performanceLabel(langPt, score ?? 0);

  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-2">{t.title}</h1>
        <p className="mb-6 text-sm text-neutral-600">
          {t.session}: {sessionId}
        </p>

        <h2 className="text-xl font-bold mb-4">{t.results}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center p-6 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm opacity-90">
              {t.yourScore} {t.outOf} 32
            </div>
          </div>
          <div className="text-center p-6 rounded-lg text-white bg-gradient-to-r from-green-500 to-teal-600">
            <div className="text-3xl font-bold">{iq}</div>
            <div className="text-sm opacity-90">{t.iq}</div>
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-neutral-200 text-neutral-900">
            {t.performance}: {perf}
          </span>
        </div>

        <div className="flex justify-center">
          <a
            href="/"
            className="inline-block rounded-md bg-black text-white px-4 py-2"
          >
            {t.back}
          </a>
        </div>
      </div>
    </main>
  );
}
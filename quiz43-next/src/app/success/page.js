"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState("checking"); // checking | paid | not_paid | error
  const [sessionId, setSessionId] = useState(null);

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
        if (res.ok && data?.paid) setStatus("paid");
        else setStatus("not_paid");
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  if (status === "checking") return <main className="p-8">Verificando pagamento…</main>;
  if (status === "not_paid") return <main className="p-8">Pagamento não confirmado. Tente novamente.</main>;
  if (status === "error") return <main className="p-8">Erro ao verificar pagamento.</main>;

  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-xl w-full rounded-xl border p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-semibold mb-4">Pagamento confirmado ✅</h1>
        <p className="mb-4 text-sm text-neutral-600">Sessão: {sessionId}</p>
        <a href="/" className="inline-block rounded-md bg-black text-white px-4 py-2">
          Ver resultados
        </a>
      </div>
    </main>
  );
}
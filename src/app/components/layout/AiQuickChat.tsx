import { FormEvent, useState } from "react";
import { Bot, Maximize2, Send, Sparkles, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { getSession } from "../../lib/auth";

type QuickMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const quickPrompts = ["Dịch câu này", "Gợi ý đi metro", "Cảnh báo khi đi chợ"];

async function askAi(messages: QuickMessage[]) {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map((message) => ({ role: message.role, content: message.text })),
    }),
  });

  const responseText = await response.text();
  let data: { text?: string; error?: string } = {};
  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    throw new Error(responseText.slice(0, 140) || "Máy chủ AI không trả về JSON hợp lệ");
  }

  if (!response.ok) throw new Error(data.error || "Không thể kết nối AI");
  return data.text || "Tôi chưa có câu trả lời phù hợp.";
}

function MiniMarkdown({ text, inverted = false }: { text: string; inverted?: boolean }) {
  const lines = text.split("\n").filter((line) => line.trim());
  return (
    <div className="space-y-2 text-sm leading-6">
      {lines.map((line, index) => {
        const bullet = line.trim().match(/^[-*]\s+(.+)$/);
        const numbered = line.trim().match(/^\d+[.)]\s+(.+)$/);
        const content = (bullet?.[1] || numbered?.[1] || line).replace(/\*\*/g, "");
        return (
          <p key={`${line}-${index}`} className={bullet || numbered ? "pl-3 before:mr-2 before:content-['•']" : undefined}>
            {content.split(/(`[^`]+`)/g).map((part, partIndex) => part.startsWith("`") && part.endsWith("`") ? <code key={partIndex} className={`rounded px-1.5 py-0.5 ${inverted ? "bg-white/20" : "bg-white text-[#b7131a]"}`}>{part.slice(1, -1)}</code> : part)}
          </p>
        );
      })}
    </div>
  );
}

export function AiQuickChat() {
  const location = useLocation();
  const [session] = useState(() => getSession());
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<QuickMessage[]>([
    { id: "welcome", role: "assistant", text: "Xin chào, tôi có thể giúp bạn dịch nhanh, hỏi đường, chuẩn bị lịch trình hoặc lưu ý khi đi chợ Trung Quốc." },
  ]);

  if (location.pathname === "/ai") return null;

  async function submit(value = input) {
    if (!session || loading) return;
    const prompt = value.trim();
    if (!prompt) return;

    const userMessage: QuickMessage = { id: `u-${Date.now()}`, role: "user", text: prompt };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const answer = await askAi(nextMessages);
      setMessages((current) => [...current, { id: `a-${Date.now()}`, role: "assistant", text: answer }]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Không thể kết nối AI";
      setError(message);
      setMessages((current) => [...current, { id: `a-${Date.now()}`, role: "assistant", text: `Tôi chưa thể trả lời lúc này: ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] md:bottom-6 md:right-6">
      {open && (
        <section className="mb-4 flex h-[min(620px,calc(100vh-112px))] w-[calc(100vw-32px)] max-w-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl shadow-[#b7131a]/20 ring-1 ring-[#f0d8d5] backdrop-blur sm:rounded-[2rem]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#b7131a] via-[#d93b2f] to-[#ff8a5c] p-4 text-white sm:p-5">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute bottom-0 left-8 h-20 w-20 rounded-full bg-black/10 blur-2xl" />
            <div className="relative flex items-start gap-3 pr-20">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/18 ring-1 ring-white/25 sm:h-12 sm:w-12">
                  <Bot className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold">Trợ lý AI</h2>
                    <Sparkles className="h-4 w-4 text-white/80" />
                  </div>
                  <p className="mt-1 text-xs leading-5 text-white/82">Dịch nhanh, hỏi đường, chuẩn bị lịch trình và đi chợ đầu mối.</p>
                </div>
              </div>
              <div className="absolute right-0 top-0 flex items-center gap-2">
                <Link to="/ai" aria-label="Mở trang AI đầy đủ" title="Mở trang AI đầy đủ" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:bg-white sm:text-[#b7131a] sm:shadow-sm sm:hover:bg-white/90">
                  <Maximize2 className="h-4 w-4" />
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Đóng chat AI" className="rounded-full bg-white/15 p-2 transition hover:bg-white/25">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {!session ? (
            <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#fff8f7] to-white p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fff1ef] text-[#b7131a] ring-1 ring-[#f0d8d5]"><Bot className="h-9 w-9" /></div>
              <h3 className="text-xl font-bold">Đăng nhập để chat với AI</h3>
              <p className="mt-2 text-sm leading-6 text-[#5b5f61]">Trợ lý AI cần tài khoản để lưu hội thoại và cá nhân hóa gợi ý theo hành trình.</p>
              <Link to="/login" className="mt-5 rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Đăng nhập</Link>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#fffdfc_0%,#fff8f7_100%)] p-3 sm:p-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[90%] gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-[#b7131a] text-white" : "bg-white text-[#b7131a] ring-1 ring-[#f0d8d5]"}`}>
                        {message.role === "user" ? "Bạn".slice(0, 1) : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-3xl px-4 py-3 shadow-sm ${message.role === "user" ? "rounded-tr-lg bg-[#b7131a] text-white shadow-[#b7131a]/15" : "rounded-tl-lg bg-white text-[#1a1c1e] ring-1 ring-[#f0d8d5]"}`}>
                        <MiniMarkdown text={message.text} inverted={message.role === "user"} />
                      </div>
                    </div>
                  </div>
                ))}
                {loading && <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#5b5f61] ring-1 ring-[#f0d8d5]"><Bot className="h-4 w-4 text-[#b7131a]" /> AI đang soạn câu trả lời...</div>}
                {error && <div className="rounded-xl bg-[#fff1ef] px-3 py-2 text-xs font-bold text-[#b7131a]">{error}</div>}
              </div>

              <div className="border-t border-[#f0d8d5] bg-white p-3 sm:p-4">
                <div className="mb-3 flex gap-2 overflow-x-auto">
                  {quickPrompts.map((prompt) => <button key={prompt} onClick={() => submit(prompt)} disabled={loading} className="shrink-0 rounded-full bg-[#fff1ef] px-3 py-1.5 text-xs font-bold text-[#b7131a] ring-1 ring-[#f0d8d5] transition hover:bg-[#ffe5e1] disabled:opacity-60">{prompt}</button>)}
                </div>
                <form onSubmit={(event: FormEvent) => { event.preventDefault(); submit(); }} className="flex items-center gap-2 rounded-2xl border border-[#e2e2e5] bg-[#fffdfc] p-2 focus-within:border-[#b7131a]">
                  <input value={input} onChange={(event) => setInput(event.target.value)} disabled={loading} className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm outline-none disabled:text-[#8a7773]" placeholder="Hỏi nhanh về dịch thuật, metro, lịch trình..." />
                  <button disabled={loading || !input.trim()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b7131a] text-white transition hover:bg-[#991016] disabled:opacity-50" aria-label="Gửi câu hỏi">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </section>
      )}

      <button onClick={() => setOpen((value) => !value)} aria-label="Mở chat nhanh với trợ lý AI" className="group relative ml-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#b7131a] via-[#e03a2e] to-[#ff8a5c] text-white shadow-2xl shadow-[#b7131a]/35 ring-4 ring-white transition hover:-translate-y-1 hover:scale-105 md:h-[72px] md:w-[72px]">
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#b7131a]/25" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#087443] ring-2 ring-white">
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        <Bot className="h-8 w-8 transition group-hover:rotate-6 md:h-9 md:w-9" />
      </button>
    </div>
  );
}

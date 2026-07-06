import { useState } from "react";
import { Link } from "react-router";
import { PublicLayout } from "../components/layout/PublicLayout";
import { getSession } from "../lib/auth";

type AiMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type MarkdownMessageProps = {
  text: string;
  inverted?: boolean;
};

const suggestions = [
  "Quét thực đơn",
  "Dịch biển báo này",
  "Đi chợ Bạch Mã như thế nào?",
  "Cảnh báo lừa đảo khi đi chợ",
  "Gợi ý lịch trình 1 ngày ở Quảng Châu",
];

function renderInlineMarkdown(text: string, inverted = false) {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index === undefined) continue;
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={`${token}-${match.index}`} className={`rounded px-1.5 py-0.5 text-[0.92em] ${inverted ? "bg-white/20 text-white" : "bg-white text-[#b7131a] ring-1 ring-[#f0d8d5]"}`}>{token.slice(1, -1)}</code>);
    } else {
      const label = token.match(/^\[([^\]]+)\]/)?.[1] ?? token;
      const href = token.match(/\(([^)]+)\)$/)?.[1] ?? "#";
      nodes.push(<a key={`${token}-${match.index}`} href={href} target="_blank" rel="noreferrer" className={`font-bold underline underline-offset-4 ${inverted ? "text-white" : "text-[#b7131a]"}`}>{label}</a>);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes.length ? nodes : text;
}

function MarkdownMessage({ text, inverted = false }: MarkdownMessageProps) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let codeLines: string[] = [];
  let inCodeBlock = false;

  const flushList = () => {
    if (listItems.length) {
      blocks.push(<ul key={`ul-${blocks.length}`} className="my-2 list-disc space-y-1 pl-5">{listItems.map((item, index) => <li key={`${item}-${index}`}>{renderInlineMarkdown(item, inverted)}</li>)}</ul>);
      listItems = [];
    }
    if (orderedItems.length) {
      blocks.push(<ol key={`ol-${blocks.length}`} className="my-2 list-decimal space-y-1 pl-5">{orderedItems.map((item, index) => <li key={`${item}-${index}`}>{renderInlineMarkdown(item, inverted)}</li>)}</ol>);
      orderedItems = [];
    }
  };

  const flushCode = () => {
    if (!codeLines.length) return;
    blocks.push(<pre key={`code-${blocks.length}`} className={`my-3 overflow-x-auto rounded-2xl p-4 text-sm leading-6 ${inverted ? "bg-white/15 text-white" : "bg-[#1a1c1e] text-white"}`}><code>{codeLines.join("\n")}</code></pre>);
    codeLines = [];
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) flushCode();
      else flushList();
      inCodeBlock = !inCodeBlock;
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushList();
      const Tag = heading[1].length === 1 ? "h3" : heading[1].length === 2 ? "h4" : "h5";
      blocks.push(<Tag key={`h-${blocks.length}`} className="mb-2 mt-3 font-bold tracking-[-0.02em]">{renderInlineMarkdown(heading[2], inverted)}</Tag>);
      return;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      orderedItems = [];
      listItems.push(bullet[1]);
      return;
    }

    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (ordered) {
      listItems = [];
      orderedItems.push(ordered[1]);
      return;
    }

    flushList();
    blocks.push(<p key={`p-${blocks.length}`} className="my-2 first:mt-0 last:mb-0">{renderInlineMarkdown(trimmed, inverted)}</p>);
  });

  flushList();
  flushCode();
  return <div className="markdown-message text-sm leading-7 md:text-base">{blocks}</div>;
}

export function AIAssistantPage() {
  const [session] = useState(() => getSession());
  const isLoggedIn = Boolean(session);
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Xin chào, tôi là trợ lý AI C-TourGuide. Tôi có thể giúp bạn dịch tiếng Trung, đọc thực đơn, gợi ý lịch trình và chuẩn bị đi chợ đầu mối.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  async function submit(value = input) {
    if (!isLoggedIn) return;
    const prompt = value.trim();
    if (!prompt || isThinking) return;
    const userMessage: AiMessage = { id: `u-${Date.now()}`, role: "user", text: prompt };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);
    setError("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Không thể kết nối AI");
      setMessages((current) => [...current, { id: `a-${Date.now()}`, role: "assistant", text: data.text || "Tôi chưa có câu trả lời phù hợp." }]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Không thể kết nối AI";
      setError(message);
      setMessages((current) => [...current, { id: `a-${Date.now()}`, role: "assistant", text: `Tôi chưa thể trả lời lúc này: ${message}. Vui lòng kiểm tra cấu hình AI hoặc thử lại sau.` }]);
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <PublicLayout>
      <main className="mx-auto grid w-full max-w-7xl flex-1 items-start gap-6 px-4 py-8 md:grid-cols-[320px_1fr] md:px-8">
        <aside className="h-fit rounded-3xl bg-[#f8f3f2] p-5">
          <h1 className="text-2xl font-bold">Trợ lý AI</h1>
          <p className="mt-2 text-sm leading-6 text-[#5b5f61]">Trợ lý thông minh cho các tình huống người Việt thường gặp khi đi Trung Quốc.</p>
          <div className="mt-5 flex flex-col gap-2">
            {suggestions.map((item) => (
              <button key={item} disabled={!isLoggedIn} onClick={() => submit(item)} className="rounded-xl bg-white px-4 py-3 text-left text-sm font-semibold shadow-sm hover:bg-[#fff1ef] disabled:opacity-60">
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-[#f0d8d5] bg-white p-4 text-xs leading-5 text-[#5b5f61]">
            C-TourGuide AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng như vé, địa chỉ, pháp lý thanh toán và quy định địa phương.
          </div>
        </aside>

        <section className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-[#ece2e0] bg-white shadow-sm" style={{ height: "clamp(560px, calc(100vh - 220px), 760px)" }}>
          {!isLoggedIn && (
            <div className="border-b border-[#f0d8d5] bg-[#fff8f7] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#b7131a]">Đăng nhập để sử dụng trợ lý AI</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5b403d]">Trợ lý AI cần tài khoản để lưu hội thoại, cá nhân hóa gợi ý theo hành trình và hỗ trợ các chức năng dịch ảnh, giọng nói.</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link to="/login" className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Đăng nhập</Link>
                  <Link to="/register" className="rounded-xl border border-[#b7131a] px-5 py-3 font-bold text-[#b7131a]">Tạo tài khoản</Link>
                </div>
              </div>
            </div>
          )}
          <div className="border-b border-[#ece2e0] p-5">
            <h2 className="text-xl font-bold">Hội thoại</h2>
            <p className="mt-1 text-sm text-[#5b5f61]">Hỗ trợ câu hỏi văn bản, hình ảnh, camera và giọng nói trong hành trình.</p>
            {error && <p className="mt-2 rounded-xl bg-[#fff1ef] px-3 py-2 text-sm font-semibold text-[#b7131a]">{error}</p>}
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-[#b7131a] text-white" : "bg-[#f2f2f4] text-[#1a1c1e]"}`}>
                  <MarkdownMessage text={message.text} inverted={message.role === "user"} />
                </div>
              </div>
            ))}
            {isThinking && <div className="text-sm font-semibold text-[#5b5f61]">AI đang soạn câu trả lời...</div>}
          </div>
          <div className="border-t border-[#ece2e0] p-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex gap-2">
                <button disabled={!isLoggedIn} className="rounded-xl border border-[#e2e2e5] px-4 py-3 font-bold text-[#5b403d] disabled:opacity-60">Ảnh</button>
                <button disabled={!isLoggedIn} className="rounded-xl border border-[#e2e2e5] px-4 py-3 font-bold text-[#5b403d] disabled:opacity-60">Voice</button>
              </div>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit();
                }}
                disabled={!isLoggedIn || isThinking}
                placeholder={isLoggedIn ? "Hỏi về dịch thuật, metro, chợ đầu mối..." : "Đăng nhập để đặt câu hỏi cho trợ lý AI"}
                className="flex-1 rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a] disabled:bg-[#f8f3f2] disabled:text-[#8a7773]"
              />
              {isLoggedIn ? <button onClick={() => submit()} disabled={isThinking} className="rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white disabled:opacity-60">{isThinking ? "Đang gửi" : "Gửi"}</button> : <Link to="/login" className="rounded-xl bg-[#b7131a] px-6 py-3 text-center font-bold text-white">Đăng nhập</Link>}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

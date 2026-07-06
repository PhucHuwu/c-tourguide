import { useState } from "react";
import { Link } from "react-router";
import { PublicLayout } from "../components/layout/PublicLayout";
import { getSession } from "../lib/auth";

type AiMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const suggestions = [
  "Quét thực đơn",
  "Dịch biển báo này",
  "Đi chợ Bạch Mã như thế nào?",
  "Cảnh báo lừa đảo khi đi chợ",
  "Gợi ý lịch trình 1 ngày ở Quảng Châu",
];

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
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 leading-7 ${message.role === "user" ? "bg-[#b7131a] text-white" : "bg-[#f2f2f4] text-[#1a1c1e]"}`}>
                  {message.text}
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

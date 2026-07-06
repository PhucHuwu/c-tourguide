import { useState } from "react";
import { Link } from "react-router";

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

function answerFor(prompt: string) {
  const normalized = prompt.toLowerCase();
  if (normalized.includes("bạch mã") || normalized.includes("chợ")) {
    return "Nếu đi chợ Bạch Mã lần đầu, bạn nên đi từ 8:30-11:30, chuẩn bị ảnh mẫu sản phẩm, hỏi rõ MOQ, giá theo số lượng và điều kiện đổi trả. Nếu không giỏi tiếng Trung, nên đi cùng guide biết mặc cả để tránh đặt cọc khi chưa kiểm mẫu.";
  }
  if (normalized.includes("lừa đảo") || normalized.includes("cảnh báo")) {
    return "Các rủi ro phổ biến: báo giá thấp nhưng đổi chất lượng khi giao, yêu cầu đặt cọc cao, không cho kiểm hàng, phí vận chuyển phát sinh và nhầm địa chỉ kho. Luôn chụp lại bill, WeChat cửa hàng, vị trí quầy và xác nhận điều kiện đổi trả.";
  }
  if (normalized.includes("thực đơn") || normalized.includes("biển báo") || normalized.includes("dịch")) {
    return "Bạn có thể tải ảnh thực đơn/biển báo lên. Bản demo này sẽ mô phỏng kết quả dịch: món chính, nguyên liệu, mức cay, giá và câu nên hỏi bằng tiếng Trung.";
  }
  if (normalized.includes("lịch trình")) {
    return "Lịch trình gợi ý: sáng đi chợ Bạch Mã, trưa ăn gần ga Guangzhou Railway, chiều qua Sha He để khảo giá, tối tổng hợp mẫu và gửi kho. Nên đặt guide tối thiểu nửa ngày nếu đây là lần đầu đi.";
  }
  return "Mình có thể hỗ trợ dịch Việt - Trung, gợi ý lịch trình, giải thích cách đi metro, cảnh báo rủi ro và chuẩn bị checklist trước khi đi Trung Quốc. Đây là phản hồi mô phỏng frontend.";
}

export function AIAssistantPage() {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Xin chào, tôi là trợ lý AI C-TourGuide. Tôi có thể giúp bạn dịch tiếng Trung, đọc thực đơn, gợi ý lịch trình và chuẩn bị đi chợ đầu mối.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  function submit(value = input) {
    const prompt = value.trim();
    if (!prompt) return;
    const userMessage: AiMessage = { id: `u-${Date.now()}`, role: "user", text: prompt };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: `a-${Date.now()}`, role: "assistant", text: answerFor(prompt) }]);
      setIsThinking(false);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-[#fffdfc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <header className="border-b border-[#f0d8d5] bg-white px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#b7131a]">C-TourGuide</Link>
          <nav className="hidden gap-6 text-sm font-semibold text-[#5b5f61] md:flex">
            <Link to="/guides">Tìm guide</Link>
            <Link to="/markets">Đánh hàng</Link>
            <Link to="/handbook">Cẩm nang</Link>
            <Link to="/map">Bản đồ</Link>
          </nav>
          <Link to="/guide-register" className="rounded-xl bg-[#b7131a] px-4 py-2 text-sm font-bold text-white">Đăng ký làm guide</Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[320px_1fr] md:px-8">
        <aside className="h-fit rounded-3xl bg-[#f8f3f2] p-5">
          <h1 className="text-2xl font-bold">Trợ lý AI</h1>
          <p className="mt-2 text-sm leading-6 text-[#5b5f61]">Mock assistant cho các tình huống người Việt thường gặp khi đi Trung Quốc.</p>
          <div className="mt-5 flex flex-col gap-2">
            {suggestions.map((item) => (
              <button key={item} onClick={() => submit(item)} className="rounded-xl bg-white px-4 py-3 text-left text-sm font-semibold shadow-sm hover:bg-[#fff1ef]">
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-[#f0d8d5] bg-white p-4 text-xs leading-5 text-[#5b5f61]">
            C-TourGuide AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng như vé, địa chỉ, pháp lý thanh toán và quy định địa phương.
          </div>
        </aside>

        <section className="flex min-h-[680px] flex-col rounded-3xl border border-[#ece2e0] bg-white shadow-sm">
          <div className="border-b border-[#ece2e0] p-5">
            <h2 className="text-xl font-bold">Hội thoại demo</h2>
            <p className="mt-1 text-sm text-[#5b5f61]">Có hỗ trợ text, ảnh/camera/voice ở mức mô phỏng giao diện.</p>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
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
                <button className="rounded-xl border border-[#e2e2e5] px-4 py-3 font-bold text-[#5b403d]">Ảnh</button>
                <button className="rounded-xl border border-[#e2e2e5] px-4 py-3 font-bold text-[#5b403d]">Voice</button>
              </div>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit();
                }}
                placeholder="Hỏi về dịch thuật, metro, chợ đầu mối..."
                className="flex-1 rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]"
              />
              <button onClick={() => submit()} className="rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white">Gửi</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

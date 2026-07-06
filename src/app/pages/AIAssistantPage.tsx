import { Link } from "react-router";
import { useState } from "react";
import svgPaths from "@/assets/generated/ai-assistant/svg-paths";

const suggestionChips = [
  { icon: svgPaths.p3470b200, text: "Quét thực đơn" },
  { icon: svgPaths.p2cad85c0, text: "Dịch biển báo này" },
  { icon: svgPaths.pc77cc00, text: "Đi chợ Bạch Mã như thế nào?" },
  { icon: svgPaths.p30f20700, text: "Quán ăn gần tôi" },
  { icon: svgPaths.p10d9fd00, text: "Cảnh báo lừa đảo" },
];

export function AIAssistantPage() {
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-white isolate">
      {/* ── Top Navigation ── */}
      <header className="bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] px-[40px] py-[16px] z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-black text-[16px] leading-[24px]">
            C-TourGuide
          </Link>

          {/* Navigation */}
          <nav className="flex gap-[32px] items-center">
            <Link to="/search" className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] hover:opacity-70 transition-opacity">
              Search
            </Link>
            <Link to="/handbook" className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] hover:opacity-70 transition-opacity">
              Handbook
            </Link>
            <Link to="/map" className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] hover:opacity-70 transition-opacity">
              Map
            </Link>
            <Link to="/sourcing" className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] hover:opacity-70 transition-opacity">
              Sourcing
            </Link>
            <div className="relative pb-[6px] border-b-2 border-[#e5e7eb] opacity-80">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-black text-[16px] leading-[24px]">AI</span>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex gap-[16px] items-center">
            <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPaths.p164b49c0} fill="black" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p1fe7b600} fill="black" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p3de21300} fill="black" />
              </svg>
            </button>
            <Link
              to="/dashboard"
              className="px-[16px] py-[8px] rounded-[8px] font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] hover:bg-[#f3f3f6] transition-colors"
            >
              Register as Guide
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content - Chat Interface ── */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Decorative Blur Elements */}
        <div className="absolute left-[40px] top-1/4 bottom-[48.98%] w-[256px] rounded-full bg-gradient-to-r from-purple-200 to-pink-200 blur-[40px] opacity-20 mix-blend-multiply" />
        <div className="absolute right-[40px] top-[33.33%] bottom-[37.4%] w-[288px] rounded-full bg-gradient-to-r from-blue-200 to-purple-200 blur-[40px] opacity-20 mix-blend-multiply" />

        <div className="max-w-[768px] w-full px-[40px] flex flex-col items-center justify-center gap-[32px] pb-[32px] relative z-10">
          {/* Welcome Message */}
          <div className="text-center">
            <h1 className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] mb-[4px]">
              Xin chào, tôi có thể giúp gì cho bạn?
            </h1>
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px]">
              Trợ lý du lịch thông minh tại Trung Quốc
            </p>
          </div>

          {/* Chat Container */}
          <div className="w-full relative">
            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-[12px] justify-center mb-[16px]">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-[8px] px-[17px] py-[9px] rounded-full border border-[#e5e7eb] bg-white hover:bg-[#f9f9f9] transition-colors"
                >
                  <svg className="w-[14px] h-[14px] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d={chip.icon} fill="black" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] whitespace-nowrap">
                    {chip.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="relative">
              <div className="backdrop-blur-[5px] bg-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.3)] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-[9px]">
                <div className="flex items-end gap-[8px]">
                  {/* Textarea */}
                  <div className="flex-1 min-h-[56px] max-h-[128px] overflow-auto">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Nhập câu hỏi hoặc yêu cầu..."
                      className="w-full min-h-[56px] max-h-[128px] px-[16px] pt-[12px] pb-[20px] bg-transparent font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] placeholder:text-[#6b7280] outline-none resize-none"
                      rows={1}
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between px-[8px] pb-[8px]">
                      <div className="flex gap-[8px]">
                        {/* Image Upload */}
                        <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
                          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                            <path d={svgPaths.p27589980} fill="black" />
                          </svg>
                        </button>

                        {/* Camera */}
                        <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
                          <svg className="w-[20px] h-[18px]" fill="none" viewBox="0 0 20 18">
                            <path d={svgPaths.p15b83880} fill="black" />
                          </svg>
                        </button>

                        {/* Voice */}
                        <button className="p-[8px] rounded-full hover:bg-[#f3f3f6] transition-colors">
                          <svg className="w-[14px] h-[19px]" fill="none" viewBox="0 0 14 19">
                            <path d={svgPaths.p39e29d00} fill="black" />
                          </svg>
                        </button>
                      </div>

                      {/* Send Button */}
                      <button className="p-[12px] rounded-full bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_10px_-1px_rgba(0,0,0,0.15)] transition-shadow">
                        <svg className="w-[19px] h-[16px]" fill="none" viewBox="0 0 19 16">
                          <path d={svgPaths.p8d35f80} fill="black" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-black text-[16px] leading-[24px] text-center mt-[8px]">
                C-TourGuide AI có thể mắc lỗi. Vui lòng kiểm tra lại các thông tin quan trọng.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from "react-router";
import svgPathsSourcing from "@/assets/generated/sourcing-logistics/svg-paths";
import heroImage from "@/assets/generated/sourcing-logistics/sourcing-hero.png";
import marketBg from "@/assets/generated/sourcing-logistics/market-background.png";

const markets = [
  {
    category: "Apparel & Textiles",
    icon: svgPathsSourcing.p19d3b780,
    iconBg: "#CCE4E9",
    iconColor: "#006578",
    name: "Guangzhou Baima Market",
    description: "Premium women's fashion and export-quality garments. High volume negotiation required.",
    location: "Guangzhou",
    tier: "High-End",
    image: marketBg,
  },
  {
    category: "Electronics",
    icon: svgPathsSourcing.p102b9700,
    iconBg: "#CCE4E9",
    iconColor: "#006578",
    name: "Huaqiangbei Electronics",
    description: "The world's largest hardware hub. Components, consumer tech, and prototypes.",
    location: "Shenzhen",
    tier: "",
    image: "",
  },
  {
    category: "Furniture",
    icon: svgPathsSourcing.p34fa700,
    iconBg: "#FFDAD6",
    iconColor: "#B7131A",
    name: "Foshan Lecong",
    description: "",
    location: "",
    tier: "",
    image: "",
  },
  {
    category: "Cosmetics",
    icon: svgPathsSourcing.p6c0a880,
    iconBg: "#FFE5B4",
    iconColor: "#8B6914",
    name: "Guangzhou Xingfa",
    description: "",
    location: "",
    tier: "",
    image: "",
  },
];

export function SourcingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9fc]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#f9f9fc] border-b border-[#e2e2e5] px-[40px] py-[8px]">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[32px] tracking-[-0.64px] whitespace-nowrap leading-[52.8px]">
            C-TourGuide
          </Link>

          {/* Navigation */}
          <nav className="flex gap-[32px] items-center">
            <Link to="/search" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Search
            </Link>
            <Link to="/handbook" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Handbook
            </Link>
            <Link to="/map" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Map
            </Link>
            <div className="relative pb-[6px] border-b-2 border-[#b7131a]">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">Sourcing</span>
            </div>
            <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              AI
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex gap-[16px] items-center">
            <button className="p-[8px] rounded-full hover:bg-white transition-colors">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPathsSourcing.p164b49c0} fill="#B7131A" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-white transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsSourcing.p1fe7b600} fill="#B7131A" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-white transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsSourcing.p3de21300} fill="#B7131A" />
              </svg>
            </button>
            <Link
              to="/guide-register"
              className="bg-[#b7131a] px-[16px] py-[8px] rounded-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px] hover:bg-[#db322f] transition-colors"
            >
              Đăng ký làm guide
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="bg-white px-[40px] py-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-[80px] items-center">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[48px] leading-[52.8px] tracking-[-0.96px] mb-[24px]">
                Đi Trung Quốc đánh hàng
                <br />
                dễ hơn
              </h1>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b403d] text-[18px] leading-[28.8px] mb-[32px]">
                Tìm chợ đầu mối, thuê guide biết mặc cả
                <br />
                và kết nối kho vận tin cậy tại Trung Quốc.
              </p>

              <div className="flex gap-[16px]">
                <button className="bg-[#b7131a] flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] hover:bg-[#db322f] transition-colors drop-shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
                  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                    <path d={svgPathsSourcing.p8a35e00} fill="white" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px]">Tìm chợ</span>
                </button>
                <button className="border border-[#b7131a] px-[24px] py-[12px] rounded-[8px] hover:bg-[#fff5f5] transition-colors">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px]">Thuê guide</span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1">
              <div className="bg-white rounded-[12px] overflow-hidden drop-shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
                <img src={heroImage} alt="Business meeting" className="w-full h-[400px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wholesale Market Directory ── */}
      <section className="px-[40px] py-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[40px] leading-[48px] tracking-[-0.8px] mb-[48px]">
            Danh sách chợ đầu mối
          </h2>

          {/* Market Grid */}
          <div className="grid grid-cols-2 gap-[24px]">
            {/* First Two Large Cards */}
            {markets.slice(0, 2).map((market, idx) => (
              <div key={idx} className="bg-white border border-[#e2e2e5] rounded-[12px] overflow-hidden drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:drop-shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
                {/* Category Badge */}
                <div className="p-[24px] pb-[16px]">
                  <div className="flex items-center gap-[8px] mb-[16px]">
                    <div className="flex items-center justify-center rounded-[6px] size-[32px]" style={{ backgroundColor: market.iconBg }}>
                      <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                        <path d={market.icon} fill={market.iconColor} />
                      </svg>
                    </div>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#006578] text-[12px] tracking-[0.5px] uppercase">{market.category}</span>
                  </div>

                  <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[28.8px] mb-[8px]">{market.name}</h3>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px] leading-[22.4px] mb-[16px]">{market.description}</p>

                  <div className="flex items-center gap-[12px] mb-[16px]">
                    {market.location && (
                      <span className="bg-[#f3f3f6] px-[12px] py-[4px] rounded-full font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{market.location}</span>
                    )}
                    {market.tier && (
                      <span className="bg-[#f3f3f6] px-[12px] py-[4px] rounded-full font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{market.tier}</span>
                    )}
                  </div>
                </div>

                {/* Market Image */}
                {market.image && (
                  <div className="relative h-[200px] bg-[#f3f3f6]">
                    <img src={market.image} alt={market.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* View Map Link */}
                <div className="p-[20px] border-t border-[#e2e2e5] flex items-center justify-between">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px]">Xem bản đồ</span>
                  <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                    <path d={svgPathsSourcing.p5e94780} fill="#B7131A" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Bottom Row - 2 Small + 1 Large CTA */}
            <div className="col-span-2 grid grid-cols-[1fr_1fr_1.2fr] gap-[24px]">
              {/* Small Cards */}
              {markets.slice(2, 4).map((market, idx) => (
                <div key={idx} className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:drop-shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all cursor-pointer">
                  <div className="flex items-center gap-[12px] mb-[16px]">
                    <div className="flex items-center justify-center rounded-[6px] size-[40px]" style={{ backgroundColor: market.iconBg }}>
                      <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                        <path d={market.icon} fill={market.iconColor} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[16px] leading-[19.2px] mb-[2px]">{market.name.split(" ")[0]}</div>
                      <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{market.name.split(" ").slice(1).join(" ")}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Browse All Markets CTA */}
              <div className="bg-[#b7131a] rounded-[12px] p-[32px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#db322f] transition-colors drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                <div className="bg-white/20 rounded-full size-[64px] flex items-center justify-center mb-[16px]">
                  <svg className="w-[32px] h-[32px]" fill="none" viewBox="0 0 32 32">
                    <path d={svgPathsSourcing.p75a7900} fill="white" />
                  </svg>
                </div>
                <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-white text-[24px] leading-[28.8px] mb-[8px]">Xem tất cả chợ</h3>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-white/80 text-[14px]">Khám phá các nguồn hàng nổi bật</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#e8e8ec] border-t border-[#e2e2e5] px-[40px] py-[32px] mt-auto">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[24px] tracking-[-0.48px]">C-TourGuide</div>
            <div className="flex gap-[32px]">
              {["Terms of Service", "Privacy Policy", "Contact Support", "Sitemap"].map((link) => (
                <a key={link} href="#" className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px] hover:text-[#b7131a] transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-[16px] text-center">
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">© 2024 C-TourGuide. The Sophisticated Guide to China.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

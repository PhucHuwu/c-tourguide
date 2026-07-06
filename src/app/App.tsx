import { BrowserRouter, Routes, Route, Link } from "react-router";
import { useState, useEffect } from "react";
import { GuideDashboard } from "./pages/GuideDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { MapPage } from "./pages/MapPage";
import { SourcingPage } from "./pages/SourcingPage";
import { RevenueDashboard } from "./pages/RevenueDashboard";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import svgPathsBooking from "@/assets/generated/booking-tracking/svg-paths";
import svgMsg from "@/assets/generated/messages/svg-paths";
import msgUserAvatar from "@/assets/generated/messages/user-avatar.png";
import msgLiWeiConv from "@/assets/generated/messages/li-wei-conversation.png";
import msgConv2 from "@/assets/generated/messages/conversation-2.png";
import msgConv3 from "@/assets/generated/messages/conversation-3.png";
import msgGuideHeader from "@/assets/generated/messages/guide-header.png";
import msgLocationMap from "@/assets/generated/messages/location-map.png";
import msgGuideMsg from "@/assets/generated/messages/guide-message.png";

import svgPathsHome from "@/assets/generated/home/svg-paths";
import heroImg from "@/assets/generated/home/hero-local-guide.png";

import svgPathsProfile from "@/assets/generated/guide-profile/svg-paths";
import headerBg from "@/assets/generated/guide-profile/profile-header-background.png";
import avatarImg from "@/assets/generated/guide-profile/guide-avatar.png";
import galleryLarge from "@/assets/generated/guide-profile/gallery-large.png";
import galleryTopRight from "@/assets/generated/guide-profile/gallery-top-right.png";
import galleryBottomRight from "@/assets/generated/guide-profile/gallery-bottom-right.png";

import svgPathsSearch from "@/assets/generated/guide-search/svg-paths";
import guidePhoto1 from "@/assets/generated/guide-search/guide-photo-1.png";
import guidePhoto2 from "@/assets/generated/guide-search/guide-photo-2.png";

import svgPathsHandbook from "@/assets/generated/travel-handbook/svg-paths";
import metroImg from "@/assets/generated/travel-handbook/metro-guide.png";

import svgPathsDashboard from "@/assets/generated/guide-dashboard/svg-paths";
import userAvatar from "@/assets/generated/guide-dashboard/guide-avatar.png";
import clientAvatar from "@/assets/generated/guide-dashboard/client-avatar.png";

/* ─── Shared Header ──────────────────────────────────────────────────────── */

function Header({ activeLink }: { activeLink?: string }) {
  const navLinks = ["Search", "Handbook", "Map", "Sourcing", "AI"];
  return (
    <header className="sticky top-0 z-50 bg-[#f9f9fc] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex items-center justify-between px-[40px] py-[8px]">
          <Link
            to="/"
            className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[32px] tracking-[-0.64px] whitespace-nowrap leading-[52.8px]"
          >
            C-TourGuide
          </Link>

          <nav className="hidden md:flex gap-[24px] items-center">
            {navLinks.map((label) => {
              const isActive = activeLink === label;
              return (
                <a
                  key={label}
                  href="#"
                  className={
                    isActive
                      ? "font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px] border-b-2 border-[#b7131a] pb-[6px]"
                      : "font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors"
                  }
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex gap-[16px] items-center">
            <button className="flex items-center justify-center pb-[6px]">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPathsSearch.p164b49c0} fill="#5B5F61" />
              </svg>
            </button>
            <button className="flex items-center justify-center pb-[6px]">
              <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsSearch.p1fe7b600} fill="#5B5F61" />
              </svg>
            </button>
            <button className="flex items-center justify-center pb-[6px]">
              <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsSearch.p3de21300} fill="#5B5F61" />
              </svg>
            </button>
            <button className="bg-[#b7131a] px-[16px] py-[8px] rounded-[8px] hover:bg-[#9a1016] transition-colors">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] text-white tracking-[0.14px] whitespace-nowrap">
                Register as Guide
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Shared Footer ──────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-[#dadadc] border-t border-[#e4beb9] w-full">
      <div className="max-w-[1200px] mx-auto px-[40px] py-[32px] flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-[7px]">
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[20px] leading-[28px]">
            C-TourGuide
          </span>
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">
            © 2024 C-TourGuide. The Sophisticated Guide to China.
          </span>
        </div>
        <div className="flex gap-[16px] items-center flex-wrap">
          {["Terms of Service", "Privacy Policy", "Contact Support", "Sitemap"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[25.6px] whitespace-nowrap hover:text-[#b7131a] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(249,249,252)" }}>
      <Header />
      <main className="flex flex-col items-center flex-1">
        {/* Hero */}
        <section className="w-full px-[40px] pt-[80px] pb-[40px] max-w-[1200px] mx-auto">
          <div className="flex gap-[48px] items-center w-full">
            <div className="flex flex-col gap-[24px] flex-[1_0_0] min-w-0">
              <div className="flex flex-col font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[48px] tracking-[-0.96px] leading-[1.1]">
                <span>Khám phá Trung Quốc</span>
                <span>{"cùng "}<span className="text-[#b7131a]">Local Guide</span>{" đáng"}</span>
                <span>tin cậy</span>
              </div>
              <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[18px] leading-[1.6] max-w-[512px]">
                Kết nối ngay với hướng dẫn viên người Việt, phiên dịch viên và chuyên gia đánh hàng tại các thành phố lớn Trung Quốc. Trải nghiệm du lịch và công tác an toàn, trọn vẹn.
              </p>
              {/* Search bar */}
              <div className="bg-[#f9f9fc] drop-shadow-[0px_12px_20px_rgba(0,0,0,0.12)] rounded-[12px] border border-[rgba(228,190,185,0.3)] p-[25px] flex flex-col gap-[16px]">
                <div className="flex gap-[16px] items-start">
                  <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                    <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Thành phố</label>
                    <div className="relative w-full">
                      <div className="absolute left-[16px] top-[14px] w-[16px] h-[20px]">
                        <svg className="size-full" fill="none" viewBox="0 0 16 20"><path d={svgPathsHome.p1869180} fill="#5B5F61" /></svg>
                      </div>
                      <input type="text" placeholder="Bắc Kinh, Thượng Hải..." className="w-full bg-white border border-[#e2e2e5] rounded-[8px] pl-[41px] pr-[17px] py-[15px] font-['Be_Vietnam_Pro',sans-serif] text-[16px] text-[#1a1c1e] placeholder:text-[#c4c7ca] outline-none focus:border-[#b7131a] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                    <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Ngày đi</label>
                    <div className="relative w-full">
                      <div className="absolute left-[15px] top-[14px] w-[18px] h-[20px]">
                        <svg className="size-full" fill="none" viewBox="0 0 18 20"><path d={svgPathsHome.p3c95900} fill="#5B5F61" /></svg>
                      </div>
                      <input type="text" placeholder="Chọn ngày..." className="w-full bg-white border border-[#e2e2e5] rounded-[8px] pl-[41px] pr-[17px] py-[15px] font-['Be_Vietnam_Pro',sans-serif] text-[16px] text-[#1a1c1e] placeholder:text-[#c4c7ca] outline-none focus:border-[#b7131a] transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] flex-1 min-w-0">
                    <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Loại dịch vụ</label>
                    <div className="relative w-full">
                      <div className="absolute left-[17px] top-[14px] w-[16px] h-[20px]">
                        <svg className="size-full" fill="none" viewBox="0 0 16 20"><path d={svgPathsHome.p1e726640} fill="#5B5F61" /></svg>
                      </div>
                      <select className="w-full appearance-none bg-white border border-[#e2e2e5] rounded-[8px] pl-[41px] pr-[32px] py-[15px] font-['Be_Vietnam_Pro',sans-serif] text-[16px] text-[#1a1c1e] outline-none focus:border-[#b7131a] transition-colors cursor-pointer">
                        <option value="guide">Thuê Local Guide</option>
                        <option value="sourcing">Đánh hàng</option>
                        <option value="handbook">Cẩm nang</option>
                        <option value="ai">AI Phiên dịch</option>
                      </select>
                      <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="size-[20px]" fill="none" viewBox="0 0 24 24"><path d="M7.2 9.6L12 14.4L16.8 9.6" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/search" className="w-full bg-[#b7131a] rounded-[8px] py-[12px] flex items-center justify-center gap-[8px] hover:bg-[#9a1016] transition-colors">
                  <svg className="size-[18px]" fill="none" viewBox="0 0 18 18"><path d={svgPathsHome.p8a35e00} fill="white" /></svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] text-white tracking-[0.14px]">Tìm Guide</span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block flex-[1_0_0] min-w-0 rounded-[32px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.12)] overflow-hidden h-[520px]">
              <img src={heroImg} alt="Local Guide tại Trung Quốc" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-[#f3f3f6] w-full py-[96px]">
          <div className="max-w-[1200px] mx-auto px-[40px] flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[15px] items-center w-full">
              <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[24px] leading-[1.3] text-center">Dịch vụ của chúng tôi</h2>
              <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[1.6] text-center">Hỗ trợ toàn diện cho mọi nhu cầu di chuyển tại Trung Quốc</p>
            </div>
            <div className="flex gap-[24px] items-stretch w-full">
              {[
                { path: svgPathsHome.p33f99400, vb: "0 0 22 16", label: "Thuê Local Guide" },
                { path: svgPathsHome.p725c500, vb: "0 0 20.0939 18", label: "Đánh hàng" },
                { path: svgPathsHome.p2b6c7500, vb: "0 0 22 16", label: "Cẩm nang" },
                { path: svgPathsHome.p24855620, vb: "0 0 22 19", label: "AI Phiên dịch" },
              ].map(({ path, vb, label }) => (
                <div key={label} className="bg-[#f9f9fc] flex-1 min-w-0 rounded-[12px] border border-[rgba(226,226,229,0.5)] flex flex-col items-center p-[25px] gap-[16px] hover:shadow-md transition-shadow cursor-pointer">
                  <div className="bg-[rgba(219,50,47,0.1)] rounded-full size-[48px] flex items-center justify-center shrink-0">
                    <svg className="size-[22px]" fill="none" viewBox={vb}><path d={path} fill="#B7131A" /></svg>
                  </div>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[1.4] text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const guides = [
  {
    photo: guidePhoto1,
    name: "Nguyễn Thu Hà",
    city: "Thượng Hải, Hàng Châu",
    price: "$120",
    bio: "Xin chào! Mình là Hà, du học sinh và sinh sống tại Thượng Hải 5 năm. Chuyên dẫn tour gia đình, nhóm bạn trẻ và hỗ trợ tìm nguồn hàng thời…",
    tags: ["Tiếng Trung HSK6", "Có xe 4 chỗ", "Đánh hàng"],
    rating: "4.9",
    reviews: "(42)",
    response: "98%",
  },
  {
    photo: guidePhoto2,
    name: "Trần Minh Hoàng",
    city: "Bắc Kinh, Thiên Tân",
    price: "$150",
    bio: "Kinh nghiệm 8 năm làm HDV tại Bắc Kinh. Am hiểu sâu sắc văn hóa, lịch sử Tử Cấm Thành, Vạn Lý Trường Thành. Cung cấp trải nghiệm VIP, không xô…",
    tags: ["Chuyên Lịch sử", "Có xe 7 chỗ", "Tour VIP"],
    rating: "5.0",
    reviews: "(89)",
    response: "100%",
  },
];

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <div className="bg-[#f9f9fc] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.02)] rounded-[12px] border border-[#e2e2e5] w-full shrink-0">
      <div className="flex gap-[16px] items-start p-[17px]">
        {/* Photo */}
        <div className="rounded-[8px] size-[192px] overflow-hidden shrink-0">
          <img src={guide.photo} alt={guide.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0 self-stretch">
          <div className="flex flex-col gap-[8px]">
            {/* Name + price row */}
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col gap-[4px]">
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px] whitespace-nowrap">
                  {guide.name}
                </span>
                <div className="flex items-center gap-[6px]">
                  <svg className="w-[9.33px] h-[11.67px] shrink-0" fill="none" viewBox="0 0 9.33333 11.6667">
                    <path d={svgPathsSearch.p3d8f00c0} fill="#5B5F61" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[25.6px] whitespace-nowrap">
                    {guide.city}
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-[4px] shrink-0 ml-4">
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[20px] leading-[28px]">
                  {guide.price}
                </span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">
                  /ngày
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px] line-clamp-2">
              {guide.bio}
            </p>

            {/* Tags */}
            <div className="flex gap-[8px] flex-wrap">
              {guide.tags.map((tag) => (
                <span key={tag} className="bg-[#eeeef0] rounded-[4px] px-[8px] pt-[3px] pb-[4.8px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px] whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom row: rating + buttons */}
          <div className="flex items-center justify-between pt-[9px] border-t border-[#e2e2e5] mt-[16px]">
            <div className="flex gap-[16px] items-center">
              <div className="flex gap-[4px] items-center">
                <svg className="w-[11.67px] h-[11.08px]" fill="none" viewBox="0 0 11.6667 11.0833">
                  <path d={svgPathsSearch.p21398000} fill="#EAB308" />
                </svg>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px]">
                  {guide.rating}
                </span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">
                  {guide.reviews}
                </span>
              </div>
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">
                {"Phản hồi: "}<span className="text-[#1a1c1e]">{guide.response}</span>
              </span>
            </div>
            <div className="flex gap-[8px] items-center">
              <Link
                to="/guide"
                className="flex items-center justify-center px-[17px] py-[9px] rounded-[8px] border border-[#b7131a] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px] whitespace-nowrap hover:bg-[rgba(183,19,26,0.05)] transition-colors"
              >
                Hồ sơ
              </Link>
              <button className="bg-[#b7131a] flex items-center justify-center px-[16px] py-[9px] rounded-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px] whitespace-nowrap hover:bg-[#9a1016] transition-colors">
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPage() {
  const [city, setCity] = useState("all");
  const [langs, setLangs] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  const toggleLang = (l: string) =>
    setLangs((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);

  const toggleService = (s: string) =>
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const langOptions = ["Tiếng Việt", "Tiếng Trung", "Tiếng Anh"];
  const serviceOptions = ["Xe riêng", "Hỗ trợ đánh hàng", "Xuất hóa đơn"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(249,249,252)" }}>
      <Header activeLink="Search" />

      <main className="flex flex-col items-center flex-1">
        <div className="max-w-[1200px] w-full px-[40px] py-[32px] flex gap-[24px] items-start">

          {/* ── Left sidebar: Filters ── */}
          <aside className="shrink-0 w-[280px] pt-[27.2px] pb-[52px]">
            <div className="bg-[#f9f9fc] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.02)] rounded-[12px] border border-[#e2e2e5] p-[17px] flex flex-col gap-[16px]">
              <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">
                Bộ lọc tìm kiếm
              </h2>

              {/* City */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px]">
                  Thành phố
                </label>
                <div className="relative w-full">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] px-[13px] py-[9px] h-[48px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] outline-none focus:border-[#b7131a] transition-colors cursor-pointer"
                  >
                    <option value="all">Tất cả thành phố</option>
                    <option value="beijing">Bắc Kinh</option>
                    <option value="shanghai">Thượng Hải</option>
                    <option value="guangzhou">Quảng Châu</option>
                  </select>
                  <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="size-[21px]" fill="none" viewBox="0 0 21 21">
                      <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Language */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px]">
                  Ngôn ngữ
                </label>
                <div className="flex flex-wrap gap-[8px]">
                  {langOptions.map((lang) => {
                    const active = langs.includes(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => toggleLang(lang)}
                        className={`px-[12px] py-[4px] rounded-full font-['Be_Vietnam_Pro',sans-serif] font-normal text-[12px] leading-[16.8px] transition-colors whitespace-nowrap ${
                          active
                            ? "bg-[#b7131a] text-white"
                            : "bg-[#e0e3e6] text-[#626567] hover:bg-[#d0d3d6]"
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price range */}
              <div className="flex flex-col gap-[10px]">
                <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px]">
                  Mức giá (/ngày)
                </label>
                <input type="range" min={50} max={500} defaultValue={250} className="w-full accent-[#b7131a]" />
                <div className="flex justify-between">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">$50</span>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">$500+</span>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-[#e2e2e5] w-full" />

              {/* Special services */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px]">
                  Dịch vụ đặc biệt
                </label>
                <div className="flex flex-col gap-[8px]">
                  {serviceOptions.map((svc) => {
                    const checked = services.includes(svc);
                    return (
                      <label key={svc} className="flex items-center gap-[8px] cursor-pointer h-[25.59px]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(svc)}
                          className="w-[16px] h-[16px] rounded-[4px] border border-[#6b7280] accent-[#b7131a] cursor-pointer shrink-0"
                        />
                        <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[25.6px] whitespace-nowrap">
                          {svc}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Right: Guide list ── */}
          <section className="flex flex-col gap-[16px] flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center justify-between w-full pb-[8px]">
              <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[24px] leading-[31.2px] whitespace-nowrap">
                Tìm thấy 124 Hướng dẫn viên
              </h1>
              <div className="relative shrink-0">
                <select className="appearance-none bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] px-[13px] py-[9px] h-[40px] pr-[32px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[14px] leading-[20px] outline-none focus:border-[#b7131a] transition-colors cursor-pointer">
                  <option>Sắp xếp: Nổi bật</option>
                  <option>Giá thấp nhất</option>
                  <option>Đánh giá cao nhất</option>
                </select>
                <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="size-[21px]" fill="none" viewBox="0 0 21 21">
                    <path d="M6.3 8.4L10.5 12.6L14.7 8.4" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cards */}
            {guides.map((g) => (
              <GuideCard key={g.name} guide={g} />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GUIDE PROFILE PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

function GuideProfilePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(249,249,252)" }}>
      <Header />
      <main className="flex flex-col items-center flex-1">
        <div className="max-w-[1200px] w-full px-[40px] py-[32px] flex flex-col gap-[32px]">

          {/* Header banner */}
          <div className="bg-[rgba(255,255,255,0)] h-[400px] overflow-hidden relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full shrink-0">
            <img alt="" src={headerBg} className="absolute inset-0 w-full h-[152.58%] top-[-26.29%] object-cover max-w-none" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)] p-[32px] flex items-end">
              <div className="flex gap-[16px] items-center">
                <div className="relative rounded-full size-[128px] shrink-0">
                  <div className="overflow-hidden rounded-full size-full p-[4px]">
                    <img src={avatarImg} alt="Trần Văn A" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="absolute inset-0 border-4 border-[#f9f9fc] rounded-full shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] pointer-events-none" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-white text-[24px] leading-[31.2px]">Trần Văn A</span>
                  <div className="flex gap-[8px] items-center flex-wrap">
                    <div className="flex gap-[6px] items-center">
                      <svg className="w-[9.33px] h-[11.67px] shrink-0" fill="none" viewBox="0 0 9.33333 11.6667">
                        <path d={svgPathsProfile.p3d8f00c0} fill="white" fillOpacity="0.9" />
                      </svg>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[rgba(255,255,255,0.9)] text-[16px] leading-[25.6px] whitespace-nowrap">Bắc Kinh</span>
                    </div>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[rgba(255,255,255,0.5)] text-[16px]">•</span>
                    <div className="flex gap-[6px] items-center">
                      <svg className="size-[12.25px] shrink-0" fill="none" viewBox="0 0 12.25 12.25">
                        <path d={svgPathsProfile.p2fcc87c0} fill="white" fillOpacity="0.9" />
                      </svg>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[rgba(255,255,255,0.9)] text-[16px] leading-[25.6px] whitespace-nowrap">5 năm kinh nghiệm</span>
                    </div>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[rgba(255,255,255,0.5)] text-[16px]">•</span>
                    <div className="flex gap-[6px] items-center">
                      <svg className="w-[12.83px] h-[12.25px] shrink-0" fill="none" viewBox="0 0 12.8333 12.25">
                        <path d={svgPathsProfile.p26f9d500} fill="white" fillOpacity="0.9" />
                      </svg>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[rgba(255,255,255,0.9)] text-[16px] leading-[25.6px] whitespace-nowrap">Chứng nhận Hướng dẫn viên Quốc gia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[32px] w-full">
            {/* About */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e2e2e5] w-full">
              <div className="flex flex-col gap-[16px] p-[33px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">Giới thiệu</h2>
                <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[26px]">
                  Xin chào! Tôi là Trần Văn A, một người đam mê văn hóa và lịch sử Trung Hoa. Với hơn 5 năm sinh sống và làm việc tại Bắc Kinh, tôi không chỉ thuộc nằm lòng những con phố cổ ngõ nhỏ (Hutong) mà còn hiểu rõ những câu chuyện đằng sau Tử Cấm Thành hùng vĩ. Tôi mong muốn mang đến cho bạn những trải nghiệm chân thực nhất, từ ẩm thực đường phố đặc sắc đến những góc khuất ít người biết của thủ đô ngàn năm văn hiến.
                </p>
                <div className="flex gap-[8px] flex-wrap">
                  {["Tiếng Việt (Bản xứ)", "Tiếng Trung (HSK 6)", "Tiếng Anh (Giao tiếp)"].map((lang) => (
                    <span key={lang} className="bg-[#eeeef0] rounded-full px-[12px] py-[4px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] whitespace-nowrap">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e2e2e5] w-full">
              <div className="flex flex-col gap-[16px] p-[33px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">Kinh nghiệm chuyên môn</h2>
                <div className="relative pl-[26px] border-l-2 border-[rgba(183,19,26,0.3)] flex flex-col gap-[32px]">
                  <div className="relative">
                    <div className="absolute left-[-33px] top-[4px] size-[12px] rounded-full bg-[#b7131a] shadow-[0px_0px_0px_4px_white]" />
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px] mb-[4px]">Chuyên gia Tour Lịch sử Bắc Kinh</p>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px] mb-[4px]">2020 - Hiện tại</p>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[25.6px]">Dẫn dắt hàng trăm đoàn khách Việt Nam tham quan Tử Cấm Thành, Vạn Lý Trường Thành, Di Hòa Viên. Cung cấp kiến thức chuyên sâu về triều đại Minh - Thanh.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute left-[-33px] top-[4px] size-[12px] rounded-full bg-[#e0e3e6] shadow-[0px_0px_0px_4px_white]" />
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px] mb-[4px]">{`Điều hành Tour Tự do (Free & Easy)`}</p>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px] mb-[4px]">2018 - 2020</p>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[25.6px]">Hỗ trợ lên lịch trình cá nhân hóa, đặt phòng, mua vé và tư vấn ẩm thực địa phương cho khách du lịch tự túc.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e2e2e5] w-full">
              <div className="flex flex-col gap-[16px] p-[33px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">Ảnh chuyến đi</h2>
                <div className="grid grid-cols-3 gap-[8px]" style={{ gridTemplateRows: "128px 128px" }}>
                  <div className="col-span-2 row-span-2 overflow-hidden rounded-[8px]">
                    <img src={galleryLarge} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-[8px] h-[128px]">
                    <img src={galleryTopRight} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-[8px] h-[128px]">
                    <img src={galleryBottomRight} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e2e2e5] w-full">
              <div className="flex flex-col gap-[16px] p-[33px]">
                <div className="flex items-center justify-between w-full">
                  <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px] whitespace-nowrap">Đánh giá từ khách hàng</h2>
                  <div className="flex gap-[4px] items-center shrink-0">
                    <svg className="w-[20px] h-[19px]" fill="none" viewBox="0 0 20 19">
                      <path d={svgPathsProfile.p1f93f980} fill="#B7131A" />
                    </svg>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px] whitespace-nowrap">4.9 (128 đánh giá)</span>
                  </div>
                </div>
                <div className="bg-[#f9f9fc] rounded-[8px] border border-[#e2e2e5] px-[17px] pt-[17px] pb-[25px]">
                  <div className="flex gap-[12px] items-center">
                    <div className="bg-[#e0e3e6] rounded-full size-[40px] flex items-center justify-center shrink-0">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[24px]">L</span>
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px] leading-[14px] whitespace-nowrap">Lê Minh Tuấn</span>
                      <div className="flex gap-[2px]">
                        {[1, 2].map((i) => (
                          <svg key={i} className="w-[13.33px] h-[12.67px]" fill="none" viewBox="0 0 13.3333 12.6667">
                            <path d={svgPathsProfile.p265d2480} fill="#B7131A" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MESSAGING PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const navItems = [
  { icon: svgMsg.p20793584, vb: "0 0 18 18", label: "Dashboard", active: false },
  { icon: svgMsg.p3c95900, vb: "0 0 18 20", label: "Lịch trình", active: false },
  { icon: svgMsg.p27c98a00, vb: "0 0 20 20", label: "Tin nhắn", active: true },
  { icon: svgMsg.p26835240, vb: "0 0 22 16", label: "Tài chính", active: false },
  { icon: svgMsg.p3cdadd00, vb: "0 0 20.1 20", label: "Cài đặt", active: false },
];

const conversations = [
  {
    avatar: msgLiWeiConv,
    name: "Li Wei (Hướng dẫn viên)",
    preview: "Chúng ta sẽ gặp nhau tại 8 giờ sáng nhé",
    time: "10:42 AM",
    online: true,
    unread: false,
  },
  {
    avatar: msgConv2,
    name: "Lê Tòn Khách sạn Jinjiang",
    preview: "Cảm ơn bạn đã lưu trữ",
    time: "Hôm qua",
    online: false,
    unread: false,
  },
  {
    avatar: msgConv3,
    name: "Hỗ trợ VinaGuide",
    preview: "Vé của bạn đã được xác nhận.",
    time: "T2",
    online: false,
    unread: false,
  },
];

function MessagingPage() {
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "rgb(249,249,252)" }}>

      {/* ── Top nav ── */}
      <header className="shrink-0 backdrop-blur-[6px] bg-[rgba(249,249,252,0.9)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full z-10">
        <div className="flex items-center justify-between px-[40px] py-[16px]">
          <Link to="/messages" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[24px] leading-[31.2px] whitespace-nowrap">
            VinaGuide China
          </Link>
          <nav className="flex gap-[24px] items-center">
            {["Cẩm nang", "Hành trình", "Hỗ trợ"].map((l) => (
              <a key={l} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-[16px]">
            {/* language */}
            <button className="flex items-center">
              <svg className="w-[38.1px] h-[36px]" fill="none" viewBox="0 0 38.1 36">
                <path d={svgMsg.p1ec25560} fill="#1A1C1E" />
              </svg>
            </button>
            {/* bell */}
            <button className="flex items-center">
              <svg className="w-[48px] h-[36px]" fill="none" viewBox="0 0 48 36">
                <path d={svgMsg.p2fc6b300} fill="#1A1C1E" />
              </svg>
            </button>
            <button className="px-[16px] py-[8px] rounded-[8px]">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px] whitespace-nowrap">Tài khoản</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Three-panel body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left sidebar ── */}
        <aside className="w-[256px] shrink-0 bg-[#f3f3f6] border-r border-[#e4beb9] flex flex-col overflow-hidden">
          <div className="flex flex-col gap-[16px] px-[16px] py-[16px] flex-1 overflow-hidden">
            {/* User profile header */}
            <div className="flex items-center pb-[16px]">
              <div className="relative rounded-full size-[40px] shrink-0 overflow-hidden border-2 border-[#f9f9fc]">
                <img src={msgUserAvatar} alt="Traveler" className="absolute inset-0 size-full object-cover" />
              </div>
              <div className="pl-[12px] flex flex-col">
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[20px] leading-[28px]">Xin chào,</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[20px] leading-[28px]">Traveler</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[12px] leading-[16.8px]">Hạng Thành viên Vàng</span>
              </div>
            </div>

            {/* Book guide button */}
            <div className="pb-[16px]">
              <button className="w-full bg-[#b7131a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[8px] px-[16px] py-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px] hover:bg-[#9a1016] transition-colors">
                Đặt hướng dẫn viên
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-[8px] flex-1 overflow-auto">
              {navItems.map(({ icon, vb, label, active }) => (
                <button key={label} className={`w-full flex items-center p-[12px] rounded-[8px] ${active ? "bg-[#db322f]" : "hover:bg-[rgba(0,0,0,0.04)]"} transition-colors`}>
                  <svg className="size-[20px] shrink-0" fill="none" viewBox={vb}>
                    <path d={icon} fill={active ? "#FFFBFF" : "#5B403D"} />
                  </svg>
                  <span className={`pl-[12px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] tracking-[0.14px] whitespace-nowrap ${active ? "text-[#fffbff]" : "text-[#5b403d]"}`}>
                    {label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Footer links */}
            <div className="border-t border-[#e4beb9] pt-[17px] flex flex-col gap-[8px]">
              {[
                { icon: svgMsg.p2816f2c0, vb: "0 0 20 20", label: "Trợ giúp" },
                { icon: svgMsg.p3e9df400, vb: "0 0 18 18", label: "Đăng xuất" },
              ].map(({ icon, vb, label }) => (
                <button key={label} className="w-full flex items-center p-[8px] rounded-[8px] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
                  <svg className="size-[20px] shrink-0" fill="none" viewBox={vb}>
                    <path d={icon} fill="#5B403D" />
                  </svg>
                  <span className="pl-[12px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px] whitespace-nowrap">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Conversation list ── */}
        <div className="w-[300px] shrink-0 flex flex-col border-r border-[#e4beb9] overflow-hidden bg-white">
          {/* Header + Search */}
          <div className="border-b border-[#e4beb9] px-[16px] pt-[15px] pb-[17px] flex flex-col gap-[16px] shrink-0">
            <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[31.2px]">Tin nhắn</h2>
            <div className="relative w-full">
              <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgMsg.p8a35e00} fill="#5B403D" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm cuộc hội thoại..."
                className="w-full bg-[#f3f3f6] border border-[#e4beb9] rounded-full pl-[41px] pr-[17px] pb-[12.59px] pt-[11px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[16px] text-[#1a1c1e] placeholder:text-[#6b7280] outline-none focus:border-[#b7131a] transition-colors"
              />
            </div>
          </div>

          {/* Conversation items */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, i) => (
              <button key={i} className={`w-full flex items-start gap-[12px] px-[16px] py-[12px] border-b border-[#f3f3f6] hover:bg-[#f9f9fc] transition-colors text-left ${i === 0 ? "bg-[#fdf2f2]" : ""}`}>
                <div className="relative shrink-0">
                  <div className="size-[48px] rounded-full overflow-hidden">
                    <img src={conv.avatar} alt={conv.name} className="size-full object-cover" />
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 size-[12px] rounded-full bg-[#22c55e] border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] leading-[20px] truncate">{conv.name}</span>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[12px] leading-[16.8px] whitespace-nowrap shrink-0">{conv.time}</span>
                  </div>
                  <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[14px] leading-[20px] truncate mt-[2px]">{conv.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat area ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">

          {/* Chat header */}
          <div className="shrink-0 border-b border-[#e4beb9] px-[24px] py-[12px] flex items-center justify-between bg-white">
            <div className="flex items-center gap-[12px]">
              <div className="relative shrink-0">
                <div className="size-[48px] rounded-full overflow-hidden">
                  <img src={msgGuideHeader} alt="Li Wei" className="size-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 size-[12px] rounded-full bg-[#22c55e] border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[16px] leading-[24px]">Li Wei</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#22c55e] text-[12px] leading-[16.8px]">• Trực tuyến</span>
              </div>
            </div>
            <div className="flex items-center gap-[16px]">
              <button className="flex items-center justify-center size-[40px] hover:bg-[#f3f3f6] rounded-full transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgMsg.p143e1930} fill="#5B5F61" />
                </svg>
              </button>
              <button className="flex items-center justify-center size-[40px] hover:bg-[#f3f3f6] rounded-full transition-colors">
                <svg className="w-[20px] h-[16px]" fill="none" viewBox="0 0 20 16">
                  <path d={svgMsg.p3dfc3600} fill="#5B5F61" />
                </svg>
              </button>
              <button className="flex items-center justify-center size-[40px] hover:bg-[#f3f3f6] rounded-full transition-colors">
                <svg className="size-[20px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgMsg.p6c8ea80} fill="#5B5F61" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-[24px] py-[24px] flex flex-col gap-[16px]">
            {/* Date separator */}
            <div className="flex items-center gap-[12px]">
              <div className="flex-1 h-px bg-[#e2e2e5]" />
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px] whitespace-nowrap">Hôm nay, 9:30 AM</span>
              <div className="flex-1 h-px bg-[#e2e2e5]" />
            </div>

            {/* Guide message 1 */}
            <div className="flex items-start gap-[10px]">
              <div className="size-[36px] rounded-full overflow-hidden shrink-0">
                <img src={msgGuideMsg} alt="Li Wei" className="size-full object-cover" />
              </div>
              <div className="flex flex-col gap-[4px] max-w-[60%]">
                <div className="bg-[#f3f3f6] rounded-[12px] rounded-tl-[4px] px-[14px] py-[10px]">
                  <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[15px] leading-[22px]">
                    Chào bạn, tôi là Li Wei. Tôi sẽ là hướng dẫn viên của bạn ngày mai tại Tử Cấm Thành.
                  </p>
                  <p className="font-normal text-[#5b403d] text-[12px] leading-[18px] mt-[4px] italic">
                    你好，我是李伟。明天我将是您在故宫的导游。
                  </p>
                </div>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[11px] leading-[16px] pl-[2px]">9:30 AM</span>
              </div>
            </div>

            {/* User message */}
            <div className="flex items-start gap-[10px] justify-end">
              <div className="flex flex-col gap-[4px] items-end max-w-[60%]">
                <div className="bg-[#b7131a] rounded-[12px] rounded-tr-[4px] px-[14px] py-[10px]">
                  <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-white text-[15px] leading-[22px]">
                    Chào Li Wei! Rất vui được gặp anh. Chúng ta nên gặp nhau ở đâu?
                  </p>
                  <p className="font-normal text-[rgba(255,255,255,0.75)] text-[12px] leading-[18px] mt-[4px] italic">
                    李伟你好！很高兴认识你。我们应该在哪里见面？
                  </p>
                </div>
                <div className="flex items-center gap-[4px] pr-[2px]">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[11px] leading-[16px]">9:32 AM</span>
                  <svg className="w-[12.775px] h-[7.01px]" fill="none" viewBox="0 0 12.775 7.01458">
                    <path d={svgMsg.pfb5e518} fill="#22c55e" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Guide message 2 with location */}
            <div className="flex items-start gap-[10px]">
              <div className="size-[36px] rounded-full overflow-hidden shrink-0">
                <img src={msgGuideMsg} alt="Li Wei" className="size-full object-cover" />
              </div>
              <div className="flex flex-col gap-[4px] max-w-[65%]">
                <div className="flex flex-col gap-[8px]">
                  <div className="bg-[#f3f3f6] rounded-[12px] rounded-tl-[4px] px-[14px] py-[10px]">
                    <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[15px] leading-[22px]">
                      Chúng ta sẽ gặp nhau ở Cổng Ngọ Môn (Meridian Gate). Tôi đã gửi vị trí cho bạn.
                    </p>
                    <p className="font-normal text-[#5b403d] text-[12px] leading-[18px] mt-[4px] italic">
                      我们将在午门见面。我已经把位置发给你了。
                    </p>
                  </div>
                  {/* Location card */}
                  <div className="bg-[#f3f3f6] rounded-[12px] overflow-hidden border border-[#e2e2e5]">
                    <div className="h-[140px] overflow-hidden relative">
                      <img src={msgLocationMap} alt="Cổng Ngọ Môn" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between px-[12px] py-[10px]">
                      <div className="flex items-center gap-[6px]">
                        <svg className="w-[14px] h-[17px] shrink-0" fill="none" viewBox="0 0 14 17">
                          <path d={svgMsg.p321d0880} fill="#b7131a" />
                        </svg>
                        <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[13px] leading-[18px]">Cổng Ngọ Môn (午)</span>
                      </div>
                      <button className="flex items-center justify-center size-[24px] hover:bg-[#e2e2e5] rounded transition-colors">
                        <svg className="size-[16px]" fill="none" viewBox="0 0 18 18">
                          <path d={svgMsg.p22fc1b80} fill="#5B5F61" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[11px] leading-[16px] pl-[2px]">10:40 AM</span>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="shrink-0 border-t border-[#e4beb9] px-[24px] py-[16px] bg-white">
            <div className="flex items-center gap-[12px]">
              {/* Attachment buttons */}
              <button className="flex items-center justify-center size-[36px] hover:bg-[#f3f3f6] rounded-full transition-colors shrink-0">
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgMsg.p27589980} fill="#5B403D" />
                </svg>
              </button>
              <button className="flex items-center justify-center size-[36px] hover:bg-[#f3f3f6] rounded-full transition-colors shrink-0">
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgMsg.p20793584} fill="#5B403D" />
                </svg>
              </button>

              {/* Text input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="w-full bg-[#f3f3f6] border border-[#e4beb9] rounded-full px-[18px] py-[10px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[16px] text-[#1a1c1e] placeholder:text-[#6b7280] outline-none focus:border-[#b7131a] transition-colors pr-[48px]"
                />
              </div>

              {/* Mic button */}
              <button className="flex items-center justify-center size-[36px] hover:bg-[#f3f3f6] rounded-full transition-colors shrink-0">
                <svg className="w-[14px] h-[19px]" fill="none" viewBox="0 0 14 19">
                  <path d={svgMsg.p39e29d00} fill="#5B403D" />
                </svg>
              </button>

              {/* Send button */}
              <button className="flex items-center justify-center size-[44px] bg-[#b7131a] hover:bg-[#9a1016] rounded-full transition-colors shrink-0 shadow-[0px_2px_8px_rgba(183,19,26,0.3)]">
                <svg className="w-[19px] h-[16px]" fill="none" viewBox="0 0 19 16">
                  <path d={svgMsg.pb36e280} fill="white" />
                </svg>
              </button>
            </div>

            {/* Translate toggle */}
            <div className="flex items-center gap-[6px] mt-[10px]">
              <svg className="w-[13.33px] h-[12.67px]" fill="none" viewBox="0 0 13.3333 12.6667">
                <path d={svgMsg.p37e96cc0} fill="#5B403D" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[12px] leading-[16.8px]">Dịch tự động sang tiếng Trung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HANDBOOK PAGE (Cẩm Nang Du Lịch)
   ═══════════════════════════════════════════════════════════════════════════ */

const cities = [
  { name: "Bắc Kinh", active: false },
  { name: "Thượng Hải", active: true },
  { name: "Hàng Châu", active: false },
  { name: "Thành Đô", active: false },
];

const tocItems = [
  "1. Cách mua vé",
  "2. Bản đồ mạng lưới",
  "3. Lưu ý an toàn",
  "4. Giờ hoạt động",
];

function HandbookPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(249,249,252)" }}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 backdrop-blur-[6px] bg-[rgba(249,249,252,0.9)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-[40px] py-[16px]">
          <Link to="/handbook" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[24px] leading-[31.2px] whitespace-nowrap">
            VinaGuide China
          </Link>

          <nav className="flex gap-[24px] items-center">
            {[
              { label: "Cẩm nang", active: true },
              { label: "Hành trình", active: false },
              { label: "Hỗ trợ", active: false },
            ].map(({ label, active }) =>
              active ? (
                <div key={label} className="border-b-2 border-[#b7131a] pb-[6px]">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px]">{label}</span>
                </div>
              ) : (
                <a key={label} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
                  {label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-[16px]">
            {/* Translate */}
            <button className="flex items-center justify-center pb-[6px]">
              <svg className="w-[22.1px] h-[20px]" fill="none" viewBox="0 0 22.1 20">
                <path d={svgPathsHandbook.p37372a00} fill="#5B403D" />
              </svg>
            </button>
            {/* Bell */}
            <button className="flex items-center justify-center pb-[6px]">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPathsHandbook.p164b49c0} fill="#5B403D" />
              </svg>
            </button>
            {/* Account */}
            <button className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">
              Tài khoản
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 flex justify-center">
        <div className="max-w-[1200px] w-full px-[40px]">
          <div className="grid grid-cols-12 gap-x-[24px] py-[32px]">
            {/* ── Left Sidebar: City List ── */}
            <aside className="col-span-3">
              <div className="sticky top-[80px]">
                <div className="bg-[#f9f9fc] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e4beb9] p-[17px] flex flex-col gap-[16px]">
                  <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">
                    Điểm đến phổ biến
                  </h2>
                  <div className="flex flex-col gap-[8px]">
                    {cities.map((city) =>
                      city.active ? (
                        <button key={city.name} className="bg-[#ffb4ac] rounded-[8px] px-[12px] py-[8px] flex items-center justify-between w-full">
                          <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">{city.name}</span>
                          <svg className="w-[5.55px] h-[9px]" fill="none" viewBox="0 0 5.55 9">
                            <path d={svgPathsHandbook.p4874b00} fill="#B7131A" />
                          </svg>
                        </button>
                      ) : (
                        <button key={city.name} className="bg-[#f3f3f6] rounded-[8px] px-[12px] py-[8px] flex items-center justify-between w-full hover:bg-[#e8e8eb] transition-colors">
                          <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px]">{city.name}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Center: Main Article ── */}
            <article className="col-span-6 flex flex-col gap-[16px]">
              {/* Breadcrumb + Title */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[8px]">
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">Thượng Hải</span>
                  <svg className="size-[11.667px]" fill="none" viewBox="0 0 11.6667 11.6667">
                    <path d={svgPathsHandbook.p9508180} fill="#5B5F61" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">Cẩm nang di chuyển</span>
                </div>
                <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[24px]">
                  Hướng dẫn sử dụng tàu điện ngầm Thượng Hải cho người mới
                </h1>
                <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[24px]">
                  Hệ thống Metro Thượng Hải là mạng lưới tàu điện ngầm lớn nhất thế giới. Bài viết này sẽ cung cấp cho bạn những thông tin cần thiết để di chuyển dễ dàng như người bản địa.
                </p>
              </div>

              {/* Hero Image */}
              <div className="bg-[rgba(255,255,255,0)] h-[384px] overflow-hidden rounded-[12px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]">
                <img src={metroImg} alt="Shanghai Metro" className="w-full h-full object-cover" />
              </div>

              {/* Section 1 */}
              <div className="flex flex-col gap-[16px] pt-[16px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[24px] leading-[31.2px]">
                  1. Cách mua vé
                </h2>
                <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[24px]">
                  Bạn có thể mua vé lẻ tại các máy bán vé tự động ở mỗi ga. Máy hỗ trợ tiếng Anh và nhận tiền mặt hoặc thanh toán qua Alipay/WeChat Pay. Tuy nhiên, để tiện lợi nhất, chúng tôi khuyên bạn nên sử dụng ứng dụng thanh toán di động hoặc thẻ giao thông công cộng Thượng Hải.
                </p>
                {/* Tip Box */}
                <div className="bg-[#f3f3f6] rounded-br-[8px] rounded-tr-[8px] border-l-4 border-[#b7131a] pl-[20px] pr-[16px] py-[16px]">
                  <div className="flex gap-[12px] items-start">
                    <svg className="w-[20px] h-[24px] shrink-0" fill="none" viewBox="0 0 20 24">
                      <path d={svgPathsHandbook.p1941800} fill="#B7131A" />
                    </svg>
                    <div className="flex flex-col gap-[4px]">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px]">Mẹo nhỏ từ VinaGuide</span>
                      <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[14px] leading-[21px]">
                        Sử dụng tính năng "Metro" trực tiếp trên Alipay (với mã QR) là cách nhanh chóng nhất để đi qua cổng kiểm soát, không cần phải xếp hàng mua vé vật lý.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex flex-col gap-[16px] pt-[16px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[24px] leading-[31.2px]">
                  2. Bản đồ mạng lưới
                </h2>
                <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[24px]">
                  Mạng lưới gồm hơn 19 tuyến đan xen phức tạp. Hãy tải ứng dụng Metro Thượng Hải chính thức (Shanghai Metro) hoặc sử dụng tính năng chỉ đường của Apple Maps/Baidu Maps để tra cứu lộ trình tối ưu.
                </p>
                {/* Map Placeholder */}
                <div className="bg-[#e2e2e5] h-[256px] rounded-[12px] border border-[#e4beb9] flex items-center justify-center">
                  <svg className="size-[36px]" fill="none" viewBox="0 0 36 36">
                    <path d={svgPathsHandbook.p1ed9cbe0} fill="#B7131A" />
                  </svg>
                </div>
              </div>
            </article>

            {/* ── Right Sidebar: TOC + Emergency ── */}
            <aside className="col-span-3">
              <div className="sticky top-[80px] flex flex-col gap-[32px]">
                {/* Table of Contents */}
                <div className="bg-[#f9f9fc] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e4beb9] p-[17px] flex flex-col gap-[15px]">
                  <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px]">
                    Nội dung bài viết
                  </h3>
                  <div className="flex flex-col gap-[7px]">
                    {tocItems.map((item) => (
                      <a key={item} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px] hover:text-[#b7131a] transition-colors">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Emergency Info */}
                <div className="bg-[#ffdad6] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-[12px] border border-[#e4beb9] p-[17px] flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <svg className="w-[17.3px] h-[18px] shrink-0" fill="none" viewBox="0 0 17.3 18">
                      <path d={svgPathsHandbook.p2971ac80} fill="#B7131A" />
                    </svg>
                    <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#93000a] text-[20px] leading-[28px]">
                      Hỗ trợ khẩn cấp
                    </h3>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <div className="bg-[rgba(249,249,252,0.5)] rounded-[8px] p-[8px] flex items-center justify-between">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#93000a] text-[16px] leading-[25.6px]">Cảnh sát:</span>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">110</span>
                    </div>
                    <div className="bg-[rgba(249,249,252,0.5)] rounded-[8px] p-[8px] flex items-center justify-between">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#93000a] text-[16px] leading-[25.6px]">Cứu thương:</span>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">120</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#e2e2e5] border-t border-[#e4beb9] w-full">
        <div className="max-w-[1200px] mx-auto px-[40px] py-[32px] flex items-center justify-between flex-wrap gap-4">
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[20px] leading-[28px] whitespace-nowrap">
            VinaGuide China
          </span>
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[12px] leading-[16.8px] whitespace-nowrap">
            © 2024 VinaGuide China. Nâng tầm trải nghiệm du lịch Việt.
          </span>
          <div className="flex gap-[16px] items-center flex-wrap">
            {["Điều khoản", "Bảo mật", "Liên hệ", "Hướng dẫn viên"].map((link) => (
              <a key={link} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px] whitespace-nowrap hover:text-[#b7131a] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOOKING TRACKER PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

function BookingPage() {
  const INITIAL = 15 * 60 - 1; // 14:59
  const [seconds, setSeconds] = useState(INITIAL);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const steps = [
    {
      icon: (
        <svg className="size-full" fill="none" viewBox="0 0 10.4417 7.9625">
          <path d={svgPathsBooking.p90c9340} fill="white" />
        </svg>
      ),
      bg: "bg-[#16a34a]",
      label: "Đã gửi yêu cầu",
      sub: "10:30 SA, 24 Thg 10",
      subColor: "text-[#5b403d]",
      opacity: "",
    },
    {
      icon: (
        <svg className="size-full" fill="none" viewBox="0 0 10.0625 9.94583">
          <path d={svgPathsBooking.pc386500} fill="white" />
        </svg>
      ),
      bg: "bg-[#f59e0b]",
      label: "Guide xác nhận",
      sub: "Đang chờ xử lý...",
      subColor: "text-[#f59e0b]",
      opacity: "",
    },
    {
      icon: (
        <svg className="size-full" fill="none" viewBox="0 0 9.33333 12.5417">
          <path d={svgPathsBooking.p1f33d200} fill="#5B403D" />
        </svg>
      ),
      bg: "bg-[#e2e2e5]",
      label: "Đang diễn ra",
      sub: "Chưa bắt đầu",
      subColor: "text-[#5b403d]",
      opacity: "opacity-50",
    },
    {
      icon: (
        <svg className="size-full" fill="none" viewBox="0 0 8.75 9.91667">
          <path d={svgPathsBooking.p88e5080} fill="#5B403D" />
        </svg>
      ),
      bg: "bg-[#e2e2e5]",
      label: "Hoàn thành",
      sub: "Đang chờ",
      subColor: "text-[#5b403d]",
      opacity: "opacity-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(249,249,252)" }}>
      {/* ── VinaGuide China Header ── */}
      <header className="sticky top-0 z-50 backdrop-blur-[6px] bg-[rgba(249,249,252,0.9)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-[40px] py-[16px]">
          <Link to="/booking" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[24px] leading-[31.2px] whitespace-nowrap">
            VinaGuide China
          </Link>

          <nav className="flex gap-[25.8px] items-center">
            {["Cẩm nang", "Hành trình", "Hỗ trợ"].map((label) => {
              const isActive = label === "Hành trình";
              return isActive ? (
                <span key={label} className="relative font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px] pb-[6px] border-b-2 border-[#b7131a]">
                  {label}
                </span>
              ) : (
                <a key={label} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex gap-[16px] items-center">
            {/* Translate icon */}
            <button className="flex items-center justify-center px-[8px] pb-[14px] pt-[8px]">
              <svg className="w-[22.1px] h-[20px]" fill="none" viewBox="0 0 22.1 20">
                <path d={svgPathsBooking.p37372a00} fill="#5B5F61" />
              </svg>
            </button>
            {/* Bell icon */}
            <button className="flex items-center justify-center px-[8px] pb-[14px] pt-[8px]">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPathsBooking.p164b49c0} fill="#5B5F61" />
              </svg>
            </button>
            {/* Account */}
            <button className="px-[16px] py-[8px] rounded-[8px]">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px] whitespace-nowrap">Tài khoản</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex flex-col items-center flex-1">
        <div className="max-w-[1200px] w-full px-[40px] pt-[31px] pb-[80px] flex flex-col gap-[32px]">

          {/* Page title */}
          <div className="flex flex-col gap-[7px]">
            <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[48px] tracking-[-0.96px] leading-[52.8px]">
              Trạng thái đặt chỗ
            </h1>
            <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[18px] leading-[28.8px]">
              Mã yêu cầu: #VG-84920 - Hướng dẫn viên tại Bắc Kinh
            </p>
          </div>

          {/* Timeline card */}
          <div className="bg-white drop-shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-[12px] border border-[rgba(228,190,185,0.3)] w-full">
            <div className="flex flex-col gap-[32px] p-[33px]">

              {/* Pending timer banner */}
              <div className="bg-[rgba(255,218,214,0.2)] rounded-[8px] border border-[#f59e0b] w-full">
                <div className="flex items-center justify-between p-[17px]">
                  <div className="flex gap-[16px] items-center">
                    {/* Clock icon */}
                    <div className="size-[25px] shrink-0">
                      <svg className="size-full" fill="none" viewBox="0 0 25 25">
                        <path d={svgPathsBooking.p21ecf998} fill="#F59E0B" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[20px] leading-[28px] whitespace-nowrap">
                        Chờ xác nhận từ Hướng dẫn viên
                      </span>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px] whitespace-nowrap">
                        Yêu cầu của bạn đang được xử lý. Vui lòng đợi.
                      </span>
                    </div>
                  </div>
                  {/* Countdown */}
                  <div className="flex flex-col items-end shrink-0">
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#f59e0b] text-[32px] leading-[38.4px] whitespace-nowrap tabular-nums">
                      {mm}:{ss}
                    </span>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[12px] leading-[16.8px] whitespace-nowrap">
                      Thời gian còn lại
                    </span>
                  </div>
                </div>
              </div>

              {/* Step timeline */}
              <div className="relative w-full">
                {/* Background track */}
                <div className="absolute left-[10%] right-[10%] top-[24px] h-[2px] bg-[#e2e2e5] z-0" />
                {/* Green progress: from step 1 to step 2 (roughly 33% of track) */}
                <div className="absolute left-[10%] top-[24px] h-[2px] bg-[#16a34a] z-0" style={{ width: "calc(33.3% - 0%)" }} />

                {/* Steps */}
                <div className="flex items-start justify-between h-[88.8px] relative z-10">
                  {steps.map((step, i) => (
                    <div key={i} className={`flex flex-col items-center flex-1 ${step.opacity}`}>
                      {/* Icon circle */}
                      <div className="mb-[8px] relative">
                        <div className={`${step.bg} size-[32px] rounded-full flex items-center justify-center border-4 border-white`}>
                          <div className="size-[10px]">{step.icon}</div>
                        </div>
                      </div>
                      {/* Label */}
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] leading-[28px] text-center whitespace-nowrap">
                        {step.label}
                      </span>
                      <span className={`font-['Be_Vietnam_Pro',sans-serif] font-normal text-[12px] leading-[16.8px] text-center whitespace-nowrap ${step.subColor}`}>
                        {step.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-[16px] items-center justify-end pt-[17px] border-t border-[rgba(228,190,185,0.3)]">
                <button className="px-[25px] py-[15px] rounded-[8px] border border-[#b7131a] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px] whitespace-nowrap hover:bg-[rgba(183,19,26,0.05)] transition-colors">
                  Hủy yêu cầu
                </button>
                <button className="bg-[#b7131a] px-[24px] py-[12px] rounded-[8px] flex items-center gap-[8px] hover:bg-[#9a1016] transition-colors">
                  <svg className="size-[11.67px] shrink-0" fill="none" viewBox="0 0 11.6667 11.6667">
                    <path d={svgPathsBooking.p11918d00} fill="white" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px] whitespace-nowrap">
                    Liên hệ Hỗ trợ
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── VinaGuide China Footer ── */}
      <footer className="bg-[#e2e2e5] border-t border-[#e4beb9] w-full">
        <div className="max-w-[1200px] mx-auto px-[40px] py-[32px] flex items-center justify-between flex-wrap gap-4">
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[20px] leading-[28px] whitespace-nowrap">
            VinaGuide China
          </span>
          <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[16px] leading-[25.6px] whitespace-nowrap">
            © 2024 VinaGuide China. Nâng tầm trải nghiệm du lịch Việt.
          </span>
          <div className="flex gap-[16px] items-center flex-wrap">
            {["Điều khoản", "Bảo mật", "Liên hệ", "Hướng dẫn viên"].map((link) => (
              <a key={link} href="#" className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px] whitespace-nowrap hover:text-[#b7131a] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/guide" element={<GuideProfilePage />} />
        <Route path="/handbook" element={<HandbookPage />} />
        <Route path="/dashboard" element={<GuideDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/sourcing" element={<SourcingPage />} />
        <Route path="/revenue" element={<RevenueDashboard />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/messages" element={<MessagingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

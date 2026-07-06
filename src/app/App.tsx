import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { MapPage } from "./pages/MapPage";
import { SourcingPage } from "./pages/SourcingPage";
import { PublicLayout } from "./components/layout/PublicLayout";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import { getSession, roleHomePath } from "./lib/auth";
import {
  GuideBookingsPage,
  GuideCalendarPage,
  GuideEarningsPage,
  GuideMessagesPage,
  GuideOverviewPage,
  GuideProfileManagePage,
  GuideVerificationPage,
} from "./pages/GuidePages";
import { AdminBookingsPage, AdminGuidesPage, AdminOverviewPage, AdminPartnersPage, AdminReportsPage, AdminRevenuePage, AdminUsersPage } from "./pages/AdminPages";
import {
  PartnerLeadsPage,
  PartnerMessagesPage,
  PartnerOrdersPage,
  PartnerOverviewPage,
  PartnerProfilePage,
  PartnerServicesPage,
} from "./pages/PartnerPages";
import {
  assets,
  durationLabels,
  guides,
  handbookArticles,
  initialMessages,
  markets,
  serviceLabels,
  type Booking,
  type BookingStatus,
  type Message,
  type ServiceType,
} from "./data/mock";
import { formatVnd, getBooking, getBookings, getMessages, saveBooking, saveMessages, updateBookingStatus } from "./lib/storage";

function PageShell({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "red" | "green" | "blue" | "neutral" }) {
  const tones = {
    red: "bg-[#fff1ef] text-[#b7131a]",
    green: "bg-[#e7f7ed] text-[#087443]",
    blue: "bg-[#e7f4f8] text-[#006578]",
    neutral: "bg-[#f2f2f4] text-[#5b5f61]",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function LazySection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const id = useMemo(() => `lazy-${Math.random().toString(36).slice(2)}`, []);
  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "180px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);
  return <section id={id} className={`${className} ${visible ? "ctg-animate-in" : "opacity-0"}`}>{visible ? children : <div className="min-h-[260px] rounded-3xl bg-[#f8f3f2]" />}</section>;
}

function HomePage() {
  const navigate = useNavigate();
  const [city, setCity] = useState("Quảng Châu");
  const [service, setService] = useState<ServiceType>("sourcing");
  const featuredGuides = guides.slice(0, 3);
  const heroStats = [["1.800+", "guide và đối tác"], ["12 phút", "phản hồi trung bình"], ["24/7", "hỗ trợ hành trình"]];
  return (
    <PageShell>
      <main className="overflow-hidden">
        <section className="relative isolate bg-[#fff8f7]">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#ffdad5] blur-3xl ctg-glow" />
          <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#d8edf3] blur-3xl ctg-glow" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.02fr_0.98fr] md:px-8 md:py-20">
            <div className="relative z-10 flex flex-col justify-center ctg-animate-in">
              <Badge tone="red">Dành riêng cho người Việt đi Trung Quốc</Badge>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.065em] md:text-7xl">
                Đi Trung Quốc dễ hơn với <span className="bg-gradient-to-r from-[#b7131a] to-[#f06c4f] bg-clip-text text-transparent">Local Guide tiếng Việt</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5b403d]">
                Tìm guide, phiên dịch, chuyên gia đánh hàng và đối tác địa phương đáng tin cậy tại Quảng Châu, Thâm Quyến, Bắc Kinh, Thượng Hải.
              </p>
              <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
                {heroStats.map(([value, label]) => <div key={label} className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur"><div className="text-2xl font-black text-[#b7131a]">{value}</div><div className="mt-1 text-xs font-semibold text-[#5b403d]">{label}</div></div>)}
              </div>
            <form
              className="mt-8 grid gap-3 rounded-3xl border border-white/80 bg-white/85 p-4 shadow-2xl shadow-[#b7131a]/10 backdrop-blur md:grid-cols-[1fr_1fr_auto]"
              onSubmit={(event) => {
                event.preventDefault();
                navigate(`/guides?city=${encodeURIComponent(city)}&service=${service}`);
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#5b403d]">Thành phố</span>
                <select value={city} onChange={(event) => setCity(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]">
                  {["Quảng Châu", "Thâm Quyến", "Bắc Kinh", "Thượng Hải"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#5b403d]">Nhu cầu</span>
                <select value={service} onChange={(event) => setService(event.target.value as ServiceType)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]">
                  {Object.entries(serviceLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <button className="rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white hover:bg-[#9f1016] md:self-end">Tìm guide</button>
            </form>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold"><Link to="/markets" className="text-[#b7131a]">Khám phá chợ đầu mối</Link><Link to="/handbook" className="text-[#5b403d]">Đọc cẩm nang</Link><Link to="/ai" className="text-[#5b403d]">Hỏi trợ lý AI</Link></div>
            </div>
            <div className="relative min-h-[460px] ctg-animate-in" style={{ animationDelay: "120ms" }}>
              <div className="absolute inset-8 rotate-3 rounded-[2.5rem] bg-[#b7131a]/10 blur-sm" />
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/60 bg-white p-2 shadow-2xl shadow-[#5b403d]/20 ctg-card-3d">
                <img src={assets.heroImage} loading="eager" alt="Local guide hỗ trợ khách Việt tại Trung Quốc" className="h-[520px] w-full rounded-[2rem] object-cover" />
                <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/40 bg-white/85 p-5 shadow-xl backdrop-blur">
                  <div className="flex items-center justify-between gap-4"><div><div className="text-sm font-bold text-[#b7131a]">Live trip assistant</div><div className="mt-1 text-xl font-black">Guide, bản đồ, chat dịch trong một hành trình</div></div><div className="rounded-2xl bg-[#e7f7ed] px-4 py-3 text-center"><div className="text-lg font-black text-[#087443]">4.9</div><div className="text-xs font-bold text-[#087443]">rating</div></div></div>
                </div>
              </div>
              <div className="absolute -left-3 top-16 rounded-3xl bg-white/90 p-4 shadow-xl backdrop-blur ctg-float"><div className="text-xs font-bold text-[#5b5f61]">Đang xử lý</div><div className="mt-1 font-black">Booking Quảng Châu</div><div className="mt-2 text-xs text-[#087443]">Guide phản hồi sau 8 phút</div></div>
              <div className="absolute -right-2 top-44 rounded-3xl bg-[#1a1c1e]/90 p-4 text-white shadow-xl backdrop-blur ctg-float-slow"><div className="text-xs text-white/70">AI dịch nhanh</div><div className="mt-1 font-black">请问多少钱?</div><div className="mt-1 text-xs text-white/70">Có giá bao nhiêu?</div></div>
            </div>
          </div>
        </section>

        <LazySection className="bg-[#f8f3f2] py-14">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-8">
            {[
              ["Guide xác minh", "Hồ sơ, đánh giá, tỷ lệ phản hồi và chuyên môn rõ ràng."],
              ["Dịch Việt - Trung", "Chat song ngữ, gợi ý câu nói và hỗ trợ tình huống thực tế."],
              ["Chợ đầu mối", "Cẩm nang Quảng Châu, Thâm Quyến và guide biết mặc cả."],
              ["An toàn chuyến đi", "Theo dõi booking, chia sẻ vị trí và hỗ trợ khẩn cấp trong suốt hành trình."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-[#f0d8d5] bg-white p-6 ctg-card-3d">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b5f61]">{desc}</p>
              </div>
            ))}
          </div>
        </LazySection>

        <LazySection className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge tone="blue">Guide nổi bật</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Sẵn sàng hỗ trợ tại các thành phố lớn</h2>
            </div>
            <Link to="/guides" className="font-bold text-[#b7131a]">Xem tất cả guide</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
          </div>
        </LazySection>

        <LazySection className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-[#5b403d]/10 ctg-card-3d">
            <img src={assets.sourcingHero} loading="lazy" alt="Dịch vụ đánh hàng tại Trung Quốc" className="h-full min-h-[320px] w-full object-cover" />
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-[#b7131a] p-8 text-white md:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
            <Badge>Dành cho dân buôn</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Đi Quảng Châu đánh hàng lần đầu?</h2>
            <p className="mt-4 leading-7 text-white/85">C-TourGuide giúp bạn tìm đúng chợ, thuê guide biết mặc cả, kiểm hàng và kết nối kho vận về Việt Nam qua đối tác tin cậy.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">{[["Bạch Mã", "thời trang"], ["Sha He", "giá sỉ"], ["Huaqiangbei", "linh kiện"]].map(([name, sub]) => <div key={name} className="rounded-2xl bg-white/12 p-4 backdrop-blur"><div className="font-black">{name}</div><div className="text-sm text-white/70">{sub}</div></div>)}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/markets" className="rounded-xl bg-white px-5 py-3 font-bold text-[#b7131a]">Khám phá chợ</Link>
              <Link to="/guides?service=sourcing" className="rounded-xl border border-white/50 px-5 py-3 font-bold text-white">Tìm guide đánh hàng</Link>
            </div>
          </div>
        </LazySection>

        <LazySection className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Badge tone="blue">Dịch vụ theo nhu cầu</Badge>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">Một nền tảng cho mọi tình huống khi đi Trung Quốc</h2>
              <p className="mt-4 leading-8 text-[#5b403d]">C-TourGuide kết nối người Việt với Local Guide, phiên dịch viên, chuyên gia đánh hàng, đối tác kho vận và công cụ hỗ trợ chuyến đi. Nội dung được xây dựng xoay quanh các nhu cầu thực tế: đi du lịch tự túc, đi công tác, tìm nguồn hàng, kiểm mẫu, đặt xe, dùng metro, thanh toán và xử lý tình huống khẩn cấp.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Thuê Local Guide tiếng Việt", "Dẫn đường, phiên dịch, hỗ trợ mua vé, đặt xe, giải thích văn hóa và xử lý tình huống trong chuyến đi."],
                ["Phiên dịch công tác", "Hỗ trợ gặp nhà cung cấp, đàm phán, ghi chú nội dung làm việc và chuẩn bị câu hỏi tiếng Trung."],
                ["Đánh hàng Quảng Châu", "Đi chợ Bạch Mã, Sha He, Xingfa, Yide Road; hỏi MOQ, mặc cả, kiểm mẫu và gửi hàng về kho."],
                ["Bản đồ, AI và cẩm nang", "Tra cứu địa điểm, hỏi trợ lý AI, đọc checklist và lưu các lưu ý quan trọng trước khi sang Trung Quốc."],
              ].map(([title, desc]) => <article key={title} className="rounded-3xl border border-[#ece2e0] bg-white p-6 shadow-sm ctg-card-3d"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#5b5f61]">{desc}</p></article>)}
            </div>
          </div>
        </LazySection>

        <LazySection className="bg-[#1a1c1e] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="max-w-3xl">
              <Badge>Thành phố phổ biến</Badge>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">Cẩm nang và guide theo từng thành phố Trung Quốc</h2>
              <p className="mt-4 leading-8 text-white/70">Tối ưu cho các điểm đến người Việt quan tâm nhiều nhất: Quảng Châu đánh hàng, Thâm Quyến linh kiện, Thượng Hải công tác, Bắc Kinh du lịch lịch sử, Nghĩa Ô tìm nguồn sỉ và Thành Đô trải nghiệm ẩm thực.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Quảng Châu", "Bạch Mã, Sha He, Xingfa, Yide Road", "/markets"],
                ["Thâm Quyến", "Huaqiangbei, linh kiện điện tử, công tác", "/handbook/shenzhen-electronics"],
                ["Thượng Hải", "Metro, hội chợ, công tác, city tour", "/handbook/shanghai-metro"],
                ["Bắc Kinh", "Tử Cấm Thành, Vạn Lý Trường Thành", "/guides?city=Bắc%20Kinh"],
                ["Nghĩa Ô", "Yiwu International Trade City, phụ kiện", "/markets/yiwu-international"],
                ["Thành Đô", "Ẩm thực Tứ Xuyên, gấu trúc, tour gia đình", "/handbook/chengdu-food"],
              ].map(([cityName, desc, to]) => <Link key={cityName} to={to} className="rounded-3xl border border-white/10 bg-white/8 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12"><h3 className="text-2xl font-black">{cityName}</h3><p className="mt-3 text-sm leading-7 text-white/70">{desc}</p><span className="mt-5 inline-block text-sm font-bold text-[#ffdad5]">Xem hướng dẫn →</span></Link>)}
            </div>
          </div>
        </LazySection>

        <LazySection className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <Badge tone="green">Quy trình đặt guide</Badge>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">Từ tìm guide đến hoàn tất chuyến đi trong vài bước</h2>
              <div className="mt-8 space-y-4">
                {[
                  ["1", "Chọn thành phố và nhu cầu", "Tìm theo điểm đến, loại dịch vụ, ngân sách, kinh nghiệm và chuyên môn của guide."],
                  ["2", "Trao đổi lịch trình", "Chat song ngữ, gửi địa điểm, ghi chú yêu cầu đặc biệt và thống nhất điểm hẹn."],
                  ["3", "Xác nhận booking", "Theo dõi trạng thái đặt lịch, số tiền dự kiến, lịch làm việc và thông tin liên hệ."],
                  ["4", "Đồng hành và đánh giá", "Guide hỗ trợ trong chuyến đi, sau đó khách lưu cẩm nang, hóa đơn và đánh giá chất lượng."],
                ].map(([step, title, desc]) => <div key={step} className="flex gap-4 rounded-3xl bg-[#f8f3f2] p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#b7131a] font-black text-white">{step}</div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#5b403d]">{desc}</p></div></div>)}
              </div>
            </div>
            <aside className="rounded-[2rem] bg-[#fff1ef] p-6 md:p-8">
              <h3 className="text-2xl font-black tracking-[-0.04em]">Checklist SEO cho người đi Trung Quốc lần đầu</h3>
              <div className="mt-5 grid gap-3">
                {[
                  "Chuẩn bị WeChat/Alipay, hộ chiếu, địa chỉ khách sạn bằng tiếng Trung.",
                  "Lưu Google Maps hoặc bản đồ thay thế, ảnh chụp địa điểm và số điện thoại khẩn cấp.",
                  "Nếu đi chợ đầu mối, chuẩn bị ảnh mẫu, size chart, MOQ, ngân sách và địa chỉ kho.",
                  "Nếu đi công tác, chuẩn bị danh thiếp, nội dung cần phiên dịch và câu hỏi cho nhà cung cấp.",
                ].map((item) => <label key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-[#5b403d]"><input type="checkbox" className="mt-1" />{item}</label>)}
              </div>
              <Link to="/handbook" className="mt-6 inline-block rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xem toàn bộ cẩm nang</Link>
            </aside>
          </div>
        </LazySection>

        <LazySection className="bg-[#f8f3f2] py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div><Badge tone="red">Câu hỏi thường gặp</Badge><h2 className="mt-3 text-3xl font-black tracking-[-0.04em] md:text-5xl">FAQ về thuê guide và đi Trung Quốc tự túc</h2></div>
              <Link to="/safety" className="font-bold text-[#b7131a]">Xem an toàn và hỗ trợ</Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["C-TourGuide có phù hợp cho dân buôn đi Quảng Châu không?", "Có. Nền tảng có guide chuyên chợ đầu mối, cẩm nang Bạch Mã, Sha He, Xingfa, Yide Road và đối tác kho vận hỗ trợ gom hàng."],
                ["Tôi không biết tiếng Trung có đi tự túc được không?", "Bạn vẫn có thể đi nếu chuẩn bị kỹ. C-TourGuide hỗ trợ guide tiếng Việt, chat song ngữ, AI dịch nhanh, bản đồ và checklist theo từng thành phố."],
                ["Có thể thuê guide theo giờ hay theo ngày?", "Có. Hồ sơ guide hiển thị giá theo giờ, nửa ngày, cả ngày hoặc nhiều ngày tùy loại dịch vụ như city tour, phiên dịch, đánh hàng."],
                ["Cẩm nang trên trang có dùng được trước chuyến đi không?", "Có. Bạn có thể đọc trước về thanh toán, metro, chợ đầu mối, món ăn, cảnh báo rủi ro và lưu checklist quan trọng."],
                ["Đối tác/người bán hàng dùng C-TourGuide như thế nào?", "Đối tác có khu vực riêng để nhận lead, quản lý dịch vụ, báo giá, đơn hàng, tin nhắn và hồ sơ xác minh."],
                ["Trang có hỗ trợ tìm guide theo thành phố không?", "Có. Bạn có thể tìm guide tại Quảng Châu, Thâm Quyến, Bắc Kinh, Thượng Hải, Nghĩa Ô, Thành Đô và các điểm đến phổ biến khác."],
              ].map(([question, answer]) => <details key={question} className="group rounded-3xl bg-white p-6 shadow-sm"><summary className="font-bold marker:text-[#b7131a]">{question}</summary><p className="mt-3 text-sm leading-7 text-[#5b403d]">{answer}</p></details>)}
            </div>
          </div>
        </LazySection>
      </main>
    </PageShell>
  );
}

function GuideCard({ guide }: { guide: (typeof guides)[number] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#ece2e0] bg-white shadow-sm ctg-card-3d">
      <img src={guide.avatar} loading="lazy" alt={guide.name} className="h-48 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">{guide.name}</h3>
            <p className="mt-1 text-sm text-[#5b5f61]">{guide.city} · {guide.experienceYears} năm kinh nghiệm</p>
          </div>
          {guide.verified && <Badge tone="green">Đã xác minh</Badge>}
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5b403d]">{guide.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {guide.specialties.slice(0, 3).map((item) => <Badge key={item}>{item}</Badge>)}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#f0e5e3] pt-4">
          <div>
            <div className="font-bold text-[#b7131a]">{formatVnd(guide.pricePerDay)}<span className="text-xs font-medium text-[#5b5f61]">/ngày</span></div>
            <div className="text-xs text-[#5b5f61]">★ {guide.rating} ({guide.reviews}) · phản hồi {guide.responseRate}%</div>
          </div>
          <Link to={`/guides/${guide.id}`} className="rounded-lg bg-[#b7131a] px-4 py-2 text-sm font-bold text-white">Hồ sơ</Link>
        </div>
      </div>
    </article>
  );
}

function GuideSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const [city, setCity] = useState(params.get("city") || "Tất cả");
  const [service, setService] = useState(params.get("service") || "all");
  const [query, setQuery] = useState("");
  const filtered = guides.filter((guide) => {
    const cityMatch = city === "Tất cả" || guide.city === city;
    const queryMatch = `${guide.name} ${guide.city} ${guide.specialties.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const serviceMatch = service === "all" || guide.specialties.join(" ").toLowerCase().includes(service === "sourcing" ? "chợ" : "") || service !== "sourcing";
    return cityMatch && queryMatch && serviceMatch;
  });
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="rounded-3xl bg-[#f8f3f2] p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Tìm Local Guide</h1>
          <p className="mt-2 text-[#5b5f61]">Lọc theo thành phố, chuyên môn và nhu cầu chuyến đi.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm tên guide, chợ, kỹ năng..." className="rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" />
            <select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]">
              {["Tất cả", "Quảng Châu", "Thâm Quyến", "Bắc Kinh", "Thượng Hải"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={service} onChange={(event) => setService(event.target.value)} className="rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]">
              <option value="all">Tất cả nhu cầu</option>
              {Object.entries(serviceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="font-semibold">Tìm thấy {filtered.length} guide</p>
          <span className="text-sm text-[#5b5f61]">Sắp xếp: nổi bật</span>
        </div>
        {filtered.length ? (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-[#e2e2e5] p-10 text-center text-[#5b5f61]">Chưa có guide phù hợp. Hãy thử bỏ bớt bộ lọc.</div>
        )}
      </main>
    </PageShell>
  );
}

function GuideProfilePage() {
  const { id } = useParams();
  const guide = guides.find((item) => item.id === id) || guides[0];
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#ece2e0] bg-white">
          <div className="relative h-72 md:h-96">
            <img src={guide.cover} alt="Ảnh bìa guide" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <img src={guide.avatar} alt={guide.name} className="h-24 w-24 rounded-full border-4 border-white object-cover" />
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{guide.name}</h1>
                  <p className="mt-1">{guide.city} · {guide.experienceYears} năm kinh nghiệm · ★ {guide.rating} ({guide.reviews})</p>
                </div>
              </div>
              <Link to={`/booking/new/${guide.id}`} className="rounded-xl bg-[#b7131a] px-6 py-3 text-center font-bold text-white">Đặt lịch guide</Link>
            </div>
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_340px] md:p-8">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold">Giới thiệu</h2>
                <p className="mt-3 leading-8 text-[#5b403d]">{guide.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">{guide.languages.map((item) => <Badge key={item}>{item}</Badge>)}</div>
              </section>
              <section>
                <h2 className="text-2xl font-bold">Dịch vụ cung cấp</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">{guide.specialties.map((item) => <div key={item} className="rounded-xl border border-[#ece2e0] p-4 font-semibold">{item}</div>)}</div>
              </section>
              <section>
                <h2 className="text-2xl font-bold">Ảnh chuyến đi</h2>
                <div className="mt-4 grid grid-cols-3 gap-3">{guide.gallery.map((image) => <img key={image} src={image} alt="Ảnh chuyến đi" className="h-32 w-full rounded-xl object-cover md:h-44" />)}</div>
              </section>
              <section className="rounded-2xl bg-[#f8f3f2] p-5">
                <h2 className="text-xl font-bold">Đánh giá gần đây</h2>
                <p className="mt-3 leading-7 text-[#5b403d]">“Guide đúng giờ, dịch rõ ràng, biết cách hỏi giá và nhắc mình kiểm hàng trước khi đặt cọc. Rất phù hợp cho người Việt đi lần đầu.”</p>
              </section>
            </div>
            <aside className="h-fit rounded-2xl border border-[#ece2e0] p-5">
              <h3 className="text-xl font-bold">Thông tin nhanh</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><span>Giá theo giờ</span><b>{formatVnd(guide.pricePerHour)}</b></div>
                <div className="flex justify-between"><span>Giá cả ngày</span><b>{formatVnd(guide.pricePerDay)}</b></div>
                <div className="flex justify-between"><span>Phản hồi</span><b>{guide.responseRate}%</b></div>
                <div className="flex justify-between"><span>Thời gian phản hồi</span><b>{guide.responseTime}</b></div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="green">Xác minh danh tính</Badge>
                <Badge tone="green">Xác minh khu vực sống</Badge>
              </div>
              <Link to={`/booking/new/${guide.id}`} className="mt-5 block rounded-xl bg-[#b7131a] px-5 py-3 text-center font-bold text-white">Chọn lịch</Link>
            </aside>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function NewBookingPage() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const guide = guides.find((item) => item.id === guideId) || guides[0];
  const [duration, setDuration] = useState<Booking["duration"]>("full-day");
  const [serviceType, setServiceType] = useState<ServiceType>("sourcing");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("Muốn đi chợ Bạch Mã, hỏi giá và kiểm mẫu trước khi đặt cọc.");
  const total = duration === "hourly" ? guide.pricePerHour * 3 : duration === "half-day" ? Math.round(guide.pricePerDay * 0.6) : duration === "multi-day" ? guide.pricePerDay * 2 : guide.pricePerDay;
  function submit(event: FormEvent) {
    event.preventDefault();
    const booking: Booking = {
      id: `CTG-${Date.now().toString().slice(-6)}`,
      guideId: guide.id,
      travelerName: "Nguyễn Minh Anh",
      city: guide.city,
      serviceType,
      date,
      duration,
      guests,
      notes,
      totalAmount: total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    navigate(`/booking/${booking.id}`);
  }
  return (
    <PageShell>
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[1fr_380px] md:px-8">
        <form onSubmit={submit} className="rounded-3xl border border-[#ece2e0] bg-white p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Đặt lịch với {guide.name}</h1>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label><span className="mb-2 block font-semibold">Ngày đi</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>
            <label><span className="mb-2 block font-semibold">Số khách</span><input min={1} type="number" value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>
            <label><span className="mb-2 block font-semibold">Thời lượng</span><select value={duration} onChange={(event) => setDuration(event.target.value as Booking["duration"])} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3">{Object.entries(durationLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label><span className="mb-2 block font-semibold">Loại dịch vụ</span><select value={serviceType} onChange={(event) => setServiceType(event.target.value as ServiceType)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3">{Object.entries(serviceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>
          <label className="mt-5 block"><span className="mb-2 block font-semibold">Ghi chú cho guide</span><textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={5} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>
          <label className="mt-5 flex items-start gap-3 text-sm text-[#5b403d]"><input required type="checkbox" className="mt-1" /> Tôi đồng ý với điều khoản đặt lịch, chính sách hủy và lưu ý về các dịch vụ thanh toán xuyên biên giới.</label>
          <button className="mt-6 rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white">Gửi yêu cầu đặt lịch</button>
        </form>
        <aside className="h-fit rounded-3xl bg-[#f8f3f2] p-6">
          <div className="flex items-center gap-4"><img src={guide.avatar} alt={guide.name} className="h-16 w-16 rounded-full object-cover" /><div><h2 className="font-bold">{guide.name}</h2><p className="text-sm text-[#5b5f61]">{guide.city} · ★ {guide.rating}</p></div></div>
          <div className="mt-6 space-y-3 border-t border-[#ead7d4] pt-5 text-sm"><div className="flex justify-between"><span>Dịch vụ</span><b>{serviceLabels[serviceType]}</b></div><div className="flex justify-between"><span>Thời lượng</span><b>{durationLabels[duration]}</b></div><div className="flex justify-between"><span>Tạm tính</span><b>{formatVnd(total)}</b></div><div className="flex justify-between"><span>Phí nền tảng</span><b>0đ</b></div><div className="flex justify-between border-t border-[#ead7d4] pt-3 text-lg"><span>Tổng cộng</span><b className="text-[#b7131a]">{formatVnd(total)}</b></div></div>
        </aside>
      </main>
    </PageShell>
  );
}

function BookingStatusPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | undefined>(() => (id ? getBooking(id) : undefined));
  const guide = guides.find((item) => item.id === booking?.guideId);
  const statuses: BookingStatus[] = ["pending", "confirmed", "paid", "active", "completed"];
  const labels: Record<BookingStatus, string> = { pending: "Chờ guide xác nhận", confirmed: "Guide đã xác nhận", paid: "Đã giữ chỗ", active: "Đang diễn ra", completed: "Hoàn thành", cancelled: "Đã hủy" };
  function setStatus(status: BookingStatus) {
    if (!booking) return;
    updateBookingStatus(booking.id, status);
    setBooking({ ...booking, status });
  }
  if (!booking || !guide) return <PageShell><main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Không tìm thấy booking</h1><Link to="/guides" className="mt-5 inline-block rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Tìm guide mới</Link></main></PageShell>;
  const currentIndex = statuses.indexOf(booking.status);
  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div className="rounded-3xl border border-[#ece2e0] bg-white p-6 md:p-8">
          <Badge tone="red">Mã yêu cầu {booking.id}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">{labels[booking.status]}</h1>
          <p className="mt-2 text-[#5b5f61]">{serviceLabels[booking.serviceType]} tại {booking.city} cùng {guide.name} vào ngày {booking.date}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-5">{statuses.map((status, index) => <div key={status} className={`rounded-2xl border p-4 ${index <= currentIndex ? "border-[#b7131a] bg-[#fff1ef]" : "border-[#ece2e0] bg-white"}`}><div className="font-bold">{index + 1}. {labels[status]}</div></div>)}</div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-[#f8f3f2] p-5"><h2 className="font-bold">Chi tiết booking</h2><div className="mt-4 space-y-2 text-sm"><p>Thời lượng: {durationLabels[booking.duration]}</p><p>Số khách: {booking.guests}</p><p>Tổng tiền: {formatVnd(booking.totalAmount)}</p><p>Ghi chú: {booking.notes}</p></div></div>
            <div className="rounded-2xl bg-[#f8f3f2] p-5"><h2 className="font-bold">Cập nhật trạng thái</h2><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => setStatus("confirmed")} className="rounded-lg bg-[#087443] px-4 py-2 font-bold text-white">Guide xác nhận</button><button onClick={() => setStatus("paid")} className="rounded-lg bg-[#b7131a] px-4 py-2 font-bold text-white">Giữ chỗ</button><button onClick={() => setStatus("completed")} className="rounded-lg border border-[#b7131a] px-4 py-2 font-bold text-[#b7131a]">Hoàn thành</button><Link to="/messages" className="rounded-lg bg-[#1a1c1e] px-4 py-2 font-bold text-white">Nhắn tin</Link></div></div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(() => getMessages());
  const [text, setText] = useState("");
  function send(kind: "text" | "location" = "text") {
    const value = kind === "location" ? "Mình đã chia sẻ vị trí hiện tại." : text.trim();
    if (!value) return;
    const next: Message[] = [...messages, { id: String(Date.now()), author: "traveler", text: value, translation: "我已收到您的信息。", time: "Bây giờ", kind }];
    setMessages(next);
    saveMessages(next);
    setText("");
    window.setTimeout(() => {
      const reply = [...next, { id: String(Date.now() + 1), author: "guide", text: "Mình đã nhận được. Mình sẽ chuẩn bị lộ trình và nhắc bạn các lưu ý trước khi đi.", translation: "我收到了。我会准备路线，并提醒您出发前的注意事项。", time: "Bây giờ" }];
      setMessages(reply);
      saveMessages(reply);
    }, 600);
  }
  return (
    <PageShell>
      <main className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-8 md:grid-cols-[280px_1fr] md:px-8">
        <aside className="rounded-3xl bg-[#f8f3f2] p-5"><h1 className="text-2xl font-bold">Tin nhắn</h1><button className="mt-5 w-full rounded-2xl bg-white p-4 text-left shadow-sm"><b>Phạm Khánh Linh</b><p className="mt-1 text-sm text-[#5b5f61]">Guide Quảng Châu · trực tuyến</p></button><button className="mt-3 w-full rounded-2xl bg-white p-4 text-left shadow-sm"><b>Hỗ trợ C-TourGuide</b><p className="mt-1 text-sm text-[#5b5f61]">Luôn sẵn sàng hỗ trợ</p></button></aside>
        <section className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-[#ece2e0] bg-white" style={{ height: "clamp(520px, calc(100vh - 220px), 760px)" }}>
          <div className="border-b border-[#ece2e0] p-5"><h2 className="font-bold">Chat song ngữ Việt - Trung</h2><p className="text-sm text-[#5b5f61]">Tự động dịch đang bật để guide và khách trao đổi thuận tiện hơn.</p></div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message) => <div key={message.id} className={`flex ${message.author === "traveler" ? "justify-end" : "justify-start"}`}><div className={`max-w-[78%] rounded-2xl px-4 py-3 ${message.author === "traveler" ? "bg-[#b7131a] text-white" : message.author === "system" ? "bg-[#f8f3f2]" : "bg-[#f2f2f4]"}`}><p>{message.text}</p>{message.translation && <p className="mt-2 text-sm opacity-75">{message.translation}</p>}{message.kind === "location" && <div className="mt-3 rounded-xl bg-white/20 p-3 text-sm">Vị trí đã chia sẻ · mở trong bản đồ</div>}<span className="mt-2 block text-xs opacity-70">{message.time}</span></div></div>)}</div>
          <div className="border-t border-[#ece2e0] p-4"><div className="flex gap-2"><button onClick={() => send("location")} className="rounded-xl border border-[#e2e2e5] px-4 font-bold text-[#5b403d]">Vị trí</button><input value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") send(); }} placeholder="Nhập tin nhắn..." className="flex-1 rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" /><button onClick={() => send()} className="rounded-xl bg-[#b7131a] px-5 font-bold text-white">Gửi</button></div></div>
        </section>
      </main>
    </PageShell>
  );
}

function MarketsPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="rounded-3xl bg-[#b7131a] p-8 text-white md:p-10"><Badge>Đánh hàng Trung Quốc</Badge><h1 className="mt-4 text-4xl font-bold tracking-[-0.05em]">Tìm đúng chợ, đúng guide, đúng nguồn hàng</h1><p className="mt-4 max-w-3xl leading-7 text-white/85">Danh sách chợ đầu mối được thiết kế cho dân buôn Việt: ngành hàng, giờ mở cửa, lưu ý mặc cả, cảnh báo rủi ro và guide phù hợp.</p></div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{markets.map((market) => <Link key={market.id} to={`/markets/${market.id}`} className="overflow-hidden rounded-2xl border border-[#ece2e0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><img src={market.image} alt={market.name} className="h-44 w-full object-cover" /><div className="p-5"><Badge tone="blue">{market.category}</Badge><h2 className="mt-3 text-xl font-bold">{market.name}</h2><p className="mt-2 text-sm text-[#5b5f61]">{market.city} · {market.hours}</p><p className="mt-3 text-sm leading-6 text-[#5b403d]">{market.suitableFor}</p></div></Link>)}</div>
      </main>
    </PageShell>
  );
}

function MarketDetailPage() {
  const { id } = useParams();
  const market = markets.find((item) => item.id === id) || markets[0];
  const suggestedGuides = guides.filter((guide) => market.guideIds.includes(guide.id));
  return <PageShell><main className="mx-auto max-w-7xl px-4 py-8 md:px-8"><div className="grid gap-8 md:grid-cols-[1fr_360px]"><section className="overflow-hidden rounded-3xl border border-[#ece2e0] bg-white"><img src={market.image} alt={market.name} className="h-80 w-full object-cover" /><div className="p-6 md:p-8"><Badge tone="blue">{market.category}</Badge><h1 className="mt-3 text-4xl font-bold tracking-[-0.05em]">{market.name}</h1><p className="mt-2 text-[#5b5f61]">{market.city} · {market.hours}</p><div className="mt-8 grid gap-4 md:grid-cols-2">{[["Phù hợp", market.suitableFor], ["Mức giá", market.priceLevel], ["Mặc cả", market.bargaining], ["Cảnh báo", market.warning]].map(([title, desc]) => <div key={title} className="rounded-2xl bg-[#f8f3f2] p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#5b403d]">{desc}</p></div>)}</div></div></section><aside className="space-y-4"> <div className="rounded-3xl bg-[#f8f3f2] p-5"><h2 className="text-xl font-bold">Guide phù hợp</h2><div className="mt-4 space-y-4">{suggestedGuides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div></div></aside></div></main></PageShell>;
}

function HandbookPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("Tất cả");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const topics = ["Tất cả", ...Array.from(new Set(handbookArticles.map((article) => article.topic)))];
  const filteredArticles = handbookArticles.filter((article) => {
    const matchesTopic = topic === "Tất cả" || article.topic === topic;
    const matchesQuery = `${article.title} ${article.summary} ${article.city} ${article.topic}`.toLowerCase().includes(query.toLowerCase());
    return matchesTopic && matchesQuery;
  });
  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <section className="rounded-3xl bg-[#b7131a] p-8 text-white md:p-10">
          <Badge>Cẩm nang C-TourGuide</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em]">Cẩm nang du lịch và đánh hàng</h1>
          <p className="mt-3 max-w-3xl leading-7 text-white/85">Thông tin thực tế cho khách Việt: di chuyển, thanh toán, chợ đầu mối, ăn uống, cảnh báo rủi ro và checklist chuẩn bị trước chuyến đi.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px]">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm metro, thanh toán, Bạch Mã, Thành Đô..." className="rounded-xl border border-white/20 bg-white px-4 py-3 text-[#1a1c1e] outline-none focus:border-white" />
            <div className="rounded-xl bg-white/15 px-4 py-3 font-bold">Đã lưu: {savedIds.length} bài</div>
          </div>
        </section>
        <div className="mt-6 flex flex-wrap gap-2">
          {topics.map((item) => <button key={item} onClick={() => setTopic(item)} className={`rounded-full px-4 py-2 text-sm font-bold ${topic === item ? "bg-[#b7131a] text-white" : "bg-[#f8f3f2] text-[#5b403d]"}`}>{item}</button>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {filteredArticles.map((article) => (
            <article key={article.id} className="overflow-hidden rounded-2xl border border-[#ece2e0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <Link to={`/handbook/${article.id}`}><img src={article.image} alt={article.title} className="h-44 w-full object-cover" /></Link>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3"><Badge tone="red">{article.topic}</Badge><button onClick={() => toggleSaved(article.id)} className={`rounded-full px-3 py-1 text-xs font-bold ${savedIds.includes(article.id) ? "bg-[#b7131a] text-white" : "bg-[#f8f3f2] text-[#5b403d]"}`}>{savedIds.includes(article.id) ? "Đã lưu" : "Lưu"}</button></div>
                <Link to={`/handbook/${article.id}`}><h2 className="mt-3 text-xl font-bold hover:text-[#b7131a]">{article.title}</h2></Link>
                <p className="mt-1 text-sm text-[#5b5f61]">{article.city}</p>
                <p className="mt-3 text-sm leading-6 text-[#5b403d]">{article.summary}</p>
                <Link to={`/handbook/${article.id}`} className="mt-4 inline-block font-bold text-[#b7131a]">Đọc chi tiết</Link>
              </div>
            </article>
          ))}
        </div>
        {!filteredArticles.length && <div className="mt-8 rounded-3xl border border-dashed border-[#dfc9c6] p-10 text-center text-[#5b5f61]">Không tìm thấy bài viết phù hợp. Thử đổi từ khóa hoặc chọn chủ đề khác.</div>}
      </main>
    </PageShell>
  );
}

function HandbookDetailPage() {
  const { id } = useParams();
  const article = handbookArticles.find((item) => item.id === id) || handbookArticles[0];
  const relatedArticles = handbookArticles.filter((item) => item.id !== article.id && (item.topic === article.topic || item.city === article.city)).slice(0, 3);
  const checklist = [
    `Chuẩn bị trước: lưu địa chỉ ${article.city}, ảnh chụp hộ chiếu và thông tin khách sạn.`,
    "Trong chuyến đi: luôn xác nhận giá, vị trí, thời gian và điều kiện dịch vụ bằng tin nhắn.",
    "Sau khi hoàn tất: lưu hóa đơn, ảnh sản phẩm, mã vận đơn hoặc vé để đối chiếu khi cần.",
  ];
  const sections = [
    ["Nên làm gì trước", article.summary],
    ["Các lỗi thường gặp", article.topic === "Đánh hàng" ? "Đặt cọc khi chưa kiểm mẫu, không chụp lại quầy hàng, không hỏi rõ MOQ và điều kiện đổi trả." : "Không kiểm tra phương thức thanh toán, không lưu tên địa điểm bằng tiếng Trung và phụ thuộc hoàn toàn vào mạng di động."],
    ["Câu tiếng Trung hữu ích", "请问多少钱？Có giá bao nhiêu? · 可以便宜一点吗？Có thể giảm chút không? · 请帮我写地址。Vui lòng ghi giúp địa chỉ."],
  ];
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <Link to="/handbook" className="font-bold text-[#b7131a]">← Quay lại cẩm nang</Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="overflow-hidden rounded-3xl border border-[#ece2e0] bg-white shadow-sm">
            <img src={article.image} alt={article.title} className="h-80 w-full object-cover" />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2"><Badge tone="red">{article.topic}</Badge><Badge tone="blue">{article.city}</Badge></div>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em]">{article.title}</h1>
              <p className="mt-4 text-lg leading-8 text-[#5b403d]">{article.summary}</p>
              <div className="mt-8 space-y-5">
                {sections.map(([title, content]) => <section key={title} className="rounded-2xl bg-[#f8f3f2] p-5"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-[#5b403d]">{content}</p></section>)}
              </div>
            </div>
          </article>
          <aside className="space-y-5">
            <div className="rounded-3xl bg-[#fff1ef] p-6"><h2 className="text-xl font-bold">Checklist nhanh</h2><div className="mt-4 space-y-3">{checklist.map((item) => <label key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-[#5b403d]"><input type="checkbox" className="mt-1" />{item}</label>)}</div></div>
            <div className="rounded-3xl border border-[#ece2e0] bg-white p-6"><h2 className="text-xl font-bold">Hành động tiếp theo</h2><div className="mt-4 grid gap-3"><Link to="/guides" className="rounded-xl bg-[#b7131a] px-4 py-3 text-center font-bold text-white">Tìm Local Guide</Link><Link to="/map" className="rounded-xl border border-[#e4beb9] px-4 py-3 text-center font-bold text-[#b7131a]">Mở bản đồ</Link><Link to="/ai" className="rounded-xl border border-[#e4beb9] px-4 py-3 text-center font-bold text-[#b7131a]">Hỏi trợ lý AI</Link></div></div>
            {relatedArticles.length > 0 && <div className="rounded-3xl border border-[#ece2e0] bg-white p-6"><h2 className="text-xl font-bold">Bài liên quan</h2><div className="mt-4 space-y-3">{relatedArticles.map((item) => <Link key={item.id} to={`/handbook/${item.id}`} className="block rounded-2xl bg-[#f8f3f2] p-4"><b>{item.title}</b><p className="mt-1 text-sm text-[#5b5f61]">{item.city}</p></Link>)}</div></div>}
          </aside>
        </div>
      </main>
    </PageShell>
  );
}

function GuideRegisterPage() {
  return <PageShell><main className="mx-auto max-w-3xl px-4 py-10 md:px-8"><div className="rounded-3xl border border-[#ece2e0] bg-white p-6 md:p-8"><Badge tone="green">Dành cho Local Guide</Badge><h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Đăng ký làm guide C-TourGuide</h1><p className="mt-3 text-[#5b5f61]">Hoàn tất hồ sơ, xác minh giấy tờ, khu vực sinh sống và kỹ năng dẫn khách để bắt đầu nhận booking.</p><div className="mt-6 grid gap-4"><input placeholder="Họ và tên" className="rounded-xl border border-[#e2e2e5] px-4 py-3" /><input placeholder="Thành phố đang sinh sống tại Trung Quốc" className="rounded-xl border border-[#e2e2e5] px-4 py-3" /><select className="rounded-xl border border-[#e2e2e5] px-4 py-3"><option>Chuyên môn chính: Guide đánh hàng</option><option>Guide du lịch</option><option>Phiên dịch công tác</option></select><button className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Gửi hồ sơ xác minh</button></div></div></main></PageShell>;
}

function SafetyPage() {
  return <PageShell><main className="mx-auto max-w-5xl px-4 py-10 md:px-8"><h1 className="text-4xl font-bold tracking-[-0.05em]">An toàn và hỗ trợ</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{["Xác minh hai chiều", "Chia sẻ vị trí chuyến đi", "SOS và hỗ trợ khẩn cấp"].map((item) => <div key={item} className="rounded-2xl bg-[#f8f3f2] p-6"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm leading-6 text-[#5b403d]">C-TourGuide ưu tiên xác minh danh tính, theo dõi hành trình và hỗ trợ kịp thời khi khách cần trợ giúp.</p></div>)}</div></main></PageShell>;
}

function UserProfilePage() {
  return <PageShell><main className="mx-auto max-w-5xl px-4 py-10 md:px-8"><div className="rounded-3xl border border-[#ece2e0] bg-white p-6 md:p-8"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-4"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1ef] text-2xl font-bold text-[#b7131a]">MA</div><div><h1 className="text-3xl font-bold tracking-[-0.04em]">Nguyễn Minh Anh</h1><p className="mt-1 text-[#5b5f61]">Khách cá nhân · Thành viên đã xác minh email</p></div></div><Link to="/booking/CTG-000001" className="rounded-xl bg-[#b7131a] px-5 py-3 text-center font-bold text-white">Xem booking gần nhất</Link></div><div className="mt-8 grid gap-4 md:grid-cols-3">{[["Booking", "3 chuyến đã đặt"], ["Guide yêu thích", "5 hồ sơ đã lưu"], ["Thành phố quan tâm", "Quảng Châu, Thâm Quyến"]].map(([title, value]) => <div key={title} className="rounded-2xl bg-[#f8f3f2] p-5"><div className="font-bold">{title}</div><div className="mt-2 text-sm text-[#5b5f61]">{value}</div></div>)}</div></div></main></PageShell>;
}

function WorkspacePage() {
  const session = getSession();
  if (!session) return <PageShell><main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Bạn cần đăng nhập để vào khu vực tài khoản</h1><Link to="/login" className="mt-6 inline-block rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Đăng nhập</Link></main></PageShell>;
  return <PageShell><main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-bold">Khu vực tài khoản của bạn</h1><p className="mt-3 text-[#5b5f61]">Chọn tiếp để vào đúng trang chức năng theo vai trò hiện tại.</p><Link to={roleHomePath[session.role]} className="mt-6 inline-block rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Vào khu vực làm việc</Link></main></PageShell>;
}

function NotFoundPage() {
  return <PageShell><main className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-4xl font-bold">Không tìm thấy trang</h1><Link to="/" className="mt-6 inline-block rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Về trang chủ</Link></main></PageShell>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuideSearchPage />} />
        <Route path="/search" element={<GuideSearchPage />} />
        <Route path="/guides/:id" element={<GuideProfilePage />} />
        <Route path="/guide" element={<GuideProfilePage />} />
        <Route path="/booking/new/:guideId" element={<NewBookingPage />} />
        <Route path="/booking/:id" element={<BookingStatusPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/markets/:id" element={<MarketDetailPage />} />
        <Route path="/handbook" element={<HandbookPage />} />
        <Route path="/handbook/:id" element={<HandbookDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="/sourcing" element={<SourcingPage />} />
        <Route path="/guide-register" element={<GuideRegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/partner-onboarding" element={<Navigate to="/partner/profile" replace />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/partner/dashboard" element={<PartnerOverviewPage />} />
        <Route path="/partner/leads" element={<PartnerLeadsPage />} />
        <Route path="/partner/services" element={<PartnerServicesPage />} />
        <Route path="/partner/orders" element={<PartnerOrdersPage />} />
        <Route path="/partner/profile" element={<PartnerProfilePage />} />
        <Route path="/partner/messages" element={<PartnerMessagesPage />} />
        <Route path="/guide/dashboard" element={<GuideOverviewPage />} />
        <Route path="/guide/bookings" element={<GuideBookingsPage />} />
        <Route path="/guide/calendar" element={<GuideCalendarPage />} />
        <Route path="/guide/profile" element={<GuideProfileManagePage />} />
        <Route path="/guide/verification" element={<GuideVerificationPage />} />
        <Route path="/guide/earnings" element={<GuideEarningsPage />} />
        <Route path="/guide/messages" element={<GuideMessagesPage />} />
        <Route path="/dashboard" element={<Navigate to="/guide/dashboard" replace />} />
        <Route path="/admin" element={<AdminOverviewPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/guides" element={<AdminGuidesPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/partners" element={<AdminPartnersPage />} />
        <Route path="/admin/revenue" element={<AdminRevenuePage />} />
        <Route path="/revenue" element={<Navigate to="/guide/earnings" replace />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";

type LeadStage = "Mới" | "Đang tư vấn" | "Cần báo giá" | "Đã gửi báo giá" | "Đã chốt";
type PartnerLead = {
  id: string;
  customer: string;
  city: string;
  category: string;
  source: string;
  need: string;
  value: string;
  probability: string;
  stage: LeadStage;
  deadline: string;
  owner: string;
  tags: string[];
  activity: string[];
};
type PartnerService = { name: string; desc: string; status: string; price: string; leads: number; conversion: string; rating: string; issues: string };
type PartnerOrder = { id: string; customer: string; service: string; quantity: string; revenue: string; status: string; payment: string; timeline: string[] };
type ChatMessage = { author: "customer" | "partner" | "system"; text: string; time: string };

const initialLeads: PartnerLead[] = [
  { id: "LEAD-9021", customer: "Shop thời trang Linh Chi", city: "Quảng Châu", category: "Kho vận + gom hàng", source: "Chợ Bạch Mã, Sha He", need: "Cần gom hàng quần áo nữ từ 12 nhà cung cấp, kiểm số lượng, đóng kiện và gửi về Hà Nội trong 5 ngày.", value: "18.5M", probability: "82%", stage: "Cần báo giá", deadline: "Hôm nay 17:00", owner: "Trần Bảo", tags: ["Dân buôn", "Gấp", "Có guide đi cùng"], activity: ["Khách đã gửi danh sách nhà cung cấp", "Cần báo giá trước 17:00"] },
  { id: "LEAD-9014", customer: "Nhóm khách công tác Thâm Quyến", city: "Thâm Quyến", category: "eSIM + xe + giao nhận mẫu", source: "Sân bay Bảo An, Huaqiangbei", need: "Cần eSIM, xe đưa đón sân bay, giao nhận 8 kiện mẫu linh kiện và hỗ trợ hóa đơn dịch vụ.", value: "7.2M", probability: "64%", stage: "Đang tư vấn", deadline: "Ngày mai 10:30", owner: "Mai Anh", tags: ["Công tác", "Linh kiện", "Cần tiếng Trung"], activity: ["Đã gọi tư vấn lần 1", "Chờ khách xác nhận giờ bay"] },
  { id: "LEAD-8997", customer: "Mỹ phẩm Hương Việt", city: "Quảng Châu", category: "Kho vận chuyên ngành", source: "Xingfa Cosmetics Market", need: "Tìm đơn vị đóng gói mỹ phẩm, kiểm nhãn, tư vấn tuyến vận chuyển và quy định hàng dễ vỡ.", value: "12M", probability: "71%", stage: "Đã gửi báo giá", deadline: "Chờ khách phản hồi", owner: "Trần Bảo", tags: ["Mỹ phẩm", "Kiểm nhãn", "Dễ vỡ"], activity: ["Đã gửi báo giá 12M", "Khách hỏi thêm phụ phí hàng dễ vỡ"] },
  { id: "LEAD-8976", customer: "Minh Anh Travel Group", city: "Thượng Hải", category: "Xe đoàn + nhà hàng", source: "Pudong, The Bund", need: "Đoàn 14 khách cần xe 19 chỗ, đặt nhà hàng Việt/Trung phù hợp và hỗ trợ xuất hóa đơn.", value: "22M", probability: "58%", stage: "Mới", deadline: "2 ngày nữa", owner: "Mai Anh", tags: ["Đoàn khách", "Nhà hàng", "Xe riêng"], activity: ["Lead mới từ lịch trình khách đoàn"] },
];

const initialServices: PartnerService[] = [
  { name: "Kho gom hàng Quảng Châu", desc: "Nhận hàng từ Bạch Mã, Sha He, Yide Road; kiểm số lượng, đóng kiện, dán mã và tạo phiếu nhập kho.", status: "Đang hiển thị", price: "Từ 18.000đ/kg", leads: 34, conversion: "31%", rating: "4.8", issues: "0 cảnh báo" },
  { name: "Xe đón sân bay Bạch Vân", desc: "Đón tiễn khách Việt, hỗ trợ hành lý, biển tên tiếng Việt và đưa về khách sạn trung tâm Quảng Châu.", status: "Cần cập nhật giá", price: "Từ 680.000đ/chuyến", leads: 18, conversion: "22%", rating: "4.7", issues: "Thiếu bảng giá Tết" },
  { name: "eSIM Trung Quốc", desc: "Gói data dùng WeChat, bản đồ, app gọi xe, tra cứu chợ và liên hệ guide trong chuyến đi.", status: "Đang hiển thị", price: "Từ 180.000đ/gói", leads: 42, conversion: "45%", rating: "4.9", issues: "0 cảnh báo" },
  { name: "Đóng gói hàng dễ vỡ", desc: "Bọc chống sốc, chụp ảnh trước khi đóng kiện, niêm phong và ghi nhận tình trạng hàng hóa.", status: "Đang xét duyệt", price: "Từ 35.000đ/kiện", leads: 9, conversion: "18%", rating: "Mới", issues: "Cần ảnh quy trình" },
];

const initialOrders: PartnerOrder[] = [
  { id: "ORD-48291", customer: "Shop thời trang Linh Chi", service: "Kho gom hàng Quảng Châu", quantity: "5 kiện · 128kg", revenue: "4.800.000đ", status: "Đang xử lý", payment: "Đã cọc 50%", timeline: ["Đã nhận mã vận đơn", "Đang chờ 2 kiện cuối", "Dự kiến đóng kiện tối nay"] },
  { id: "ORD-48210", customer: "Nguyễn Minh Anh", service: "Xe đón sân bay Bạch Vân", quantity: "1 chuyến · 2 khách", revenue: "680.000đ", status: "Hoàn tất", payment: "Đã đối soát", timeline: ["Tài xế đã đón đúng giờ", "Khách xác nhận hoàn tất", "Tiền đã vào số dư khả dụng"] },
  { id: "ORD-48172", customer: "Mỹ phẩm Hương Việt", service: "Kho vận chuyên ngành", quantity: "3 kiện · hàng dễ vỡ", revenue: "2.900.000đ", status: "Chờ thanh toán", payment: "Chưa thanh toán", timeline: ["Đã gửi báo giá", "Chờ khách xác nhận phụ phí đóng gói", "Chưa tạo phiếu kho"] },
];

const settlements = [["Chu kỳ 01-15/08", "28 đơn", "42.100.000đ", "Đã đối soát", "16/08/2026"], ["Chu kỳ 16-31/08", "19 đơn", "26.300.000đ", "Đang đối soát", "01/09/2026"], ["Phụ phí phát sinh", "7 mục", "3.450.000đ", "Cần xác nhận", "Hôm nay"]];
const profileChecks = [["Pháp nhân", "Đã xác minh", "Tên pháp nhân và mã đăng ký kinh doanh khớp hồ sơ."], ["Địa chỉ kho", "Cần bổ sung", "Thiếu ảnh bảng hiệu và tọa độ kho nhận hàng."], ["Tài khoản nhận tiền", "Đã xác minh", "Tài khoản ngân hàng đã qua bước đối chiếu."], ["Quy trình xử lý khiếu nại", "Đang xét duyệt", "Cần mô tả thời gian phản hồi và chính sách bồi hoàn."]];
const stageList: LeadStage[] = ["Mới", "Đang tư vấn", "Cần báo giá", "Đã gửi báo giá", "Đã chốt"];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function nowLabel() {
  return new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function useToast() {
  const [message, setMessage] = useState("");
  function show(next: string) {
    setMessage(next);
    window.setTimeout(() => setMessage(""), 2600);
  }
  const toast = message ? <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#1a1c1e] px-5 py-3 text-sm font-bold text-white shadow-xl">{message}</div> : null;
  return { show, toast };
}

function PartnerShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const nav = [["/partner/dashboard", "Tổng quan"], ["/partner/leads", "Nguồn khách"], ["/partner/services", "Dịch vụ"], ["/partner/orders", "Đơn hàng"], ["/partner/profile", "Hồ sơ đối tác"], ["/partner/messages", "Tin nhắn"]];
  return (
    <div className="flex min-h-screen bg-[#f9f9fc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <aside className="hidden w-[268px] border-r border-[#d6e5ea] bg-white p-4 md:flex md:flex-col">
        <Link to="/" className="text-xl font-bold text-[#b7131a]">C-TourGuide</Link>
        <div className="mt-1 text-xs text-[#5b5f61]">Trung tâm đối tác</div>
        <div className="mt-6 rounded-2xl bg-[#e7f4f8] p-4"><div className="text-sm font-bold text-[#006578]">China Logistics Hub</div><div className="mt-1 text-xs leading-5 text-[#35464b]">Kho vận, xe đưa đón, eSIM và dịch vụ hỗ trợ khách Việt tại Trung Quốc.</div></div>
        <nav className="mt-6 flex flex-col gap-2">{nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => cn("rounded-xl px-4 py-3 text-sm font-semibold transition-colors", isActive ? "bg-[#006578] text-white" : "text-[#35464b] hover:bg-[#e7f4f8] hover:text-[#006578]")}>{label}</NavLink>)}</nav>
        <div className="mt-auto rounded-2xl border border-[#d6e5ea] p-4 text-xs leading-5 text-[#5b5f61]">Điểm ưu tiên hiển thị phụ thuộc tốc độ phản hồi, tỷ lệ hoàn tất đơn và độ đầy đủ của hồ sơ.</div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="border-b border-[#d6e5ea] bg-white px-4 py-3 md:hidden">
          <div className="font-bold text-[#006578]">C-TourGuide Partner</div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">{nav.map(([to, label]) => <Link key={to} to={to} className="shrink-0 rounded-full bg-[#e7f4f8] px-3 py-2 text-xs font-bold text-[#006578]">{label}</Link>)}</div>
        </div>
        <div className="flex-1 p-4 md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><div className="text-sm font-bold uppercase tracking-[0.18em] text-[#006578]">Partner workspace</div><h1 className="mt-2 text-4xl font-bold tracking-[-0.05em]">{title}</h1><p className="mt-2 max-w-3xl text-[#5b5f61]">{description}</p></div><div className="flex flex-wrap gap-2"><Link to="/partner/leads" className="rounded-xl border border-[#006578] px-5 py-3 font-bold text-[#006578]">Xem lead</Link><Link to="/partner/profile" className="rounded-xl bg-[#006578] px-5 py-3 font-bold text-white">Cập nhật hồ sơ</Link></div></div>
          {children}
        </div>
        <DashboardFooter title="C-TourGuide Partner" description="Quản lý lead, dịch vụ, đơn hàng, báo giá và đối soát dành cho đối tác." homePath="/partner/dashboard" homeLabel="Về tổng quan đối tác" />
      </main>
    </div>
  );
}

function StatusPill({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "amber" | "green" | "red" | "gray" }) {
  const toneClass = tone === "green" ? "bg-[#e7f7ed] text-[#087443]" : tone === "amber" ? "bg-[#fff4d8] text-[#8a5a00]" : tone === "red" ? "bg-[#fff1ef] text-[#b7131a]" : tone === "gray" ? "bg-[#f2f2f4] text-[#5b5f61]" : "bg-[#e7f4f8] text-[#006578]";
  return <span className={cn("rounded-full px-3 py-1 text-xs font-bold", toneClass)}>{children}</span>;
}

function StatCard({ label, value, trend, tone }: { label: string; value: string; trend: string; tone: "blue" | "amber" | "green" | "red" }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm"><div className="text-sm font-semibold uppercase tracking-wide text-[#5b5f61]">{label}</div><div className="mt-3 text-3xl font-bold">{value}</div><div className="mt-3"><StatusPill tone={tone}>{trend}</StatusPill></div></div>;
}

function LeadCard({ lead, compact = false, onQuote, onCall, onAssign, onStage }: { lead: PartnerLead; compact?: boolean; onQuote?: (lead: PartnerLead) => void; onCall?: (lead: PartnerLead) => void; onAssign?: (lead: PartnerLead) => void; onStage?: (id: string, stage: LeadStage) => void }) {
  return (
    <article className="rounded-2xl border border-[#d6e5ea] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"><div className="min-w-0"><div className="flex flex-wrap gap-2"><StatusPill>{lead.id}</StatusPill><StatusPill tone={lead.stage === "Đã chốt" ? "green" : lead.stage === "Cần báo giá" ? "amber" : "blue"}>{lead.stage}</StatusPill><StatusPill tone="gray">{lead.city}</StatusPill></div><h2 className="mt-3 text-xl font-bold">{lead.customer}</h2><p className="mt-2 text-sm font-semibold text-[#006578]">{lead.category} · {lead.source}</p><p className="mt-3 text-sm leading-6 text-[#5b5f61]">{lead.need}</p>{!compact && <div className="mt-4 flex flex-wrap gap-2">{lead.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f8f3f2] px-3 py-1 text-xs font-semibold text-[#5b403d]">{tag}</span>)}</div>}</div><div className="grid shrink-0 gap-2 text-sm xl:w-[190px]"><div className="rounded-xl bg-[#f7fbfc] p-3"><div className="text-[#5b5f61]">Giá trị dự kiến</div><div className="font-bold">{lead.value}</div></div><div className="rounded-xl bg-[#f7fbfc] p-3"><div className="text-[#5b5f61]">Khả năng chốt</div><div className="font-bold">{lead.probability}</div></div><div className="rounded-xl bg-[#fff1ef] p-3"><div className="text-[#5b5f61]">Hạn xử lý</div><div className="font-bold text-[#b7131a]">{lead.deadline}</div></div></div></div>
      {!compact && <><div className="mt-4 rounded-xl bg-[#f7fbfc] p-3 text-sm text-[#35464b]">{lead.activity[lead.activity.length - 1]}</div><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => onQuote?.(lead)} className="rounded-xl bg-[#006578] px-4 py-2 font-bold text-white">Tạo báo giá</button><button onClick={() => onCall?.(lead)} className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">Ghi nhận cuộc gọi</button><button onClick={() => onAssign?.(lead)} className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">Gắn nhân sự</button>{onStage && <select value={lead.stage} onChange={(event) => onStage(lead.id, event.target.value as LeadStage)} className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">{stageList.map((stage) => <option key={stage}>{stage}</option>)}</select>}</div></>}
    </article>
  );
}

export function PartnerOverviewPage() {
  const { show, toast } = useToast();
  const [dismissed, setDismissed] = useState(false);
  const stats = [{ label: "Lead mới", value: "18", trend: "+6 tuần này", tone: "blue" as const }, { label: "Báo giá chờ phản hồi", value: "7", trend: "3 lead giá trị cao", tone: "amber" as const }, { label: "Doanh thu tháng", value: "68.4M", trend: "Đã đối soát 42.1M", tone: "green" as const }, { label: "Điểm vận hành", value: dismissed ? "96/100" : "92/100", trend: dismissed ? "Đã xử lý cảnh báo" : "Phản hồi TB 14 phút", tone: "red" as const }];
  return <PartnerShell title="Tổng quan đối tác" description="Theo dõi hiệu quả hiển thị, pipeline nguồn khách, đơn đang xử lý và các cảnh báo vận hành cần ưu tiên.">{toast}<div className="grid gap-4 md:grid-cols-4">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div><div className="mt-6 grid gap-4 md:grid-cols-4">{stageList.slice(0, 4).map((stage) => { const count = initialLeads.filter((lead) => lead.stage === stage).length || (stage === "Mới" ? 5 : 2); return <Link to="/partner/leads" key={stage} className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5"><StatusPill tone={stage === "Cần báo giá" ? "amber" : stage === "Đã chốt" ? "green" : "blue"}>{stage}</StatusPill><div className="mt-4 text-2xl font-bold">{count} lead</div><div className="mt-1 text-sm text-[#5b5f61]">Nhấn để xử lý pipeline</div></Link>; })}</div><div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]"><section className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold">Lead cần xử lý trước</h2><Link to="/partner/leads" className="font-bold text-[#006578]">Xem pipeline</Link></div><div className="mt-5 space-y-4">{initialLeads.slice(0, 2).map((lead) => <LeadCard key={lead.id} lead={lead} compact />)}</div></section><aside className="space-y-4"><div className="rounded-3xl bg-[#e7f4f8] p-6"><h2 className="text-xl font-bold">Cảnh báo vận hành</h2>{dismissed ? <p className="mt-4 text-sm font-bold text-[#006578]">Các cảnh báo chính đã được đánh dấu xử lý trong phiên làm việc này.</p> : <div className="mt-4 space-y-3 text-sm leading-6 text-[#35464b]"><p>1 lead giá trị cao cần báo giá trước 17:00 hôm nay.</p><p>Dịch vụ xe sân bay thiếu bảng giá dịp cao điểm.</p><p>Hồ sơ kho cần bổ sung ảnh bảng hiệu để tăng độ tin cậy.</p></div>}<button onClick={() => { setDismissed(true); show("Đã đánh dấu cảnh báo vận hành là đã xử lý"); }} className="mt-5 rounded-xl bg-[#006578] px-4 py-2 font-bold text-white">Đánh dấu đã xử lý</button></div><div className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Hiệu suất tuần</h2><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>Lead phản hồi trong 30 phút</span><b>86%</b></div><div className="flex justify-between"><span>Đơn hoàn tất đúng hạn</span><b>94%</b></div><div className="flex justify-between"><span>Khiếu nại đang mở</span><b>{dismissed ? 0 : 1}</b></div></div></div></aside></div></PartnerShell>;
}

export function PartnerLeadsPage() {
  const { show, toast } = useToast();
  const [leads, setLeads] = useState(initialLeads);
  const [activeStage, setActiveStage] = useState<LeadStage | "Tất cả">("Tất cả");
  const [selectedLead, setSelectedLead] = useState<PartnerLead>(initialLeads[0]);
  const visibleLeads = activeStage === "Tất cả" ? leads : leads.filter((lead) => lead.stage === activeStage);
  function updateLead(id: string, updater: (lead: PartnerLead) => PartnerLead) {
    setLeads((current) => current.map((lead) => lead.id === id ? updater(lead) : lead));
  }
  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateLead(selectedLead.id, (lead) => ({ ...lead, stage: "Đã gửi báo giá", activity: [...lead.activity, `Đã gửi báo giá lúc ${nowLabel()}`] }));
    show(`Đã gửi báo giá cho ${selectedLead.customer}`);
  }
  return <PartnerShell title="Nguồn khách và pipeline" description="Quản lý toàn bộ nhu cầu dịch vụ, ưu tiên lead theo hạn xử lý, giá trị dự kiến và khả năng chốt.">{toast}<div className="grid gap-3 md:grid-cols-6"><button onClick={() => setActiveStage("Tất cả")} className={cn("rounded-2xl p-4 text-left shadow-sm", activeStage === "Tất cả" ? "bg-[#006578] text-white" : "bg-white")}>Tất cả<div className="mt-2 font-bold">{leads.length} lead</div></button>{stageList.map((stage) => <button key={stage} onClick={() => setActiveStage(stage)} className={cn("rounded-2xl p-4 text-left shadow-sm", activeStage === stage ? "bg-[#006578] text-white" : "bg-white")}><StatusPill tone={stage === "Cần báo giá" ? "amber" : stage === "Đã chốt" ? "green" : "blue"}>{stage}</StatusPill><div className="mt-3 font-bold">{leads.filter((lead) => lead.stage === stage).length} lead</div></button>)}</div><div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]"><section className="space-y-4">{visibleLeads.map((lead) => <LeadCard key={lead.id} lead={lead} onQuote={(item) => { setSelectedLead(item); show(`Đã chọn ${item.id} để tạo báo giá`); }} onCall={(item) => { updateLead(item.id, (lead) => ({ ...lead, stage: "Đang tư vấn", activity: [...lead.activity, `Đã ghi nhận cuộc gọi lúc ${nowLabel()}`] })); show(`Đã ghi nhận cuộc gọi với ${item.customer}`); }} onAssign={(item) => { updateLead(item.id, (lead) => ({ ...lead, owner: lead.owner === "Trần Bảo" ? "Mai Anh" : "Trần Bảo", activity: [...lead.activity, `Đã đổi nhân sự phụ trách lúc ${nowLabel()}`] })); show(`Đã cập nhật nhân sự phụ trách cho ${item.id}`); }} onStage={(id, stage) => { updateLead(id, (lead) => ({ ...lead, stage, activity: [...lead.activity, `Đổi trạng thái sang ${stage} lúc ${nowLabel()}`] })); show("Đã đổi trạng thái lead"); }} />)}</section><aside className="rounded-3xl bg-white p-6 shadow-sm xl:sticky xl:top-6 xl:self-start"><h2 className="text-xl font-bold">Tạo báo giá nhanh</h2><p className="mt-2 text-sm text-[#5b5f61]">Lead đang chọn: <b>{selectedLead.id}</b></p><form onSubmit={submitQuote} className="mt-4 grid gap-3">{[["Dịch vụ đề xuất", selectedLead.category], ["Số kiện / số khách", "5 kiện / 128kg"], ["Đơn giá dự kiến", selectedLead.value], ["Thời gian hoàn tất", "5-7 ngày"]].map(([field, value]) => <label key={field}><span className="mb-1 block text-sm font-semibold">{field}</span><input defaultValue={value} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" /></label>)}<label><span className="mb-1 block text-sm font-semibold">Ghi chú báo giá</span><textarea rows={4} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" defaultValue="Báo giá gồm phí xử lý cơ bản, chưa gồm phụ phí hàng dễ vỡ hoặc kiểm đếm chi tiết từng mẫu." /></label><button className="rounded-xl bg-[#006578] px-5 py-3 font-bold text-white">Gửi báo giá cho khách</button></form></aside></div></PartnerShell>;
}

export function PartnerServicesPage() {
  const { show, toast } = useToast();
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState<PartnerService | null>(null);
  function saveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    const data = new FormData(event.currentTarget);
    setServices((current) => current.map((service) => service.name === editing.name ? { ...service, price: String(data.get("price") || service.price), desc: String(data.get("desc") || service.desc), status: "Đang hiển thị", issues: "0 cảnh báo" } : service));
    show(`Đã cập nhật ${editing.name}`);
    setEditing(null);
  }
  return <PartnerShell title="Dịch vụ và gói bán" description="Quản lý danh mục dịch vụ, giá, điều kiện phục vụ, chất lượng vận hành và mức độ hiển thị trên nền tảng.">{toast}<div className="grid gap-4 lg:grid-cols-2">{services.map((service) => <article key={service.name} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><StatusPill tone={service.status.includes("Cần") ? "amber" : service.status.includes("xét") ? "gray" : "blue"}>{service.status}</StatusPill><h2 className="mt-4 text-2xl font-bold">{service.name}</h2></div><div className="text-lg font-bold text-[#006578]">{service.price}</div></div><p className="mt-3 text-sm leading-6 text-[#5b5f61]">{service.desc}</p><div className="mt-5 grid gap-3 md:grid-cols-4">{[["Lead", service.leads], ["Chốt", service.conversion], ["Đánh giá", service.rating], ["Cảnh báo", service.issues]].map(([label, value]) => <div key={label} className="rounded-xl bg-[#f7fbfc] p-3"><div className="text-xs text-[#5b5f61]">{label}</div><div className="mt-1 font-bold">{value}</div></div>)}</div><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => setEditing(service)} className="rounded-xl bg-[#006578] px-4 py-2 font-bold text-white">Cập nhật giá</button><button onClick={() => { setEditing(service); show(`Đang mở phần sửa điều kiện cho ${service.name}`); }} className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">Sửa điều kiện</button><Link to="/partner/leads" className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">Xem lead liên quan</Link></div></article>)}</div>{editing && <div className="mt-6 rounded-3xl border border-[#006578] bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Chỉnh sửa: {editing.name}</h2><form onSubmit={saveService} className="mt-4 grid gap-4 md:grid-cols-2"><label><span className="mb-2 block font-semibold">Giá hiển thị</span><input name="price" defaultValue={editing.price} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3" /></label><label className="md:col-span-2"><span className="mb-2 block font-semibold">Điều kiện phục vụ</span><textarea name="desc" defaultValue={editing.desc} rows={4} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3" /></label><div className="flex gap-2"><button className="rounded-xl bg-[#006578] px-5 py-3 font-bold text-white">Lưu thay đổi</button><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-[#d6e5ea] px-5 py-3 font-bold">Hủy</button></div></form></div>}</PartnerShell>;
}

export function PartnerOrdersPage() {
  const { show, toast } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  function advanceOrder(id: string) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: order.status === "Hoàn tất" ? "Hoàn tất" : order.status === "Chờ thanh toán" ? "Đang xử lý" : "Hoàn tất", payment: order.status === "Đang xử lý" ? "Chờ đối soát" : order.payment, timeline: [...order.timeline, `Cập nhật trạng thái lúc ${nowLabel()}`] } : order));
    show("Đã cập nhật trạng thái đơn hàng");
  }
  return <PartnerShell title="Đơn hàng và đối soát" description="Theo dõi trạng thái xử lý đơn dịch vụ, thanh toán, timeline giao hàng và các chu kỳ đối soát doanh thu.">{toast}<div className="grid gap-4 md:grid-cols-3">{[["Số dư khả dụng", "42.1M"], ["Đang chờ đối soát", "26.3M"], ["Phụ phí cần xác nhận", "3.45M"]].map(([label, value]) => <div key={label} className="rounded-2xl bg-white p-5 shadow-sm"><div className="text-sm text-[#5b5f61]">{label}</div><div className="mt-2 text-3xl font-bold">{value}</div></div>)}</div><div className="mt-6 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><div className="text-sm font-bold text-[#006578]">{order.id} · {order.status}</div><h2 className="mt-2 text-xl font-bold">{order.customer}</h2><p className="mt-1 text-sm text-[#5b5f61]">{order.service} · {order.quantity}</p></div><div className="grid gap-2 text-sm md:grid-cols-2 lg:w-[320px]"><div className="rounded-xl bg-[#f7fbfc] p-3"><div>Doanh thu</div><b>{order.revenue}</b></div><div className="rounded-xl bg-[#f7fbfc] p-3"><div>Thanh toán</div><b>{order.payment}</b></div></div></div><div className="mt-5 grid gap-2 md:grid-cols-3">{order.timeline.map((item) => <div key={item} className="rounded-xl border border-[#d6e5ea] p-3 text-sm text-[#35464b]">{item}</div>)}</div><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => advanceOrder(order.id)} className="rounded-xl bg-[#006578] px-4 py-2 font-bold text-white">Cập nhật trạng thái</button><button onClick={() => show(`Đã xuất phiếu xử lý cho ${order.id}`)} className="rounded-xl border border-[#d6e5ea] px-4 py-2 font-bold text-[#35464b]">Xuất phiếu xử lý</button></div></article>)}</div><section className="mt-6 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Chu kỳ đối soát</h2><div className="mt-4 overflow-hidden rounded-2xl border border-[#d6e5ea]"><div className="grid grid-cols-5 gap-4 bg-[#e7f4f8] px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#35464b]"><div>Chu kỳ</div><div>Đơn</div><div>Số tiền</div><div>Trạng thái</div><div>Ngày xử lý</div></div>{settlements.map((row) => <button key={row[0]} onClick={() => show(`Đã mở chi tiết ${row[0]}`)} className="grid w-full grid-cols-5 gap-4 border-t border-[#eef4f6] px-5 py-4 text-left text-sm hover:bg-[#f7fbfc]"><div className="font-bold">{row[0]}</div><div>{row[1]}</div><div>{row[2]}</div><div>{row[3]}</div><div>{row[4]}</div></button>)}</div></section></PartnerShell>;
}

export function PartnerProfilePage() {
  const { show, toast } = useToast();
  const [uploaded, setUploaded] = useState<string[]>([]);
  const completion = 78 + uploaded.length * 6;
  function submitProfile(event: FormEvent) {
    event.preventDefault();
    show("Đã lưu hồ sơ và gửi lại cho bộ phận xét duyệt");
  }
  return <PartnerShell title="Hồ sơ, xác minh và vận hành" description="Hoàn thiện thông tin pháp nhân, năng lực dịch vụ, tài khoản nhận tiền, tài liệu xác minh và quy trình xử lý khiếu nại.">{toast}<div className="grid gap-6 xl:grid-cols-[1fr_390px]"><form onSubmit={submitProfile} className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Thông tin doanh nghiệp</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{["Tên pháp nhân hoặc thương hiệu", "Mã số đăng ký kinh doanh", "Loại hình dịch vụ chính", "Thành phố/khu vực phục vụ", "Người phụ trách vận hành", "Email liên hệ", "Số WeChat/Zalo", "Giờ hỗ trợ", "Địa chỉ kho/văn phòng", "Tài khoản nhận tiền"].map((field) => <label key={field}><span className="mb-2 block font-semibold">{field}</span><input className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" placeholder={field} defaultValue={field === "Tên pháp nhân hoặc thương hiệu" ? "China Logistics Hub" : ""} /></label>)}</div><label className="mt-4 block"><span className="mb-2 block font-semibold">Mô tả năng lực vận hành</span><textarea rows={5} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" defaultValue="Kho gom hàng tại Quảng Châu, nhận hàng từ chợ đầu mối, kiểm số lượng, đóng kiện, chụp ảnh tình trạng hàng và kết nối tuyến vận chuyển về Việt Nam." /></label><div className="mt-5 grid gap-3 md:grid-cols-3">{["Giấy phép kinh doanh", "Ảnh kho/văn phòng", "Quy trình bồi hoàn"].map((item) => <button type="button" key={item} onClick={() => { setUploaded((current) => current.includes(item) ? current : [...current, item]); show(`Đã thêm ${item}`); }} className={cn("rounded-2xl border border-dashed p-5 text-left text-sm font-semibold", uploaded.includes(item) ? "border-[#087443] bg-[#e7f7ed] text-[#087443]" : "border-[#9fc3ce] bg-[#f7fbfc] text-[#35464b]")}>{uploaded.includes(item) ? "Đã tải lên " : "Tải lên "}{item}</button>)}</div><button className="mt-5 rounded-xl bg-[#006578] px-5 py-3 font-bold text-white">Lưu và gửi xét duyệt</button></form><aside className="space-y-4"><div className="rounded-3xl bg-[#e7f4f8] p-6"><h2 className="text-xl font-bold">Mức độ hoàn thiện</h2><div className="mt-4 h-3 overflow-hidden rounded-full bg-white"><div className="h-full bg-[#006578]" style={{ width: `${Math.min(completion, 100)}%` }} /></div><div className="mt-2 text-sm font-bold text-[#006578]">{Math.min(completion, 100)}% hồ sơ đã hoàn thiện</div></div><div className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Trạng thái xác minh</h2><div className="mt-4 space-y-3">{profileChecks.map(([title, status, desc]) => <div key={title} className="rounded-2xl border border-[#d6e5ea] p-4"><div className="flex items-center justify-between gap-3"><b>{title}</b><StatusPill tone={status === "Cần bổ sung" ? "amber" : "blue"}>{uploaded.includes("Ảnh kho/văn phòng") && title === "Địa chỉ kho" ? "Đang xét duyệt" : status}</StatusPill></div><p className="mt-2 text-sm leading-6 text-[#5b5f61]">{desc}</p></div>)}</div></div></aside></div></PartnerShell>;
}

export function PartnerMessagesPage() {
  const { show, toast } = useToast();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ author: "customer", text: "Bên em cần gom khoảng 5 kiện hàng từ Bạch Mã và Sha He về Hà Nội.", time: "10:28" }, { author: "partner", text: "Bên mình nhận được. Anh/chị gửi danh sách mã vận đơn, em báo giá gom hàng và thời gian về kho.", time: "10:31" }, { author: "customer", text: "Nếu hàng về đủ trước thứ Sáu thì có kịp xuất kho cuối tuần không?", time: "10:36" }, { author: "partner", text: "Kịp ạ. Điều kiện là hàng đến kho trước 16:00 thứ Sáu và không phát sinh kiểm đếm chi tiết từng mẫu.", time: "10:40" }]);
  const conversations = [{ name: "Shop thời trang Linh Chi", sub: "Lead kho gom hàng Quảng Châu", unread: "2", time: "10:42" }, { name: "Mỹ phẩm Hương Việt", sub: "Chờ xác nhận phụ phí đóng gói", unread: "", time: "09:15" }, { name: "Hỗ trợ C-TourGuide", sub: "Nhắc bổ sung ảnh kho", unread: "1", time: "Hôm qua" }];
  function sendMessage() {
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [...current, { author: "partner", text: value, time: nowLabel() }]);
    setText("");
    show("Đã gửi tin nhắn");
  }
  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const total = ["Phí gom hàng", "Đóng kiện", "Vận chuyển dự kiến"].map((key) => String(data.get(key) || "")).join(" + ");
    setMessages((current) => [...current, { author: "partner", text: `Báo giá đề xuất: ${total}. Thời gian xử lý ${String(data.get("Thời gian") || "5-7 ngày")}.`, time: nowLabel() }]);
    show("Đã gửi báo giá vào hội thoại");
  }
  const messageList = useMemo(() => messages, [messages]);
  return <PartnerShell title="Tin nhắn và báo giá" description="Trao đổi với khách hàng tiềm năng, gửi báo giá nhanh, xác nhận dịch vụ và lưu lại lịch sử tư vấn.">{toast}<div className="grid gap-6 xl:grid-cols-[330px_1fr_330px]"><aside className="rounded-3xl bg-white p-5 shadow-sm">{conversations.map((item, index) => <button key={item.name} onClick={() => show(`Đã mở hội thoại ${item.name}`)} className={cn("mb-3 w-full rounded-2xl p-4 text-left", index === 0 ? "bg-[#e7f4f8]" : "bg-[#f3f8fa]")}><div className="flex justify-between gap-3"><b>{item.name}</b><span className="text-xs text-[#5b5f61]">{item.time}</span></div><p className="mt-1 truncate text-sm text-[#5b5f61]">{item.sub}</p>{item.unread && <span className="mt-3 inline-block rounded-full bg-[#b7131a] px-2 py-0.5 text-xs font-bold text-white">{item.unread} mới</span>}</button>)}</aside><section className="flex h-[680px] min-h-0 flex-col overflow-hidden rounded-3xl bg-white shadow-sm"><div className="border-b border-[#d6e5ea] p-5"><h2 className="font-bold">Shop thời trang Linh Chi</h2><p className="mt-1 text-sm text-[#5b5f61]">Lead kho gom hàng Quảng Châu · LEAD-9021</p></div><div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">{messageList.map((message, index) => <div key={`${message.time}-${index}`} className={cn("max-w-[78%] rounded-2xl px-4 py-3", message.author === "partner" ? "ml-auto bg-[#006578] text-white" : message.author === "system" ? "mx-auto bg-[#fff4d8] text-[#8a5a00]" : "bg-[#f2f2f4]")}><p>{message.text}</p><span className="mt-2 block text-xs opacity-70">{message.time}</span></div>)}</div><div className="border-t border-[#d6e5ea] p-4"><div className="flex gap-2"><input value={text} onChange={(event) => setText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} className="flex-1 rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" placeholder="Nhập tin nhắn hoặc điều kiện báo giá..." /><button onClick={sendMessage} className="rounded-xl bg-[#006578] px-5 font-bold text-white">Gửi</button></div></div></section><aside className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Báo giá nhanh</h2><form onSubmit={sendQuote} className="mt-4 grid gap-3">{[["Phí gom hàng", "2.300.000đ"], ["Đóng kiện", "900.000đ"], ["Vận chuyển dự kiến", "1.600.000đ"], ["Thời gian", "5-7 ngày"]].map(([label, value]) => <label key={label}><span className="mb-1 block text-sm font-semibold">{label}</span><input name={label} defaultValue={value} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" /></label>)}<label><span className="mb-1 block text-sm font-semibold">Điều kiện</span><textarea name="Điều kiện" rows={4} className="w-full rounded-xl border border-[#d8e6eb] px-4 py-3 outline-none focus:border-[#006578]" defaultValue="Báo giá áp dụng khi hàng về kho trước 16:00 thứ Sáu, chưa gồm phụ phí hàng dễ vỡ hoặc kiểm đếm chi tiết." /></label><button className="rounded-xl bg-[#006578] px-5 py-3 font-bold text-white">Gửi báo giá</button><button type="button" onClick={() => { setMessages((current) => [...current, { author: "system", text: "Đã tạo đơn tạm ORD-NEW từ hội thoại này. Vui lòng kiểm tra ở trang Đơn hàng.", time: nowLabel() }]); show("Đã tạo đơn tạm từ hội thoại"); }} className="rounded-xl border border-[#d6e5ea] px-5 py-3 font-bold text-[#35464b]">Tạo đơn từ hội thoại</button></form></aside></div></PartnerShell>;
}

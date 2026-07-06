import { FormEvent, useMemo, useState } from "react";
import { Link, NavLink } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";

type GuideBooking = { id: string; customer: string; service: string; date: string; duration: string; status: string; amount: string; meeting: string; note: string; internalNote?: string };
type Conversation = { name: string; service: string; messages: { from: "guide" | "guest"; text: string }[] };

const guideServices = [
  { name: "Đánh hàng Quảng Châu", price: "3.000.000đ/ngày", status: "Đang bán", conversion: "18%" },
  { name: "Phiên dịch công tác", price: "420.000đ/giờ", status: "Đang bán", conversion: "22%" },
  { name: "Kiểm hàng Nghĩa Ô", price: "3.500.000đ/ngày", status: "Tạm ẩn", conversion: "9%" },
];

const portfolioItems = ["Bạch Mã", "Sha He", "Chợ linh kiện Thâm Quyến", "Kho gom Nghĩa Ô"];

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const initialBookings: GuideBooking[] = [
  { id: "CTG-482910", customer: "Lê Anh Tuấn", service: "Đánh hàng Quảng Châu", date: "20/08/2026", duration: "Cả ngày", status: "Chờ xác nhận", amount: "3.000.000đ", meeting: "Ga Guangzhou Railway Station", note: "Ưu tiên Bạch Mã trước, cần hỗ trợ mặc cả." },
  { id: "CTG-482744", customer: "Nguyễn Hương", service: "City tour Thượng Hải", date: "22/08/2026", duration: "Nửa ngày", status: "Đã xác nhận", amount: "1.680.000đ", meeting: "People's Square Exit 7", note: "Gia đình 3 người, cần lịch nhẹ nhàng." },
  { id: "CTG-481902", customer: "Trần Minh Khoa", service: "Phiên dịch công tác", date: "25/08/2026", duration: "Theo giờ", status: "Đã giữ chỗ", amount: "1.260.000đ", meeting: "Sảnh khách sạn Westin", note: "Gặp nhà cung cấp linh kiện, cần thuật ngữ kỹ thuật." },
  { id: "CTG-480118", customer: "VietHome Sourcing", service: "Kiểm hàng Nghĩa Ô", date: "27/08/2026", duration: "Cả ngày", status: "Hoàn thành", amount: "3.000.000đ", meeting: "Yiwu International Trade City", note: "Đã gửi biên bản kiểm mẫu." },
];

const initialCalendar = [
  { day: "Thứ 2", status: "Rảnh", note: "09:00 - 18:00" },
  { day: "Thứ 3", status: "Đã có lịch", note: "Khách đi chợ Bạch Mã" },
  { day: "Thứ 4", status: "Rảnh", note: "13:00 - 20:00" },
  { day: "Thứ 5", status: "Tạm nghỉ", note: "Không nhận khách" },
  { day: "Thứ 6", status: "Đã có lịch", note: "Phiên dịch công tác" },
  { day: "Thứ 7", status: "Rảnh", note: "Cả ngày" },
  { day: "Chủ nhật", status: "Rảnh", note: "Cả ngày" },
];

const guideMenu = [
  ["/guide/dashboard", "Tổng quan"],
  ["/guide/bookings", "Booking"],
  ["/guide/calendar", "Lịch làm việc"],
  ["/guide/profile", "Hồ sơ guide"],
  ["/guide/verification", "Xác minh"],
  ["/guide/earnings", "Thu nhập"],
  ["/guide/messages", "Tin nhắn"],
  ["/guide/premium", "Premium"],
];

function tone(value: string) {
  if (["Chờ", "Tạm nghỉ", "Đã giữ chỗ", "Thiếu", "Chưa"].some((item) => value.includes(item))) return "amber";
  if (["Từ chối", "Hủy", "Rủi ro"].some((item) => value.includes(item))) return "red";
  if (["Đã", "Rảnh", "Hoàn thành", "Duyệt", "Bật"].some((item) => value.includes(item))) return "green";
  return "neutral";
}

function Pill({ children }: { children: string }) {
  const tones = {
    amber: "bg-[#fff7df] text-[#9a6100] ring-[#ffe2a3]",
    red: "bg-[#fff1ef] text-[#b7131a] ring-[#ffd6d2]",
    green: "bg-[#e7f7ed] text-[#087443] ring-[#bee7cc]",
    neutral: "bg-[#f2f2f4] text-[#5b5f61] ring-[#e2e2e5]",
  };
  return <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ${tones[tone(children)]}`}>{children}</span>;
}

function GuideShell({ title, description, action, children }: { title: string; description: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9f9fc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <aside className="hidden w-[260px] border-r border-[#e4beb9] bg-white p-4 md:flex md:flex-col">
        <Link to="/guide/dashboard" className="text-xl font-bold text-[#b7131a]">C-TourGuide</Link>
        <div className="mt-1 text-xs text-[#5b5f61]">Khu vực Local Guide</div>
        <nav className="mt-8 flex flex-col gap-2">
          {guideMenu.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[#fff1ef] text-[#b7131a]" : "text-[#5b403d] hover:bg-[#fff8f7] hover:text-[#b7131a]"}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#1a1c1e] p-4 text-white">
          <div className="text-sm font-bold">Hồ sơ đang nổi bật</div>
          <p className="mt-2 text-xs text-white/70">Phản hồi trong 12 phút, tỷ lệ nhận lịch 86%, 4.9 sao.</p>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="border-b border-[#e2e2e5] bg-white px-4 py-3 md:hidden">
          <div className="font-bold text-[#b7131a]">C-TourGuide Guide</div>
          <div className="mt-3 flex gap-2 overflow-x-auto">{guideMenu.map(([to, label]) => <Link key={to} to={to} className="shrink-0 rounded-full bg-[#f8f3f2] px-3 py-2 text-xs font-bold text-[#5b403d]">{label}</Link>)}</div>
        </div>
        <div className="flex-1 p-5 md:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b7131a]">Local Guide workspace</p>
              <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-[#5b5f61]">{description}</p>
            </div>
            {action ?? <Link to="/guide/profile" className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Cập nhật hồ sơ</Link>}
          </div>
          {children}
        </div>
        <DashboardFooter title="C-TourGuide Guide" description="Quản lý lịch nhận khách, booking, xác minh, tin nhắn và thu nhập." homePath="/guide/dashboard" homeLabel="Về tổng quan guide" />
      </main>
    </div>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#ece2e0]"><div className="text-sm font-semibold text-[#5b5f61]">{label}</div><div className="mt-3 text-3xl font-bold tracking-[-0.04em]">{value}</div><div className="mt-2 text-sm text-[#5b5f61]">{sub}</div></div>;
}

function BookingDetail({ booking, onClose, onStatus, onSave }: { booking: GuideBooking; onClose: () => void; onStatus: (status: string) => void; onSave: (changes: Partial<GuideBooking>) => void }) {
  const [meeting, setMeeting] = useState(booking.meeting);
  const [internalNote, setInternalNote] = useState(booking.internalNote ?? "");
  return (
    <div className="fixed inset-0 z-[80] bg-black/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="ml-auto flex h-full max-w-xl flex-col rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="border-b border-[#f1e7e5] p-6"><div className="text-sm font-bold uppercase tracking-[0.2em] text-[#b7131a]">Chi tiết booking</div><h2 className="mt-2 text-3xl font-bold">{booking.id}</h2></div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {[['Khách', booking.customer], ['Dịch vụ', booking.service], ['Ngày', booking.date], ['Thời lượng', booking.duration], ['Số tiền', booking.amount], ['Ghi chú khách', booking.note]].map(([label, value]) => <div key={label} className="mb-3 rounded-2xl bg-[#f8f3f2] p-4"><div className="text-xs font-bold uppercase text-[#8a6d68]">{label}</div><div className="mt-1 font-semibold">{value}</div></div>)}
          <label className="mt-4 block"><span className="font-bold text-[#5b403d]">Điểm hẹn</span><input value={meeting} onChange={(event) => setMeeting(event.target.value)} className="mt-2 w-full rounded-2xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" /></label>
          <label className="mt-4 block"><span className="font-bold text-[#5b403d]">Ghi chú nội bộ</span><textarea value={internalNote} onChange={(event) => setInternalNote(event.target.value)} rows={4} className="mt-2 w-full rounded-2xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder="Ví dụ: khách cần hóa đơn, ưu tiên đi cổng B..." /></label>
        </div>
        <div className="flex flex-wrap justify-end gap-3 border-t border-[#f1e7e5] p-5">
          <button onClick={() => onSave({ meeting, internalNote })} className="rounded-xl bg-[#e7f7ed] px-5 py-3 font-bold text-[#087443]">Lưu ghi chú</button>
          <button onClick={() => onStatus("Hoàn thành")} className="rounded-xl bg-[#1a1c1e] px-5 py-3 font-bold text-white">Hoàn thành</button>
          <button onClick={() => onStatus("Từ chối")} className="rounded-xl bg-[#f2f2f4] px-5 py-3 font-bold text-[#5b5f61]">Từ chối</button>
          <button onClick={() => onStatus("Đã xác nhận")} className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xác nhận lịch</button>
        </div>
      </div>
    </div>
  );
}

export function GuideOverviewPage() {
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const tasks = ["Xác nhận booking CTG-482910 trước 15 phút nữa", "Cập nhật thêm 3 ảnh chợ Bạch Mã", "Bật thêm khung giờ rảnh cuối tuần", "Trả lời 2 tin nhắn khách đang chờ"];
  const toggleTask = (task: string) => setDoneTasks((items) => items.includes(task) ? items.filter((item) => item !== task) : [...items, task]);
  return (
    <GuideShell title="Tổng quan guide" description="Theo dõi hiệu suất làm việc, yêu cầu đặt lịch, lịch sắp tới, chất lượng phản hồi và trạng thái hồ sơ." action={<Link to="/guide/premium" className="w-fit rounded-xl bg-[#1a1c1e] px-5 py-3 font-bold text-white">Nâng cấp Premium</Link>}>
      <div className="grid gap-4 md:grid-cols-4"><Metric label="Booking tháng này" value="18" sub="+12% so với tháng trước" /><Metric label="Thu nhập dự kiến" value="45.2M" sub="VND trước đối soát" /><Metric label="Đánh giá" value="4.9" sub="156 nhận xét" /><Metric label="Tỷ lệ phản hồi" value="94%" sub="Trung bình 12 phút" /></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Yêu cầu đặt lịch mới</h2><Link to="/guide/bookings" className="font-bold text-[#b7131a]">Xem tất cả</Link></div><div className="mt-4 space-y-3">{initialBookings.slice(0, 3).map((booking) => <Link to="/guide/bookings" key={booking.id} className="block rounded-2xl border border-[#ece2e0] p-4 hover:border-[#b7131a] hover:bg-[#fff8f7]"><div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div><div className="font-bold">{booking.customer}</div><div className="mt-1 text-sm text-[#5b5f61]">{booking.service} · {booking.date}</div></div><Pill>{booking.status}</Pill></div></Link>)}</div></section>
        <aside className="rounded-3xl bg-[#fff1ef] p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Việc nên làm hôm nay</h2><Pill>{`${doneTasks.length}/${tasks.length}`}</Pill></div><div className="mt-4 space-y-3 text-sm text-[#5b403d]">{tasks.map((item) => <button key={item} onClick={() => toggleTask(item)} className={`w-full rounded-xl bg-white p-4 text-left font-semibold ${doneTasks.includes(item) ? "text-[#087443] line-through" : "hover:text-[#b7131a]"}`}>{item}</button>)}</div></aside>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {[["Tỷ lệ chuyển đổi hồ sơ", "18%", "Khách xem hồ sơ rồi đặt lịch"], ["Tỷ lệ đúng giờ", "97%", "Dựa trên check-in điểm hẹn"], ["Điểm an toàn", "A", "Không có cảnh báo 30 ngày"]].map(([label, value, sub]) => <Metric key={label} label={label} value={value} sub={sub} />)}
      </div>
    </GuideShell>
  );
}

export function GuideBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<GuideBooking | null>(null);
  const filtered = useMemo(() => bookings.filter((booking) => (filter === "Tất cả" || booking.status.includes(filter)) && `${booking.id} ${booking.customer} ${booking.service}`.toLowerCase().includes(query.toLowerCase())), [bookings, filter, query]);
  const updateStatus = (id: string, status: string) => { setBookings((items) => items.map((item) => item.id === id ? { ...item, status } : item)); setSelected(null); };
  const updateBooking = (id: string, changes: Partial<GuideBooking>) => { setBookings((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item)); setSelected(null); };
  return (
    <GuideShell title="Quản lý booking" description="Xem yêu cầu mới, xác nhận hoặc từ chối lịch, kiểm tra ghi chú khách và theo dõi trạng thái giữ chỗ." action={<button onClick={() => downloadCsv("guide-bookings.csv", [["Mã", "Khách", "Dịch vụ", "Ngày", "Trạng thái", "Số tiền"], ...filtered.map((booking) => [booking.id, booking.customer, booking.service, booking.date, booking.status, booking.amount])])} className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xuất booking CSV</button>}>
      <div className="mb-5 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#ece2e0] lg:flex-row lg:items-center"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm booking, khách, dịch vụ..." className="min-w-0 flex-1 rounded-2xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" />{["Tất cả", "Chờ", "Đã xác nhận", "Đã giữ chỗ", "Hoàn thành", "Từ chối"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${filter === item ? "bg-[#b7131a] text-white" : "bg-[#f8f3f2] text-[#5b403d]"}`}>{item}</button>)}</div>
      <div className="overflow-hidden rounded-3xl border border-[#ece2e0] bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-[#f8f3f2] text-xs uppercase tracking-wide text-[#5b5f61]"><tr>{["Mã", "Khách", "Dịch vụ", "Ngày", "Thời lượng", "Trạng thái", "Số tiền", "Thao tác"].map((head) => <th key={head} className="px-5 py-4">{head}</th>)}</tr></thead><tbody>{filtered.map((booking) => <tr key={booking.id} className="border-t border-[#f1e7e5]"><td className="px-5 py-4 font-bold text-[#b7131a]">{booking.id}</td><td className="px-5 py-4">{booking.customer}</td><td className="px-5 py-4">{booking.service}</td><td className="px-5 py-4">{booking.date}</td><td className="px-5 py-4">{booking.duration}</td><td className="px-5 py-4"><Pill>{booking.status}</Pill></td><td className="px-5 py-4 font-bold">{booking.amount}</td><td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => setSelected(booking)} className="rounded-lg bg-[#fff1ef] px-3 py-2 text-xs font-bold text-[#b7131a]">Chi tiết</button><button onClick={() => updateStatus(booking.id, "Đã xác nhận")} className="rounded-lg bg-[#e7f7ed] px-3 py-2 text-xs font-bold text-[#087443]">Nhận</button></div></td></tr>)}</tbody></table></div></div>
      {filtered.length === 0 && <div className="mt-4 rounded-2xl bg-white p-5 text-center font-semibold text-[#5b5f61]">Không có booking phù hợp.</div>}
      {selected && <BookingDetail booking={selected} onClose={() => setSelected(null)} onStatus={(status) => updateStatus(selected.id, status)} onSave={(changes) => updateBooking(selected.id, changes)} />}
    </GuideShell>
  );
}

export function GuideCalendarPage() {
  const [days, setDays] = useState(initialCalendar);
  const [busyTitle, setBusyTitle] = useState("Đi khảo sát chợ mới");
  const updateDay = (day: string, status: string) => setDays((items) => items.map((item) => item.day === day ? { ...item, status, note: status === "Rảnh" ? "Cả ngày" : status === "Tạm nghỉ" ? "Không nhận khách" : item.note } : item));
  const addBusyBlock = (event: FormEvent) => { event.preventDefault(); setDays((items) => items.map((item) => item.day === "Thứ 4" ? { ...item, status: "Đã có lịch", note: busyTitle } : item)); };
  return (
    <GuideShell title="Lịch làm việc" description="Bật/tắt khung giờ nhận khách, quản lý ngày nghỉ, mở lịch cuối tuần và tránh trùng booking.">
      <div className="grid gap-4 md:grid-cols-7">{days.map((item) => <div key={item.day} className="rounded-2xl border border-[#ece2e0] bg-white p-5 shadow-sm"><div className="font-bold">{item.day}</div><div className="mt-4"><Pill>{item.status}</Pill></div><p className="mt-4 text-sm leading-6 text-[#5b403d]">{item.note}</p><div className="mt-4 grid gap-2"><button onClick={() => updateDay(item.day, "Rảnh")} className="rounded-lg bg-[#e7f7ed] px-3 py-2 text-xs font-bold text-[#087443]">Mở lịch</button><button onClick={() => updateDay(item.day, "Tạm nghỉ")} className="rounded-lg bg-[#f2f2f4] px-3 py-2 text-xs font-bold text-[#5b5f61]">Tạm nghỉ</button></div></div>)}</div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]"><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><h2 className="text-xl font-bold">Cài đặt nhận khách mặc định</h2><div className="mt-4 grid gap-4 md:grid-cols-3"><label><span className="mb-2 block font-semibold">Giờ bắt đầu</span><input type="time" defaultValue="09:00" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label><label><span className="mb-2 block font-semibold">Giờ kết thúc</span><input type="time" defaultValue="18:00" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label><label><span className="mb-2 block font-semibold">Trạng thái</span><select className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3"><option>Đang nhận khách</option><option>Tạm dừng nhận khách</option></select></label></div></div><form onSubmit={addBusyBlock} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><h2 className="text-xl font-bold">Thêm lịch bận nhanh</h2><label className="mt-4 block"><span className="mb-2 block font-semibold">Nội dung</span><input value={busyTitle} onChange={(event) => setBusyTitle(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label><button className="mt-4 rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Chặn lịch Thứ 4</button></form></div>
    </GuideShell>
  );
}

export function GuideProfileManagePage() {
  const [saved, setSaved] = useState(false);
  const [services, setServices] = useState(guideServices);
  const [portfolio, setPortfolio] = useState(portfolioItems);
  const [newPortfolio, setNewPortfolio] = useState("Chợ vải Zhongda");
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSaved(true); };
  const toggleService = (name: string) => setServices((items) => items.map((item) => item.name === name ? { ...item, status: item.status === "Đang bán" ? "Tạm ẩn" : "Đang bán" } : item));
  const addPortfolio = () => { if (!newPortfolio.trim()) return; setPortfolio((items) => [...items, newPortfolio.trim()]); setNewPortfolio(""); };
  return (
    <GuideShell title="Hồ sơ guide" description="Cập nhật thông tin hiển thị, giá dịch vụ, chuyên môn, ảnh nổi bật và mô tả năng lực để tăng chuyển đổi.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><div className="grid gap-4 md:grid-cols-2">{[["Tên hiển thị", "Phạm Khánh Linh"], ["Thành phố hoạt động", "Quảng Châu"], ["Ngôn ngữ", "Việt, Trung, Anh cơ bản"], ["Chuyên môn chính", "Đánh hàng, mặc cả, kiểm mẫu"], ["Giá theo giờ", "420.000đ"], ["Giá cả ngày", "3.000.000đ"]].map(([field, value]) => <label key={field}><span className="mb-2 block font-semibold">{field}</span><input defaultValue={value} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>)}</div><label className="mt-4 block"><span className="mb-2 block font-semibold">Giới thiệu</span><textarea rows={6} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" defaultValue="Chuyên hỗ trợ khách Việt đi chợ đầu mối Quảng Châu, phiên dịch hỏi giá, kiểm mẫu và kết nối kho vận." /></label><button className="mt-5 rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Lưu thay đổi</button>{saved && <span className="ml-4 font-bold text-[#087443]">Đã lưu hồ sơ</span>}</form><aside className="rounded-3xl bg-[#fff1ef] p-6"><h2 className="text-xl font-bold">Điểm hoàn thiện hồ sơ</h2><div className="mt-4 h-3 rounded-full bg-white"><div className="h-3 w-[86%] rounded-full bg-[#b7131a]" /></div><div className="mt-2 font-bold text-[#b7131a]">86%</div><div className="mt-4 space-y-3 text-sm leading-6 text-[#5b403d]"><p>Thêm video giới thiệu 60 giây để tăng độ tin cậy.</p><p>Cập nhật ảnh thật tại chợ/khu thương mại bạn thường dẫn khách.</p><p>Phản hồi khách trong 15 phút giúp hồ sơ được ưu tiên hiển thị hơn.</p></div></aside></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><h2 className="text-xl font-bold">Dịch vụ đang bán</h2><div className="mt-4 space-y-3">{services.map((service) => <div key={service.name} className="rounded-2xl border border-[#ece2e0] p-4"><div className="flex items-center justify-between gap-3"><div><b>{service.name}</b><p className="mt-1 text-sm text-[#5b5f61]">{service.price} · chuyển đổi {service.conversion}</p></div><button onClick={() => toggleService(service.name)} className="rounded-xl bg-[#fff1ef] px-4 py-2 text-sm font-bold text-[#b7131a]">{service.status}</button></div></div>)}</div></section><section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]"><h2 className="text-xl font-bold">Portfolio khu vực quen thuộc</h2><div className="mt-4 flex flex-wrap gap-2">{portfolio.map((item) => <span key={item} className="rounded-full bg-[#f8f3f2] px-3 py-2 text-sm font-bold text-[#5b403d]">{item}</span>)}</div><div className="mt-4 flex gap-2"><input value={newPortfolio} onChange={(event) => setNewPortfolio(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-[#e2e2e5] px-4 py-3" /><button onClick={addPortfolio} className="rounded-xl bg-[#b7131a] px-4 py-3 font-bold text-white">Thêm</button></div></section></div>
    </GuideShell>
  );
}

export function GuideVerificationPage() {
  const [done, setDone] = useState<string[]>(["Xác minh giấy tờ", "Kiểm tra kỹ năng"]);
  const steps = [["Xác minh giấy tờ", "CCCD/Hộ chiếu đã gửi, đang đối chiếu thông tin."], ["Xác minh nơi sinh sống", "Cần cập nhật địa chỉ hoặc giấy tờ cư trú tại Trung Quốc."], ["Kiểm tra kỹ năng", "Hoàn tất bài kiểm tra tình huống dịch Việt - Trung."], ["Duyệt hồ sơ", "Hồ sơ sẽ được hiển thị sau khi hoàn tất các bước trên."]];
  const toggle = (title: string) => setDone((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);
  return <GuideShell title="Xác minh guide" description="Quản lý quy trình xác minh danh tính, khu vực sinh sống, năng lực hỗ trợ khách và điều kiện bật nhận booking."><div className="grid gap-4 md:grid-cols-2">{steps.map(([title, desc], index) => <button key={title} onClick={() => toggle(title)} className="rounded-2xl border border-[#ece2e0] bg-white p-5 text-left shadow-sm hover:border-[#b7131a]"><div className="flex items-center gap-3"><div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${done.includes(title) ? "bg-[#087443]" : "bg-[#b7131a]"}`}>{index + 1}</div><h2 className="font-bold">{title}</h2></div><p className="mt-4 text-sm leading-6 text-[#5b5f61]">{desc}</p><div className="mt-4"><Pill>{done.includes(title) ? "Đã hoàn tất" : "Chưa hoàn tất"}</Pill></div></button>)}</div><div className="mt-6 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Tài liệu cần bổ sung</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{["Ảnh hộ chiếu/CCCD", "Ảnh thẻ sinh viên hoặc giấy cư trú", "Video giới thiệu 60 giây"].map((item) => <label key={item} className="rounded-xl border border-dashed border-[#d8c2bf] p-5 text-sm font-semibold text-[#5b403d]"><input type="file" className="mb-3 block w-full text-xs" />{item}</label>)}</div></div></GuideShell>;
}

export function GuideEarningsPage() {
  const [requested, setRequested] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("12.800.000");
  const rows = [["CTG-482744", "City tour Thượng Hải", "1.680.000đ", "Đã thanh toán"], ["CTG-481902", "Phiên dịch công tác", "1.260.000đ", "Chờ đối soát"], ["CTG-480118", "Đánh hàng Quảng Châu", "3.000.000đ", "Đã thanh toán"]];
  const submitWithdraw = (event: FormEvent) => { event.preventDefault(); setRequested(true); setWithdrawOpen(false); };
  return <GuideShell title="Thu nhập" description="Theo dõi doanh thu, trạng thái đối soát, phí nền tảng và yêu cầu rút tiền của guide." action={<div className="flex gap-3"><button onClick={() => downloadCsv("guide-earnings.csv", [["Mã", "Dịch vụ", "Số tiền", "Trạng thái"], ...rows])} className="w-fit rounded-xl bg-[#1a1c1e] px-5 py-3 font-bold text-white">Xuất CSV</button><button onClick={() => setWithdrawOpen(true)} className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Yêu cầu rút tiền</button></div>}><div className="grid gap-4 md:grid-cols-4"><Metric label="Số dư khả dụng" value="12.8M" sub="Có thể rút" /><Metric label="Chờ đối soát" value="4.2M" sub="2 booking" /><Metric label="Đã rút tháng này" value="18.5M" sub="3 lần rút" /><Metric label="Phí nền tảng" value="12%" sub="Theo gói hiện tại" /></div>{requested && <div className="mt-4 rounded-2xl bg-[#e7f7ed] p-4 font-bold text-[#087443]">Đã gửi yêu cầu rút tiền {withdrawAmount}đ. Bộ phận đối soát sẽ xử lý trong ngày làm việc.</div>}<div className="mt-6 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Giao dịch gần đây</h2><div className="mt-4 space-y-3">{rows.map(([id, service, amount, status]) => <div key={id} className="grid gap-3 rounded-2xl border border-[#ece2e0] p-4 md:grid-cols-4"><b>{id}</b><span>{service}</span><b>{amount}</b><Pill>{status}</Pill></div>)}</div></div>{withdrawOpen && <div className="fixed inset-0 z-[80] bg-black/40 p-4 backdrop-blur-sm" onClick={() => setWithdrawOpen(false)}><form onSubmit={submitWithdraw} className="ml-auto max-w-lg rounded-3xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><h2 className="text-2xl font-bold">Yêu cầu rút tiền</h2><label className="mt-4 block"><span className="font-bold">Số tiền</span><input value={withdrawAmount} onChange={(event) => setWithdrawAmount(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label><label className="mt-4 block"><span className="font-bold">Tài khoản nhận</span><select className="mt-2 w-full rounded-xl border border-[#e2e2e5] px-4 py-3"><option>Vietcombank · **** 4821</option><option>Ví C-TourGuide Balance</option></select></label><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setWithdrawOpen(false)} className="rounded-xl bg-[#f2f2f4] px-5 py-3 font-bold text-[#5b5f61]">Hủy</button><button className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Gửi yêu cầu</button></div></form></div>}</GuideShell>;
}

export function GuideMessagesPage() {
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState("");
  const [resolved, setResolved] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([
    { name: "Lê Anh Tuấn", service: "Đánh hàng Quảng Châu", messages: [{ from: "guest", text: "Anh muốn đi Bạch Mã trước hay Sha He trước ạ?" }, { from: "guide", text: "Mình muốn đi Bạch Mã trước, khoảng 8h30 có mặt được không?" }, { from: "guest", text: "Được ạ. Em sẽ gửi vị trí hẹn ở cổng B ga Guangzhou Railway Station." }] },
    { name: "Nguyễn Hương", service: "City tour Thượng Hải", messages: [{ from: "guest", text: "Gia đình mình có trẻ nhỏ, lịch có thể nhẹ nhàng hơn không?" }] },
    { name: "Trần Minh Khoa", service: "Phiên dịch công tác", messages: [{ from: "guest", text: "Mình cần chuẩn bị thuật ngữ linh kiện trước buổi gặp." }] },
  ]);
  const send = (event: FormEvent) => { event.preventDefault(); if (!draft.trim()) return; setConversations((items) => items.map((item, index) => index === active ? { ...item, messages: [...item.messages, { from: "guide", text: draft.trim() }] } : item)); setDraft(""); };
  const sendQuick = (text: string) => setConversations((items) => items.map((item, index) => index === active ? { ...item, messages: [...item.messages, { from: "guide", text }] } : item));
  const toggleResolved = () => setResolved((items) => items.includes(current.name) ? items.filter((item) => item !== current.name) : [...items, current.name]);
  const current = conversations[active];
  return <GuideShell title="Tin nhắn khách hàng" description="Trao đổi với khách trước chuyến đi, gửi vị trí hẹn, xác nhận yêu cầu đặc biệt và giữ lịch sử hội thoại trong thẻ."><div className="grid gap-6 lg:grid-cols-[320px_1fr]"><aside className="rounded-3xl bg-white p-5 shadow-sm">{conversations.map((conversation, index) => <button key={conversation.name} onClick={() => setActive(index)} className={`mb-3 w-full rounded-2xl p-4 text-left ${index === active ? "bg-[#fff1ef]" : "bg-[#f8f3f2]"}`}><div className="flex items-center justify-between gap-2"><b>{conversation.name}</b>{resolved.includes(conversation.name) && <Pill>Đã xử lý</Pill>}</div><p className="mt-1 text-sm text-[#5b5f61]">{conversation.service}</p></button>)}</aside><section className="flex h-[620px] flex-col overflow-hidden rounded-3xl bg-white shadow-sm"><div className="border-b border-[#ece2e0] p-5"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><h2 className="font-bold">{current.name} · {current.service}</h2><p className="mt-1 text-sm text-[#5b5f61]">Tự động dịch Việt - Trung đang bật</p></div><button onClick={toggleResolved} className="w-fit rounded-xl bg-[#f2f2f4] px-4 py-2 text-sm font-bold text-[#5b5f61]">{resolved.includes(current.name) ? "Mở lại" : "Đánh dấu xử lý"}</button></div><div className="mt-4 flex flex-wrap gap-2">{["Em xác nhận lịch này ạ.", "Em gửi vị trí hẹn: Ga Guangzhou Railway Station, cổng B.", "Anh/chị cho em số lượng người đi cùng nhé."].map((text) => <button key={text} onClick={() => sendQuick(text)} className="rounded-full bg-[#fff1ef] px-3 py-2 text-xs font-bold text-[#b7131a]">{text}</button>)}</div></div><div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">{current.messages.map((message, index) => <div key={index} className={`${message.from === "guide" ? "ml-auto bg-[#b7131a] text-white" : "bg-[#f2f2f4]"} max-w-[78%] rounded-2xl px-4 py-3`}>{message.text}</div>)}</div><form onSubmit={send} className="flex gap-3 border-t border-[#ece2e0] p-4"><input value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-[#e2e2e5] px-4 py-3" placeholder="Nhập tin nhắn..." /><button className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Gửi</button></form></section></div></GuideShell>;
}

export function GuidePremiumPage() {
  const [plan, setPlan] = useState("growth");
  const [activated, setActivated] = useState(false);
  const plans = [["basic", "Basic", "0đ", "Hiển thị tiêu chuẩn, nhận booking tự nhiên."], ["growth", "Growth", "299.000đ/tháng", "Tăng hiển thị trong thành phố, badge nổi bật, ưu tiên lead phù hợp."], ["pro", "Pro", "799.000đ/tháng", "Ưu tiên top ngành hàng, thống kê nâng cao, hỗ trợ xây hồ sơ bán dịch vụ."]];
  return <GuideShell title="Gói Premium Guide" description="Tăng hiển thị hồ sơ, nhận nhiều booking phù hợp hơn và theo dõi hiệu quả chuyển đổi."><div className="grid gap-4 md:grid-cols-3">{plans.map(([id, name, price, desc]) => <button key={id} onClick={() => setPlan(id)} className={`rounded-3xl p-6 text-left shadow-sm ${plan === id ? "bg-[#b7131a] text-white" : "bg-white text-[#1a1c1e]"}`}><h2 className="text-2xl font-bold">{name}</h2><div className="mt-3 text-3xl font-black">{price}</div><p className={`mt-3 text-sm leading-6 ${plan === id ? "text-white/80" : "text-[#5b5f61]"}`}>{desc}</p></button>)}</div><div className="mt-6 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Lợi ích dự kiến</h2><div className="mt-4 grid gap-4 md:grid-cols-4">{[["+38%", "Lượt xem hồ sơ"], ["+22%", "Tỷ lệ nhận booking"], ["Top 5", "Trong tìm kiếm thành phố"], ["Báo cáo", "Hiệu quả hàng tuần"]].map(([value, label]) => <div key={label} className="rounded-2xl bg-[#f8f3f2] p-5"><div className="text-3xl font-black text-[#b7131a]">{value}</div><div className="mt-1 text-sm font-bold text-[#5b403d]">{label}</div></div>)}</div><button onClick={() => setActivated(true)} className="mt-6 rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Kích hoạt gói đã chọn</button>{activated && <div className="mt-4 rounded-2xl bg-[#e7f7ed] p-4 font-bold text-[#087443]">Đã kích hoạt gói Premium trong phiên làm việc này.</div>}</div></GuideShell>;
}

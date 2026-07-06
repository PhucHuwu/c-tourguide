import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";

const adminMenu = [
  ["/admin", "Tổng quan"],
  ["/admin/users", "Người dùng"],
  ["/admin/guides", "Duyệt guide"],
  ["/admin/bookings", "Booking"],
  ["/admin/reports", "Báo cáo"],
  ["/admin/partners", "Đối tác"],
  ["/admin/revenue", "Doanh thu"],
];

const overviewStats = [
  ["GMV tháng này", "4.82 tỷ", "+28%", "8.204 booking đã ghi nhận"],
  ["Người dùng hoạt động", "24.592", "+12%", "3.482 tài khoản mới"],
  ["Guide đạt chuẩn", "1.843", "+6%", "87 hồ sơ chờ duyệt"],
  ["SLA hỗ trợ", "94.6%", "+3.1%", "17 vụ cần xử lý"],
];

const operations = [
  ["Duyệt hồ sơ guide mới", "4 hồ sơ có đủ giấy tờ, 2 hồ sơ thiếu video giới thiệu", "Ưu tiên cao", "/admin/guides"],
  ["Booking có nguy cơ trễ xác nhận", "3 booking chưa được guide phản hồi sau 20 phút", "Cần xử lý", "/admin/bookings"],
  ["Khiếu nại hoàn tiền", "5 yêu cầu đang chờ đối soát lịch sử chat và thanh toán", "Ưu tiên cao", "/admin/reports"],
  ["Đối tác kho vận mới", "2 hồ sơ có hợp đồng, cần kiểm tra SLA giao nhận", "Trong ngày", "/admin/partners"],
];

const cityHealth = [
  ["Quảng Châu", "2.184 booking", "96%", "Tốt", "82%"],
  ["Thâm Quyến", "1.508 booking", "93%", "Ổn định", "68%"],
  ["Nghĩa Ô", "944 booking", "88%", "Cần thêm guide", "51%"],
  ["Thượng Hải", "726 booking", "91%", "Đang tăng", "59%"],
];

const users = [
  ["Nguyễn Minh Anh", "Khách cá nhân", "minhanh@example.com", "Đã xác minh", "3 booking", "Không rủi ro"],
  ["Phạm Khánh Linh", "Local Guide", "linh.guide@example.com", "Đã xác minh", "18 booking", "Theo dõi SLA"],
  ["China Logistics Hub", "Đối tác", "ops@logihub.cn", "Chờ duyệt", "5 lead", "Cần kiểm tra"],
  ["Trần Hoàng Nam", "Khách cá nhân", "nam@example.com", "Đang hoạt động", "1 booking", "Không rủi ro"],
  ["Lê Hữu Phúc", "Khách doanh nghiệp", "phuc@viettrade.vn", "Tạm khóa", "12 booking", "Thanh toán lỗi"],
];

const guides = [
  ["Phạm Khánh Linh", "Quảng Châu", "Đánh hàng, mặc cả", "Đã xác minh", "4.8", "98%", "Gia hạn badge"],
  ["Lê Quốc Minh", "Thâm Quyến", "Linh kiện điện tử", "Đã xác minh", "4.9", "96%", "Đề xuất premium"],
  ["Vũ Minh Tuấn", "Nghĩa Ô", "Đồ gia dụng", "Chờ bổ sung", "4.7", "89%", "Thiếu CCCD"],
  ["Hoàng Bảo Ngọc", "Thành Đô", "Tour gia đình", "Chờ duyệt", "4.8", "92%", "Cần phỏng vấn"],
  ["Trần Duy Khang", "Bắc Kinh", "Phiên dịch công tác", "Cảnh báo", "4.3", "74%", "2 báo cáo gần đây"],
];

const bookings = [
  ["CTG-482910", "Lê Anh Tuấn", "Phạm Khánh Linh", "Đánh hàng Quảng Châu", "Chờ guide xác nhận", "3.000.000đ", "15 phút"],
  ["CTG-482744", "Nguyễn Hương", "Trần Minh Hoàng", "City tour Bắc Kinh", "Đã giữ chỗ", "2.800.000đ", "Đúng SLA"],
  ["CTG-481902", "Trần Minh Khoa", "Lê Quốc Minh", "Phiên dịch công tác", "Hoàn thành", "1.260.000đ", "Đã đối soát"],
  ["CTG-481746", "VietHome Sourcing", "Vũ Minh Tuấn", "Kiểm hàng Nghĩa Ô", "Tranh chấp", "5.500.000đ", "Ưu tiên cao"],
];

const reports = [
  ["RP-1092", "Khách phản ánh guide đến muộn", "Booking CTG-482744", "Đang xử lý", "Cao", "Cần nghe ghi âm"],
  ["RP-1088", "Cửa hàng báo phí phát sinh", "Chợ Sha He", "Cần xác minh", "Trung bình", "Đợi hóa đơn"],
  ["RP-1081", "Yêu cầu hoàn tiền một phần", "Booking CTG-481902", "Đã phản hồi", "Cao", "Chờ khách xác nhận"],
  ["RP-1077", "Guide hủy lịch sát giờ", "Booking CTG-481746", "Escalate", "Khẩn cấp", "Cần admin gọi điện"],
];

const partners = [
  ["China Logistics Hub", "Kho vận", "Quảng Châu", "Chờ duyệt", "12 yêu cầu", "94%", "Kiểm tra hợp đồng"],
  ["Pearl Hotel Group", "Khách sạn", "Thượng Hải", "Đã duyệt", "8 yêu cầu", "91%", "Mở thêm khu vực"],
  ["Sino eSIM", "SIM/eSIM", "Toàn Trung Quốc", "Đã duyệt", "24 yêu cầu", "98%", "Đề xuất nổi bật"],
  ["Yiwu Warehouse Pro", "Kho gom hàng", "Nghĩa Ô", "Cần rà soát", "16 yêu cầu", "82%", "SLA giao chậm"],
];

const platformRevenue = [
  ["Hoa hồng booking guide", "428.500.000đ", "+18%", "Ổn định", "59.9%"],
  ["Gói Premium guide", "92.000.000đ", "+11%", "Tăng trưởng", "12.9%"],
  ["Đối tác dịch vụ", "156.800.000đ", "+24%", "Tăng trưởng", "21.9%"],
  ["Quảng cáo địa phương", "38.400.000đ", "+6%", "Theo dõi", "5.3%"],
];

type AdminRecord = {
  id: string;
  cells: string[];
  searchable: string;
  statusValues: string[];
  progressIndex?: number;
};

type SelectedRecord = {
  title: string;
  headers: string[];
  cells: string[];
  note: string;
  type: "detail" | "note";
};

function toRecords(rows: string[][], progressIndex?: number): AdminRecord[] {
  return rows.map((cells, index) => ({
    id: `${cells[0]}-${index}`,
    cells,
    searchable: cells.join(" ").toLowerCase(),
    statusValues: cells.filter((cell) => statusTone(cell) !== "neutral"),
    progressIndex,
  }));
}

function downloadCsv(filename: string, headers: string[], records: AdminRecord[]) {
  const escapeCell = (cell: string) => `"${cell.replace(/"/g, '""')}"`;
  const csv = [headers.map(escapeCell).join(","), ...records.map((record) => record.cells.map(escapeCell).join(","))].join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function statusTone(value: string) {
  if (["Khẩn cấp", "Escalate", "Cảnh báo", "Tạm khóa", "Tranh chấp", "Ưu tiên cao", "Cần xử lý"].some((item) => value.includes(item))) return "red";
  if (["Chờ", "Cần", "Theo dõi", "Trong ngày", "Bổ sung", "Rà soát"].some((item) => value.includes(item))) return "amber";
  if (["Đã", "Tốt", "Ổn định", "Hoàn thành", "Tăng trưởng", "Không rủi ro"].some((item) => value.includes(item))) return "green";
  return "neutral";
}

function StatusPill({ children }: { children: string }) {
  const tones = {
    red: "bg-[#fff1ef] text-[#b7131a] ring-[#ffd6d2]",
    amber: "bg-[#fff7df] text-[#9a6100] ring-[#ffe2a3]",
    green: "bg-[#e7f7ed] text-[#087443] ring-[#bee7cc]",
    neutral: "bg-[#f2f2f4] text-[#5b5f61] ring-[#e2e2e5]",
  };
  return <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ${tones[statusTone(children)]}`}>{children}</span>;
}

function AdminShell({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f3f3f6] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <aside className="hidden w-[260px] border-r border-[#e2e2e5] bg-white p-4 md:flex md:flex-col">
        <Link to="/admin" className="text-xl font-bold text-[#b7131a]">C-TourGuide Admin</Link>
        <div className="mt-1 text-xs text-[#5b5f61]">Trung tâm quản trị nền tảng</div>
        <nav className="mt-8 flex flex-col gap-2">
          {adminMenu.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/admin"} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? "bg-[#fff1ef] text-[#b7131a]" : "text-[#5b403d] hover:bg-[#fff8f7] hover:text-[#b7131a]"}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#1a1c1e] p-4 text-white">
          <div className="text-sm font-bold">Ca trực hôm nay</div>
          <div className="mt-2 text-xs text-white/70">8 cảnh báo vận hành, 17 ticket hỗ trợ, 4 hồ sơ cần phê duyệt.</div>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="border-b border-[#e2e2e5] bg-white px-4 py-3 md:hidden">
          <div className="font-bold text-[#b7131a]">C-TourGuide Admin</div>
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {adminMenu.map(([to, label]) => <Link key={to} to={to} className="shrink-0 rounded-full bg-[#f8f3f2] px-3 py-2 text-xs font-bold text-[#5b403d]">{label}</Link>)}
          </div>
        </div>
        <div className="flex-1 p-5 md:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b7131a]">Admin console</p>
              <h1 className="mt-2 text-4xl font-bold tracking-[-0.05em] md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-3xl text-[#5b5f61]">{description}</p>
            </div>
            {action ?? <Link to="/admin/reports" className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xem báo cáo mới</Link>}
          </div>
          {children}
        </div>
        <DashboardFooter title="C-TourGuide Admin" description="Quản trị người dùng, guide, booking, đối tác, doanh thu và chất lượng vận hành." homePath="/admin" homeLabel="Về tổng quan admin" />
      </main>
    </div>
  );
}

function MetricCard({ label, value, change, note }: { label: string; value: string; change: string; note: string }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#ece2e0]">
      <div className="text-sm font-semibold text-[#5b5f61]">{label}</div>
      <div className="mt-3 text-3xl font-bold tracking-[-0.04em]">{value}</div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs">
        <span className="rounded-full bg-[#fff1ef] px-3 py-1 font-bold text-[#b7131a]">{change}</span>
        <span className="text-right text-[#5b5f61]">{note}</span>
      </div>
    </div>
  );
}

function Toolbar({ placeholder, filters, query, activeFilter, resultCount, onQueryChange, onFilterChange, onExport }: { placeholder: string; filters: string[]; query: string; activeFilter: string; resultCount: number; onQueryChange: (value: string) => void; onFilterChange: (value: string) => void; onExport: () => void }) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#ece2e0] lg:flex-row lg:items-center lg:justify-between">
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} aria-label="Tìm kiếm" placeholder={placeholder} className="min-w-0 flex-1 rounded-2xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" />
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => <button key={filter} onClick={() => onFilterChange(filter)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${activeFilter === filter ? "bg-[#b7131a] text-white" : "bg-[#f8f3f2] text-[#5b403d] hover:bg-[#fff1ef] hover:text-[#b7131a]"}`}>{filter}</button>)}
      </div>
      <button onClick={onExport} className="rounded-2xl bg-[#1a1c1e] px-5 py-3 text-sm font-bold text-white">Xuất {resultCount} dòng</button>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e2e2e5] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-[#f8f3f2] text-xs uppercase tracking-wide text-[#5b5f61]">
            <tr>{headers.map((header) => <th key={header} className="px-5 py-4 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-[#f1e7e5] hover:bg-[#fffdfc]">
                {row.map((cell, index) => <td key={index} className="px-5 py-4 align-middle">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ActionGroup({ onDetail, onNote }: { onDetail: () => void; onNote: () => void }) {
  return (
    <div className="flex gap-2">
      <button onClick={onDetail} className="rounded-lg bg-[#fff1ef] px-3 py-2 text-xs font-bold text-[#b7131a]">Chi tiết</button>
      <button onClick={onNote} className="rounded-lg bg-[#f2f2f4] px-3 py-2 text-xs font-bold text-[#5b5f61]">Ghi chú</button>
    </div>
  );
}

function percentBar(value: string) {
  return (
    <div className="min-w-[150px]">
      <div className="h-2 rounded-full bg-[#f1e7e5]"><div className="h-2 rounded-full bg-[#b7131a]" style={{ width: value }} /></div>
      <div className="mt-1 text-xs font-bold text-[#5b5f61]">{value}</div>
    </div>
  );
}

function AdminDataPage({ title, description, placeholder, filters, headers, records }: { title: string; description: string; placeholder: string; filters: string[]; headers: string[]; records: AdminRecord[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(filters[0] ?? "Tất cả");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<SelectedRecord | null>(null);
  const filterAll = filters[0] ?? "Tất cả";

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesQuery = !normalizedQuery || record.searchable.includes(normalizedQuery);
      const matchesFilter = activeFilter === filterAll || record.searchable.includes(activeFilter.toLowerCase()) || record.statusValues.some((value) => value.toLowerCase().includes(activeFilter.toLowerCase()));
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, filterAll, query, records]);

  const openRecord = (record: AdminRecord, type: "detail" | "note") => setSelected({ title: record.cells[0], headers, cells: record.cells, note: notes[record.id] ?? "", type });
  const updateNote = (value: string) => {
    if (!selected) return;
    const record = records.find((item) => item.cells[0] === selected.title);
    if (!record) return;
    setNotes((current) => ({ ...current, [record.id]: value }));
    setSelected({ ...selected, note: value });
  };

  return (
    <AdminShell title={title} description={description}>
      <Toolbar placeholder={placeholder} filters={filters} query={query} activeFilter={activeFilter} resultCount={filteredRecords.length} onQueryChange={setQuery} onFilterChange={setActiveFilter} onExport={() => downloadCsv(`${title.toLowerCase().replace(/\s+/g, "-")}.csv`, headers, filteredRecords)} />
      <DataTable
        headers={[...headers, "Thao tác"]}
        rows={filteredRecords.map((record) => [
          ...record.cells.map((cell, index) => {
            if (index === 0) return <strong>{cell}</strong>;
            if (record.progressIndex === index) return percentBar(cell);
            if (statusTone(cell) !== "neutral") return <StatusPill>{cell}</StatusPill>;
            return cell;
          }),
          <ActionGroup onDetail={() => openRecord(record, "detail")} onNote={() => openRecord(record, "note")} />,
        ])}
      />
      {filteredRecords.length === 0 && <div className="mt-4 rounded-2xl bg-white p-5 text-center font-semibold text-[#5b5f61] shadow-sm ring-1 ring-[#ece2e0]">Không có dữ liệu phù hợp với bộ lọc hiện tại.</div>}
      {selected && (
        <div className="fixed inset-0 z-[80] bg-black/40 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="ml-auto flex h-full max-w-xl flex-col rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="border-b border-[#f1e7e5] p-6">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#b7131a]">{selected.type === "detail" ? "Chi tiết hồ sơ" : "Ghi chú nội bộ"}</div>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em]">{selected.title}</h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="grid gap-3">
                {selected.headers.map((header, index) => (
                  <div key={header} className="rounded-2xl bg-[#f8f3f2] p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-[#8a6d68]">{header}</div>
                    <div className="mt-1 font-semibold">{selected.cells[index]}</div>
                  </div>
                ))}
              </div>
              <label className="mt-6 block">
                <span className="text-sm font-bold text-[#5b403d]">Ghi chú xử lý</span>
                <textarea value={selected.note} onChange={(event) => updateNote(event.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-[#e2e2e5] p-4 outline-none focus:border-[#b7131a]" placeholder="Nhập ghi chú nội bộ cho ca trực sau..." />
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#f1e7e5] p-5">
              <button onClick={() => setSelected(null)} className="rounded-xl bg-[#f2f2f4] px-5 py-3 font-bold text-[#5b5f61]">Đóng</button>
              <button onClick={() => setSelected(null)} className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

export function AdminOverviewPage() {
  return (
    <AdminShell title="Tổng quan quản trị" description="Bảng điều khiển vận hành theo thời gian gần thực: doanh thu, booking, SLA hỗ trợ, chất lượng guide và các cảnh báo cần xử lý.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map(([label, value, change, note]) => <MetricCard key={label} label={label} value={value} change={change} note={note} />)}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Hàng đợi vận hành</h2>
            <StatusPill>Ưu tiên cao</StatusPill>
          </div>
          <div className="mt-5 space-y-3">
            {operations.map(([title, description, status, to]) => (
              <Link key={title} to={to} className="block rounded-2xl border border-[#f1e7e5] p-4 transition hover:border-[#b7131a] hover:bg-[#fff8f7]">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div><div className="font-bold">{title}</div><p className="mt-1 text-sm text-[#5b5f61]">{description}</p></div>
                  <StatusPill>{status}</StatusPill>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="rounded-3xl bg-[#1a1c1e] p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">Sức khỏe theo thành phố</h2>
          <div className="mt-5 space-y-4">
            {cityHealth.map(([city, volume, sla, status, load]) => (
              <div key={city} className="rounded-2xl bg-white/8 p-4">
                <div className="flex items-center justify-between"><div className="font-bold">{city}</div><div className="text-sm text-white/70">{volume}</div></div>
                <div className="mt-3 h-2 rounded-full bg-white/15"><div className="h-2 rounded-full bg-[#ffb3ad]" style={{ width: load }} /></div>
                <div className="mt-3 flex justify-between text-xs text-white/70"><span>SLA {sla}</span><span>{status}</span></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

export function AdminUsersPage() {
  return <AdminDataPage title="Quản lý người dùng" description="Tra cứu tài khoản, trạng thái xác minh, hoạt động booking, rủi ro thanh toán và lịch sử hỗ trợ." placeholder="Tìm theo tên, email, số điện thoại..." filters={["Tất cả", "Khách", "Guide", "Đối tác", "Rủi ro", "Chờ duyệt"]} headers={["Tên", "Vai trò", "Email", "Trạng thái", "Hoạt động", "Rủi ro"]} records={toRecords(users)} />;
}

export function AdminGuidesPage() {
  return <AdminDataPage title="Duyệt và quản lý guide" description="Duyệt hồ sơ Local Guide, theo dõi năng lực dịch vụ, điểm đánh giá, SLA xác nhận và cảnh báo chất lượng." placeholder="Tìm guide theo tên, thành phố, chuyên môn..." filters={["Tất cả", "Chờ duyệt", "Đã xác minh", "Cảnh báo", "Thiếu CCCD", "Cần phỏng vấn"]} headers={["Guide", "Thành phố", "Chuyên môn", "Trạng thái", "Điểm", "SLA", "Việc cần làm"]} records={toRecords(guides, 5)} />;
}

export function AdminBookingsPage() {
  return <AdminDataPage title="Quản lý booking" description="Giám sát vòng đời booking từ giữ chỗ, guide xác nhận, thanh toán, hoàn thành đến tranh chấp và hoàn tiền." placeholder="Tìm mã booking, khách, guide, dịch vụ..." filters={["Tất cả", "Chờ", "Đã giữ chỗ", "Hoàn thành", "Tranh chấp", "Ưu tiên cao"]} headers={["Mã", "Khách", "Guide", "Dịch vụ", "Trạng thái", "Số tiền", "SLA"]} records={toRecords(bookings)} />;
}

export function AdminReportsPage() {
  return <AdminDataPage title="Báo cáo và khiếu nại" description="Xử lý phản ánh, tranh chấp booking, yêu cầu hoàn tiền và cảnh báo hành vi vi phạm trong hệ thống." placeholder="Tìm mã báo cáo, nội dung, booking liên quan..." filters={["Tất cả", "Khẩn cấp", "Cao", "Trung bình", "Đã phản hồi", "Cần xác minh"]} headers={["Mã", "Nội dung", "Liên quan", "Trạng thái", "Mức độ", "Bước tiếp theo"]} records={toRecords(reports)} />;
}

export function AdminPartnersPage() {
  return <AdminDataPage title="Đối tác dịch vụ" description="Quản lý nhà bán hàng, kho vận, khách sạn, SIM/eSIM, vé và các dịch vụ phụ trợ cho người Việt tại Trung Quốc." placeholder="Tìm đối tác theo tên, loại hình, khu vực..." filters={["Tất cả", "Chờ duyệt", "Đã duyệt", "SLA", "Nổi bật", "Cần rà soát"]} headers={["Đối tác", "Loại hình", "Khu vực", "Trạng thái", "Lead", "SLA", "Việc cần làm"]} records={toRecords(partners, 5)} />;
}

export function AdminRevenuePage() {
  const revenueHeaders = ["Nguồn doanh thu", "Giá trị", "Tăng trưởng", "Trạng thái", "Tỷ trọng"];
  const revenueRecords = useMemo(() => toRecords(platformRevenue, 4), []);
  const reconciliationItems = ["Khóa payout 3 booking đang tranh chấp", "Đối soát 12 giao dịch ví chưa khớp", "Gửi báo cáo doanh thu đối tác tháng", "Kiểm tra 2 yêu cầu hoàn tiền lớn"];
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const toggleItem = (item: string) => setCompletedItems((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);

  return (
    <AdminShell title="Doanh thu nền tảng" description="Theo dõi GMV, doanh thu thuần, cơ cấu nguồn thu, hoa hồng guide, gói premium và doanh thu đối tác." action={<button onClick={() => downloadCsv("doanh-thu-nen-tang.csv", revenueHeaders, revenueRecords)} className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xuất doanh thu CSV</button>}>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="GMV tháng này" value="4.82 tỷ" change="+28%" note="8.204 booking" />
        <MetricCard label="Doanh thu thuần" value="715.7 triệu" change="+19%" note="Sau hoàn tiền" />
        <MetricCard label="Hoa hồng TB" value="14.8%" change="+1.2%" note="Theo dịch vụ" />
        <MetricCard label="Hoàn tiền" value="1.9%" change="-0.4%" note="Trong ngưỡng" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <DataTable headers={revenueHeaders} rows={platformRevenue.map(([source, value, growth, status, share]) => [<strong>{source}</strong>, value, <StatusPill>{growth}</StatusPill>, <StatusPill>{status}</StatusPill>, percentBar(share)])} />
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Đối soát cần làm</h2>
            <StatusPill>{`${completedItems.length}/${reconciliationItems.length} hoàn tất`}</StatusPill>
          </div>
          <div className="mt-5 space-y-3">
            {reconciliationItems.map((item) => {
              const completed = completedItems.includes(item);
              return <button key={item} onClick={() => toggleItem(item)} className={`w-full rounded-2xl p-4 text-left font-semibold transition ${completed ? "bg-[#e7f7ed] text-[#087443] line-through" : "bg-[#f8f3f2] text-[#5b403d] hover:bg-[#fff1ef] hover:text-[#b7131a]"}`}>{item}</button>;
            })}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

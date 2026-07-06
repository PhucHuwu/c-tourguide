import { Link } from "react-router";
import svgPathsAdmin from "@/assets/generated/admin-dashboard/svg-paths";
import userAvatar from "@/assets/generated/admin-dashboard/admin-avatar.png";

const stats = [
  {
    icon: svgPathsAdmin.pa97bc80,
    iconBg: "#FFDAD6",
    iconColor: "#B7131A",
    label: "Tổng người dùng",
    value: "24,592",
    change: "+12%",
    changeUp: true,
  },
  {
    icon: svgPathsAdmin.p46f1900,
    iconBg: "#CCE4E9",
    iconColor: "#006578",
    label: "Guide đang hoạt động",
    value: "1,843",
    change: "+6%",
    changeUp: true,
  },
  {
    icon: svgPathsAdmin.p5c2b680,
    iconBg: "#FFDAD6",
    iconColor: "#B7131A",
    label: "Booking tháng này",
    value: "8,204",
    change: "+28%",
    changeUp: true,
  },
  {
    icon: svgPathsAdmin.p21aa9c00,
    iconBg: "#D3F1DD",
    iconColor: "#006D3A",
    label: "Doanh thu năm",
    value: "1.2 tỷ",
    change: "-2%",
    changeUp: false,
  },
];

const menuItems = [
  { icon: svgPathsAdmin.p5a0a780, label: "Tổng quan", active: true },
  { icon: svgPathsAdmin.pa97bc80, label: "Người dùng", active: false },
  { icon: svgPathsAdmin.p46f1900, label: "Guide", active: false },
  { icon: svgPathsAdmin.p5c2b680, label: "Booking", active: false },
  { icon: svgPathsAdmin.p53fc80, label: "Thanh toán", active: false },
  { icon: svgPathsAdmin.p34fa700, label: "Khiếu nại", active: false },
  { icon: svgPathsAdmin.p11a33c00, label: "Cẩm nang", active: false },
  { icon: svgPathsAdmin.p7b3b600, label: "Quảng cáo", active: false },
  { icon: svgPathsAdmin.p1c6eb780, label: "AI", active: false },
  { icon: svgPathsAdmin.p43607980, label: "Báo cáo", active: false },
];

const recentBookings = [
  {
    id: "#BK-9021",
    user: "Nguyễn Văn A",
    guide: "Trần Thị B",
    destination: "Bắc Kinh",
    date: "12/10/2024",
    status: "Đã xác nhận",
    amount: "3.200.000đ",
  },
  {
    id: "#BK-9022",
    user: "Lê Hoàng C",
    guide: "Phạm Văn D",
    destination: "Thượng Hải",
    date: "14/10/2024",
    status: "Chờ xử lý",
    amount: "2.400.000đ",
  },
];

export function AdminDashboard() {
  const chartData = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 35 },
    { label: "Mar", value: 45 },
    { label: "Apr", value: 40 },
    { label: "May", value: 50 },
    { label: "Jun", value: 55 },
    { label: "Jul", value: 60 },
    { label: "Aug", value: 58 },
    { label: "Sep", value: 65 },
    { label: "Oct", value: 70 },
    { label: "Nov", value: 68 },
    { label: "Dec", value: 75 },
  ];
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="flex min-h-screen bg-[#f3f3f6]">
      {/* ── Left Sidebar ── */}
      <aside className="w-[200px] bg-white border-r border-[#e2e2e5] flex flex-col">
        {/* Logo */}
        <div className="p-[20px] border-b border-[#e2e2e5]">
          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#db322f] text-[20px] leading-tight">C-TourGuide Admin</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-[12px] overflow-y-auto">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to="/admin"
              className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] mb-[4px] transition-colors ${
                item.active ? "bg-[#db322f] text-white" : "text-[#5b5f61] hover:bg-[#f3f3f6]"
              }`}
            >
              <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                <path d={item.icon} fill={item.active ? "white" : "#5B5F61"} />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] text-[14px]" style={{ fontWeight: item.active ? 600 : 400 }}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-[#e2e2e5] p-[16px]">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <img src={userAvatar} alt="Admin" className="size-[40px] rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] truncate">Xin chào, Admin</div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px]">Quản trị hệ thống</div>
            </div>
          </div>
          <div className="space-y-[4px]">
            <Link to="/safety" className="flex items-center gap-[8px] px-[12px] py-[6px] hover:bg-[#f3f3f6] rounded-[6px] transition-colors">
              <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
                <path d={svgPathsAdmin.p1c6eb780} fill="#5B5F61" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[13px]">Trợ giúp</span>
            </Link>
            <Link to="/" className="flex items-center gap-[8px] px-[12px] py-[6px] hover:bg-[#f3f3f6] rounded-[6px] transition-colors">
              <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
                <path d={svgPathsAdmin.p9a12a00} fill="#B7131A" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#b7131a] text-[13px]">Đăng xuất</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-[40px] flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-[32px]">
            <div>
              <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[48px] leading-[52.8px] tracking-[-0.96px] mb-[4px]">
                Tổng quan hệ thống
              </h1>
              <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b403d] text-[16px] leading-[25.6px]">Chỉ số nền tảng, booking gần đây và vận hành kiểm soát chất lượng.</p>
            </div>

            <div className="flex items-center gap-[16px]">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm booking, guide, người dùng..."
                  className="bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] pl-[41px] pr-[17px] py-[13px] w-[300px] font-['Be_Vietnam_Pro',sans-serif] text-[16px] text-[#1a1c1e] placeholder:text-[#6b7280] focus:outline-none focus:border-[#b7131a]"
                />
                <svg className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                  <path d={svgPathsAdmin.p8a35e00} fill="#5B403D" />
                </svg>
              </div>

              {/* Notification */}
              <button className="bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] size-[48px] flex items-center justify-center hover:bg-[#f3f3f6] transition-colors">
                <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                  <path d={svgPathsAdmin.p164b49c0} fill="#1A1C1E" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-[16px] mb-[32px]">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white border border-[#e2e2e5] rounded-[12px] p-[20px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-start justify-between mb-[16px]">
                  <div className="flex items-center justify-center rounded-full size-[48px]" style={{ backgroundColor: stat.iconBg }}>
                    <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                      <path d={stat.icon} fill={stat.iconColor} />
                    </svg>
                  </div>
                  <div
                    className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-full"
                    style={{ backgroundColor: stat.changeUp ? "rgba(0,128,151,0.15)" : "rgba(183,19,26,0.15)" }}
                  >
                    <svg className="w-[10px] h-[6px]" fill="none" viewBox="0 0 10 6">
                      <path
                        d={stat.changeUp ? "M5 0L10 6H0L5 0Z" : "M5 6L0 0H10L5 6Z"}
                        fill={stat.changeUp ? "#006578" : "#B7131A"}
                      />
                    </svg>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px]" style={{ color: stat.changeUp ? "#006578" : "#B7131A" }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] mb-[4px]">{stat.label}</div>
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[38.4px]">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-[1fr_400px] gap-[24px] mb-[32px]">
            {/* Booking Trends */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-[24px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[28px]">Booking Trends</h2>
                <select className="bg-[#f9f9fc] border border-[#e2e2e5] rounded-[6px] px-[12px] py-[6px] font-['Be_Vietnam_Pro',sans-serif] text-[14px] text-[#1a1c1e]">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>

              {/* Simple Line Chart */}
              <div className="relative h-[200px]">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="0" x2="600" y2="0" stroke="#e2e2e5" strokeWidth="1" />
                  <line x1="0" y1="50" x2="600" y2="50" stroke="#e2e2e5" strokeWidth="1" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="#e2e2e5" strokeWidth="1" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#e2e2e5" strokeWidth="1" />
                  <line x1="0" y1="200" x2="600" y2="200" stroke="#e2e2e5" strokeWidth="1" />

                  {/* Area fill */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B7131A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#B7131A" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Chart area */}
                  <path
                    d={`M 0,${200 - (chartData[0].value / maxValue) * 200} ${chartData
                      .map((d, i) => `L ${(i * 600) / (chartData.length - 1)},${200 - (d.value / maxValue) * 200}`)
                      .join(" ")} L 600,200 L 0,200 Z`}
                    fill="url(#chartGradient)"
                  />

                  {/* Chart line */}
                  <polyline
                    fill="none"
                    stroke="#B7131A"
                    strokeWidth="3"
                    points={chartData.map((d, i) => `${(i * 600) / (chartData.length - 1)},${200 - (d.value / maxValue) * 200}`).join(" ")}
                  />

                  {/* Data points */}
                  {chartData.map((d, i) => (
                    <circle key={i} cx={(i * 600) / (chartData.length - 1)} cy={200 - (d.value / maxValue) * 200} r="4" fill="#B7131A" />
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between mt-[8px]">
                  {chartData.map((d) => (
                    <span key={d.label} className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[11px]">
                      {d.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-[16px] pt-[16px] border-t border-[#e2e2e5]">
                <div className="flex items-center gap-[4px]">
                  <div className="w-[12px] h-[3px] bg-[#B7131A] rounded-full" />
                  <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">Tổng quan Doanh thu & Lượt khách (2023)</span>
                </div>
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[18px] mt-[4px]">14.8 tỷ VND</div>
              </div>
            </div>

            {/* User Demographics */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[28px] mb-[24px]">Phân bổ người dùng</h2>

              {/* Donut Chart Placeholder */}
              <div className="flex items-center justify-center h-[200px] mb-[16px]">
                <div className="relative">
                  {/* Simple donut representation */}
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#FFB4AC" strokeWidth="30" strokeDasharray="220 440" transform="rotate(-90 90 90)" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#CCE4E9" strokeWidth="30" strokeDasharray="110 440" strokeDashoffset="-220" transform="rotate(-90 90 90)" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#E2E2E5" strokeWidth="30" strokeDasharray="110 440" strokeDashoffset="-330" transform="rotate(-90 90 90)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[24px]">8,450</div>
                    <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px]">Tổng người dùng</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-[8px]">
                {[
                  { color: "#FFB4AC", label: "PHÂN BỐ NGƯỜI DÙNG THEO ĐỘ TUỔI", value: "50%" },
                  { color: "#CCE4E9", label: "Nam giới", value: "25%" },
                  { color: "#E2E2E5", label: "Nữ giới", value: "25%" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{item.label}</span>
                    </div>
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-[24px]">
              <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[28px]">Booking gần đây</h2>
              <div className="flex gap-[12px]">
                <button className="flex items-center gap-[8px] px-[16px] py-[8px] border border-[#e2e2e5] rounded-[8px] hover:bg-[#f3f3f6] transition-colors">
                  <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
                    <path d={svgPathsAdmin.p78f3700} fill="#5B5F61" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">Lọc</span>
                </button>
                <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#db322f] rounded-[8px] hover:bg-[#b7131a] transition-colors">
                  <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
                    <path d={svgPathsAdmin.p358da480} fill="white" />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px]">Xuất file</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e2e2e5]">
                    {["Mã booking", "Khách", "Guide", "Điểm đến", "Ngày", "Trạng thái", "Số tiền", "Thao tác"].map((header) => (
                      <th key={header} className="text-left px-[16px] py-[12px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[12px] uppercase tracking-[0.5px]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[#e2e2e5] hover:bg-[#f9f9fc] transition-colors">
                      <td className="px-[16px] py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{booking.id}</td>
                      <td className="px-[16px] py-[16px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="size-[36px] rounded-full bg-[#CCE4E9] flex items-center justify-center">
                            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#006578] text-[12px]">{booking.user.charAt(0)}</span>
                          </div>
                          <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[14px]">{booking.user}</span>
                        </div>
                      </td>
                      <td className="px-[16px] py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[14px]">{booking.guide}</td>
                      <td className="px-[16px] py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#1a1c1e] text-[14px]">{booking.destination}</td>
                      <td className="px-[16px] py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">{booking.date}</td>
                      <td className="px-[16px] py-[16px]">
                        <span
                          className={`inline-flex px-[12px] py-[4px] rounded-full font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px] ${
                            booking.status === "Đã xác nhận" ? "bg-[#D3F1DD] text-[#006D3A]" : "bg-[#FFE5B4] text-[#8B6914]"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-[16px] py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{booking.amount}</td>
                      <td className="px-[16px] py-[16px]">
                        <button className="hover:bg-[#f3f3f6] rounded-[6px] p-[6px] transition-colors">
                          <svg className="w-[16px] h-[4px]" fill="none" viewBox="0 0 16 4">
                            <circle cx="2" cy="2" r="2" fill="#5B5F61" />
                            <circle cx="8" cy="2" r="2" fill="#5B5F61" />
                            <circle cx="14" cy="2" r="2" fill="#5B5F61" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="mt-auto border-t border-[#e2e2e5] bg-white px-[40px] py-[24px]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[18px]">C-TourGuide Admin</div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">Quản trị chất lượng, booking, guide và báo cáo vận hành.</div>
            </div>
            <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px]">Về trang chủ</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

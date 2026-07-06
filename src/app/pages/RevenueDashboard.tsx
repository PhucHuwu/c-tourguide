import { Link } from "react-router";
import { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart } from "recharts";
import svgPaths from "@/assets/generated/revenue-dashboard/svg-paths";
import userAvatar1 from "@/assets/generated/revenue-dashboard/earner-avatar-1.png";
import userAvatar2 from "@/assets/generated/revenue-dashboard/earner-avatar-2.png";

const revenueData = [
  { month: "T1", value: 65000 },
  { month: "T2", value: 85000 },
  { month: "T3", value: 95000 },
  { month: "T4", value: 90000 },
  { month: "T5", value: 120000 },
  { month: "T6", value: 130000 },
  { month: "T7", value: 125000 },
  { month: "T8", value: 145000 },
  { month: "T9", value: 155000 },
  { month: "T10", value: 130000 },
];

const sourcesData = [
  { name: "Hoa hồng booking", value: 124500, color: "#B7131A" },
  { name: "Premium guide", value: 45200, color: "#DB322F" },
  { name: "Phí nền tảng", value: 18400, color: "#FFB4AB" },
];

const earnings = [
  {
    id: "#BK-9921",
    user: "Anh Nguyễn",
    initials: "AN",
    avatar: userAvatar1,
    service: "Tour riêng",
    commission: "¥150",
    status: "Hoàn thành",
    date: "24/10/2024",
  },
  {
    id: "#BK-9920",
    user: "Tran Minh",
    initials: "TM",
    avatar: userAvatar2,
    service: "Phiên dịch",
    commission: "¥45",
    status: "Hoàn thành",
    date: "23/10/2024",
  },
  {
    id: "#BK-9919",
    user: "Lê Hoa",
    initials: "LH",
    avatar: null,
    service: "Tour nhóm",
    commission: "¥300",
    status: "Chờ xử lý",
    date: "22/10/2024",
  },
];

export function RevenueDashboard() {
  const [timePeriod, setTimePeriod] = useState<"day" | "week" | "month" | "year">("month");

  return (
    <div className="flex min-h-screen bg-[#f9f9fc]">
      {/* ── Left Sidebar ── */}
      <aside className="w-[200px] bg-white border-r border-[#e2e2e5] flex flex-col">
        {/* Logo Section */}
        <div className="p-[24px] pb-[32px]">
          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[20px] leading-[28px] mb-[4px]">C-TourGuide</div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b403d] text-[12px] leading-[16.8px]">Dashboard guide</div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px] leading-[16.8px]">Quản lý dịch vụ</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-[12px]">
          <Link to="/dashboard" className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#f3f3f6] transition-colors mb-[4px]">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d={svgPaths.p20793584} fill="#5B403D" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Tổng quan</span>
          </Link>

          <Link to="/guides" className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#f3f3f6] transition-colors mb-[4px]">
            <svg className="w-[18px] h-[20px]" fill="none" viewBox="0 0 18 20">
              <path d={svgPaths.pd0beb00} fill="#5B403D" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Booking</span>
          </Link>

          <Link to="/dashboard" className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#f3f3f6] transition-colors mb-[4px]">
            <svg className="w-[18px] h-[20px]" fill="none" viewBox="0 0 18 20">
              <path d={svgPaths.p3c95900} fill="#5B403D" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Lịch làm việc</span>
          </Link>

          {/* Active: Thu nhập */}
          <div className="bg-[#ffdad6] flex items-center gap-[12px] p-[12px] rounded-[8px] mb-[4px]">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d={svgPaths.p1ce44900} fill="#B7131A" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">Thu nhập</span>
          </div>
        </nav>

        {/* Cài đặt */}
        <div className="p-[12px] border-t border-[#e2e2e5]">
          <button className="flex items-center gap-[12px] p-[12px] rounded-[8px] hover:bg-[#f3f3f6] transition-colors w-full">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
              <path d={svgPaths.p3bec4580} fill="#5B403D" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">Cài đặt</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="max-w-[1200px] mx-auto p-[40px] flex-1 w-full">
          {/* Header */}
          <div className="mb-[40px]">
            <div className="flex items-start justify-between mb-[8px]">
              <div>
                <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[40px] leading-[48px] mb-[8px]">Bảng doanh thu</h1>
                <p className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px]">Theo dõi hoa hồng, gói premium và hiệu suất nền tảng.</p>
              </div>

              {/* Time Period Tabs */}
              <div className="flex gap-[8px] bg-white border border-[#e2e2e5] rounded-[8px] p-[4px]">
                {(["day", "week", "month", "year"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-[16px] py-[8px] rounded-[6px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] capitalize transition-colors ${
                      timePeriod === period ? "bg-[#b7131a] text-white" : "text-[#5b5f61] hover:bg-[#f3f3f6]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-[24px] mb-[32px]">
            {/* Total Revenue */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <div className="flex items-start justify-between mb-[16px]">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Tổng doanh thu</div>
                <div className="bg-[#ffdad6] rounded-[8px] p-[8px]">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p1bf34e84} fill="#B7131A" />
                  </svg>
                </div>
              </div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[40px] mb-[8px]">¥1,245,000</div>
              <div className="flex items-center gap-[4px]">
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1a03fe00} fill="#198754" />
                </svg>
                <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#198754] text-[12px]">+12.5% so với tháng trước</span>
              </div>
            </div>

            {/* Commissions */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <div className="flex items-start justify-between mb-[16px]">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Hoa hồng (10%)</div>
                <div className="bg-[#ffdad6] rounded-[8px] p-[8px]">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p3aad5c80} fill="#B7131A" />
                  </svg>
                </div>
              </div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[40px] mb-[8px]">¥124,500</div>
              <div className="flex items-center gap-[4px]">
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1a03fe00} fill="#198754" />
                </svg>
                <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#198754] text-[12px]">+8.2% so với tháng trước</span>
              </div>
            </div>

            {/* Premium Memberships */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <div className="flex items-start justify-between mb-[16px]">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Gói Premium</div>
                <div className="bg-[#ffdad6] rounded-[8px] p-[8px]">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p14fdd300} fill="#B7131A" />
                  </svg>
                </div>
              </div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[40px] mb-[8px]">¥45,200</div>
              <div className="flex items-center gap-[4px]">
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1cf7e780} fill="#DC3545" />
                </svg>
                <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#DC3545] text-[12px]">+0.5% so với tháng trước</span>
              </div>
            </div>

            {/* Platform Fees */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <div className="flex items-start justify-between mb-[16px]">
                <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Phí nền tảng</div>
                <div className="bg-[#ffdad6] rounded-[8px] p-[8px]">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p27ee7480} fill="#B7131A" />
                  </svg>
                </div>
              </div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[40px] mb-[8px]">¥18,400</div>
              <div className="flex items-center gap-[4px]">
                <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1a03fe00} fill="#198754" />
                </svg>
                <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#198754] text-[12px]">+3.1% so với tháng trước</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-[24px] mb-[32px]">
            {/* Revenue Growth Chart */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] mb-[24px]">Tăng trưởng doanh thu</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B7131A" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#B7131A" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e5" />
                  <XAxis dataKey="month" stroke="#5b5f61" style={{ fontSize: "12px", fontFamily: "Be Vietnam Pro" }} />
                  <YAxis stroke="#5b5f61" style={{ fontSize: "12px", fontFamily: "Be Vietnam Pro" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e2e5",
                      borderRadius: "8px",
                      fontFamily: "Be Vietnam Pro",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#B7131A" strokeWidth={2} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Sources Chart */}
            <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
              <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] mb-[24px]">Nguồn doanh thu</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={sourcesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={0}>
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-[16px] space-y-[8px]">
                {sourcesData.map((item) => (
                  <div key={item.name} className="flex items-center gap-[8px]">
                    <div className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px]">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bảng thu nhập gần đây */}
          <div className="bg-white border border-[#e2e2e5] rounded-[12px] p-[24px]">
            <div className="flex items-center justify-between mb-[24px]">
              <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px]">Thu nhập gần đây</h3>
              <button className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] hover:underline">Xem tất cả</button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e2e5]">
                  <th className="pb-[12px] text-left font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Booking / Khách</th>
                  <th className="pb-[12px] text-left font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Dịch vụ</th>
                  <th className="pb-[12px] text-left font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Hoa hồng</th>
                  <th className="pb-[12px] text-left font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Trạng thái</th>
                  <th className="pb-[12px] text-left font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px]">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.id} className="border-b border-[#e2e2e5] last:border-0">
                    <td className="py-[16px]">
                      <div className="flex items-center gap-[12px]">
                        {earning.avatar ? (
                          <img src={earning.avatar} alt={earning.user} className="w-[40px] h-[40px] rounded-full object-cover" />
                        ) : (
                          <div className="w-[40px] h-[40px] rounded-full bg-[#ffdad6] flex items-center justify-center">
                            <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px]">{earning.initials}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[14px]">{earning.id}</div>
                          <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{earning.user}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-[16px] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e] text-[14px]">{earning.service}</td>
                    <td className="py-[16px] font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[14px]">{earning.commission}</td>
                    <td className="py-[16px]">
                      <span
                        className={`px-[12px] py-[4px] rounded-full font-['Be_Vietnam_Pro',sans-serif] text-[12px] ${
                          earning.status === "Hoàn thành" ? "bg-[#d1f4e0] text-[#198754]" : "bg-[#f3f3f6] text-[#5b5f61]"
                        }`}
                      >
                        {earning.status}
                      </span>
                    </td>
                    <td className="py-[16px] font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px]">{earning.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <footer className="mt-auto border-t border-[#e2e2e5] bg-white px-[40px] py-[24px]">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[18px]">C-TourGuide Revenue</div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">Dashboard demo theo dõi hoa hồng và hiệu suất doanh thu.</div>
            </div>
            <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px]">Về trang chủ</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

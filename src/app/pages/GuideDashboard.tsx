import { Link } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";
import svgPathsDashboard from "@/assets/generated/guide-dashboard/svg-paths";
import userAvatar from "@/assets/generated/guide-dashboard/guide-avatar.png";
import clientAvatar from "@/assets/generated/guide-dashboard/client-avatar.png";

const stats = [
  {
    icon: svgPathsDashboard.p5096800,
    iconBg: "rgba(219,50,47,0.2)",
    iconColor: "#B7131A",
    label: "SỐ TOUR HOÀN THÀNH",
    value: "24",
    subtitle: "Tháng này",
    badge: "12%",
    badgeUp: true,
  },
  {
    icon: svgPathsDashboard.p53fc80,
    iconBg: "rgba(91,64,61,0.2)",
    iconColor: "#5B403D",
    label: "THU NHẬP DỰ KIẾN",
    value: "45.2M",
    valueUnit: "VND",
    subtitle: "Đã chốt số: 30M VND",
  },
  {
    icon: svgPathsDashboard.p83ab80,
    iconBg: "rgba(255,180,0,0.2)",
    iconColor: "#FFB400",
    label: "ĐÁNH GIÁ TRUNG BÌNH",
    value: "4.9",
    valueUnit: "/5.0",
    subtitle: "Từ 156 đánh giá",
  },
  {
    icon: svgPathsDashboard.p1c6eb780,
    iconBg: "rgba(91,64,61,0.2)",
    iconColor: "#5B403D",
    label: "TỶ LỆ PHẢN HỒI",
    value: "94%",
    subtitle: "Thời gian TB: 15 phút",
    badge: "2%",
    badgeUp: false,
  },
];

const upcomingTours = [
  {
    date: "Ngày mai, 12 Tháng 10",
    title: "Tour Tham quan Tử Cấm Thành",
    time: "08:00 - 16:00",
    guests: "Đoàn 12 khách (Gia đình)",
    location: "Bắc Kinh",
    status: "urgent",
    statusLabel: "HÔM NAY • ĐANG DIỄN RA",
  },
  {
    date: "Ngày mai, 12 Tháng 10",
    title: "Vạn Lý Trường Thành - Khu Mộ Điển Dục",
    time: "07:30 - 18:00",
    guests: "Khởi hành từ Khách sạn Wangfujing",
    location: "",
    status: "normal",
  },
  {
    date: "15 Tháng 10",
    title: "Đón sân bay & City Tour nhẹ",
    time: "14:00 - 20:00",
    guests: "Sân bay Quốc tế Thủ đô Bắc Kinh (PEK)",
    location: "",
    status: "normal",
  },
];

const notifications = [
  {
    icon: svgPathsDashboard.p1c6eb780,
    iconBg: "#FFDAD6",
    iconColor: "#B7131A",
    title: "Cập nhật chính sách hoàn hủy",
    message: "Hệ thống vừa cập nhất chính sách hoàn tiền cho khách hàng 1 giờ trước",
    time: "1 giờ trước",
  },
  {
    avatar: clientAvatar,
    title: "Trần Văn Nam",
    subtitle: "đã gửi tin nhắn",
    message: '"Hướng dẫn viên cho tôi hỏi ngày mai thời tiết Bắc Kinh thế nào để chuẩn bị đồ khoác?"',
    time: "3 giờ trước",
  },
];

const bookingRequests = [
  {
    initials: "LA",
    bgColor: "#CCE4E9",
    textColor: "#006578",
    name: "Lê Anh Tuấn",
    tour: "Tour Tử Cấm Thành",
    date: "20-22/10/2024",
    guests: "8 người",
  },
  {
    initials: "NH",
    bgColor: "#E2E2E5",
    textColor: "#5B5F61",
    name: "Nguyễn Hương",
    tour: "City Tour Thượng Hải",
    date: "25/10/2024",
    guests: "4 người",
  },
];

export function GuideDashboard() {
  const chartData = [
    { month: "T5", value: 35 },
    { month: "T6", value: 45 },
    { month: "T7", value: 42 },
    { month: "T8", value: 48 },
    { month: "T9", value: 52 },
    { month: "T10", value: 55 },
  ];
  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="flex min-h-screen bg-[#f9f9fc]">
      {/* ── Left Sidebar ── */}
      <aside className="w-[200px] bg-white border-r border-[#e4beb9] flex flex-col">
        {/* Logo */}
        <div className="p-[16px] border-b border-[#e4beb9]">
          <div className="flex items-center gap-[8px]">
            <div className="bg-[#db322f] rounded-full size-[36px] flex items-center justify-center">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-white text-[14px]">CT</span>
            </div>
            <div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[16px] leading-tight">C-TourGuide</div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[10px]">Hệ thống quản lý</div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-[16px] border-b border-[#e4beb9]">
          <div className="flex items-center gap-[8px]">
            <img src={userAvatar} alt="User" className="size-[40px] rounded-full" />
            <div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">Xin chào, Thu Hà</div>
              <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px]">Hướng dẫn viên Vàng</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-[12px]">
          <Link to="/dashboard" className="bg-[#db322f] rounded-[8px] px-[16px] py-[12px] flex items-center gap-[12px] mb-[4px]">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p5a0a780} fill="white" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px]">Dashboard</span>
          </Link>
          <Link to="/guide/dashboard" className="rounded-[8px] px-[16px] py-[12px] flex items-center gap-[12px] mb-[4px] hover:bg-[#f3f3f6] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.pdc37d80} fill="#5B5F61" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">Lịch trình</span>
          </Link>
          <Link to="/messages" className="rounded-[8px] px-[16px] py-[12px] flex items-center gap-[12px] mb-[4px] hover:bg-[#f3f3f6] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p20a8000} fill="#5B5F61" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">Tin nhắn</span>
          </Link>
          <Link to="/revenue" className="rounded-[8px] px-[16px] py-[12px] flex items-center gap-[12px] mb-[4px] hover:bg-[#f3f3f6] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p43607980} fill="#5B5F61" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">Tài chính</span>
          </Link>
          <Link to="/guide-register" className="rounded-[8px] px-[16px] py-[12px] flex items-center gap-[12px] hover:bg-[#f3f3f6] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p2d1bb600} fill="#5B5F61" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">Cài đặt</span>
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="p-[12px] border-t border-[#e4beb9]">
          <button className="bg-[#db322f] rounded-[8px] px-[16px] py-[12px] w-full mb-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px]">
            Bật nhận khách
          </button>
          <Link to="/safety" className="flex items-center gap-[8px] px-[16px] py-[8px] hover:bg-[#f3f3f6] rounded-[8px] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p2d1bb600} fill="#5B5F61" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[14px]">Trợ giúp</span>
          </Link>
          <Link to="/" className="flex items-center gap-[8px] px-[16px] py-[8px] hover:bg-[#f3f3f6] rounded-[8px] transition-colors">
            <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
              <path d={svgPathsDashboard.p9a12a00} fill="#B7131A" />
            </svg>
            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#b7131a] text-[14px]">Đăng xuất</span>
          </Link>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="p-[40px] flex-1">
          {/* Page Header */}
          <div className="flex items-end justify-between mb-[32px]">
            <div>
              <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[48px] leading-[52.8px] tracking-[-0.96px] mb-[4px]">
                Tổng quan công việc
              </h1>
              <p className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[16px] leading-[25.6px]">
                Cập nhật hiệu suất và lịch trình của bạn tháng này.
              </p>
            </div>
            <button className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[8px] px-[17px] py-[9px] flex items-center gap-[8px] hover:bg-[#f3f3f6] transition-colors">
              <svg className="size-[10.667px]" fill="none" viewBox="0 0 10.6667 10.6667">
                <path d={svgPathsDashboard.p358da480} fill="#1A1C1E" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] tracking-[0.14px]">Tải báo cáo</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-[16px] mb-[32px]">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[12px] p-[17px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-start justify-between mb-[16px]">
                  <div className="flex items-center justify-center rounded-full size-[40px]" style={{ backgroundColor: stat.iconBg }}>
                    <svg className="w-[14px] h-[20px]" fill="none" viewBox="0 0 14 20">
                      <path d={stat.icon} fill={stat.iconColor} />
                    </svg>
                  </div>
                  {stat.badge && (
                    <div
                      className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-full"
                      style={{ backgroundColor: stat.badgeUp ? "rgba(0,128,151,0.2)" : "rgba(183,19,26,0.2)" }}
                    >
                      <svg className="w-[11.667px] h-[7px]" fill="none" viewBox="0 0 11.6667 7">
                        <path d={stat.badgeUp ? svgPathsDashboard.pde19380 : svgPathsDashboard.p14e5580} fill={stat.badgeUp ? "#006578" : "#B7131A"} />
                      </svg>
                      <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[14px] tracking-[0.14px]" style={{ color: stat.badgeUp ? "#006578" : "#B7131A" }}>
                        {stat.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-[3px]">
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px] tracking-[0.6px] uppercase">{stat.label}</div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[32px] leading-[38.4px]">
                    {stat.value}
                    {stat.valueUnit && <span className="text-[16px] ml-1">{stat.valueUnit}</span>}
                  </div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[16.8px]">{stat.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-[1fr_400px] gap-[24px]">
            {/* Left: Schedule */}
            <div className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[12px] p-[17px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-[16px]">
                <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] leading-[28px]">Lịch trình sắp tới</h2>
                <Link to="/guide/dashboard" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px] tracking-[0.14px]">
                  Xem tất cả lịch
                </Link>
              </div>

              {/* Timeline */}
              <div className="relative border-l-2 border-[rgba(183,19,26,0.2)] pl-[24px] space-y-[24px]">
                {upcomingTours.map((tour, idx) => (
                  <div key={idx} className="relative">
                    {/* Dot */}
                    <div
                      className="absolute left-[-29.5px] top-[8px] size-[12px] rounded-full border-2 border-[#f9f9fc]"
                      style={{ backgroundColor: tour.status === "urgent" ? "#B7131A" : "#E2E2E5" }}
                    />

                    {/* Content */}
                    <div className="flex flex-col gap-[4px]">
                      <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b403d] text-[14px] tracking-[0.14px]">{tour.date}</div>

                      {tour.status === "urgent" && tour.statusLabel && (
                        <div className="bg-[rgba(255,218,214,0.5)] border border-[#FFB4AC] rounded-[8px] px-[12px] py-[8px] mb-[4px]">
                          <div className="flex items-center gap-[4px] mb-[4px]">
                            <div className="size-[6px] rounded-full bg-[#B7131A]" />
                            <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[10px] tracking-[0.5px] uppercase">{tour.statusLabel}</span>
                          </div>
                          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[18px] leading-[28.8px]">{tour.title}</div>
                          <div className="flex items-center gap-[8px] text-[#5b5f61] text-[14px]">
                            <div className="flex items-center gap-[4px]">
                              <svg className="w-[12px] h-[13.467px]" fill="none" viewBox="0 0 12 13.4667">
                                <path d={svgPathsDashboard.p1ef9d00} fill="#5B5F61" />
                              </svg>
                              <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal">{tour.guests}</span>
                            </div>
                            {tour.location && (
                              <>
                                <span>•</span>
                                <svg className="w-[10.667px] h-[13.333px]" fill="none" viewBox="0 0 10.6667 13.3333">
                                  <path d={svgPathsDashboard.pa2c1e80} fill="#5B5F61" />
                                </svg>
                                <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal">{tour.location}</span>
                              </>
                            )}
                          </div>
                          <div className="flex gap-[8px] mt-[8px]">
                            <button className="bg-[#db322f] rounded-[8px] px-[16px] py-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px]">
                              Chi tiết đoàn
                            </button>
                            <button className="bg-white border border-[#e4beb9] rounded-[8px] px-[16px] py-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">
                              Nhắn tin
                            </button>
                          </div>
                        </div>
                      )}

                      {tour.status !== "urgent" && (
                        <div className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[8px] px-[17px] py-[17px]">
                          <div className="flex items-start justify-between mb-[4px]">
                            <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[18px] leading-[28.8px]">{tour.title}</div>
                            <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] pl-[8px]">{tour.time}</div>
                          </div>
                          <div className="flex items-center gap-[4px] text-[#5b5f61]">
                            <svg className="w-[12px] h-[13.467px]" fill="none" viewBox="0 0 12 13.4667">
                              <path d={svgPathsDashboard.p1723d00} fill="#5B5F61" />
                            </svg>
                            <span className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[16px] leading-[25.6px]">{tour.guests}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[24px]">
              {/* Income Chart */}
              <div className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[12px] p-[17px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] leading-[28px]">Thu nhập 6 tháng gần nhất</h3>
                  <button>
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d={svgPathsDashboard.p78f3700} fill="#5B5F61" />
                    </svg>
                  </button>
                </div>
                <div className="text-[10px] text-[#5b5f61] mb-[8px] font-['Be_Vietnam_Pro',sans-serif]">Đơn vị: Triệu VND</div>

                {/* Simple Bar Chart */}
                <div className="flex items-end justify-between gap-[8px] h-[120px]">
                  {chartData.map((item, idx) => {
                    const isLast = idx === chartData.length - 1;
                    const height = (item.value / maxValue) * 100;
                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-[8px]">
                        <div className="w-full flex items-end" style={{ height: "100px" }}>
                          <div className="w-full rounded-t-[4px]" style={{ height: `${height}%`, backgroundColor: isLast ? "#B7131A" : idx === chartData.length - 2 ? "#FFB4AC" : "#E2E2E5" }} />
                        </div>
                        <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[12px]">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[12px] p-[17px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] leading-[28px]">Thông báo & Tin nhắn</h3>
                  <button>
                    <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                      <path d={svgPathsDashboard.p78f3700} fill="#5B5F61" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-[12px]">
                  {notifications.map((notif, idx) => (
                    <div key={idx} className="flex gap-[12px]">
                      {notif.icon ? (
                        <div className="flex items-center justify-center rounded-full size-[40px] shrink-0" style={{ backgroundColor: notif.iconBg }}>
                          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                            <path d={notif.icon} fill={notif.iconColor} />
                          </svg>
                        </div>
                      ) : (
                        <img src={notif.avatar} alt="" className="size-[40px] rounded-full shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] leading-[14px] mb-[4px]">
                          {notif.title}
                          {notif.subtitle && <span className="font-normal text-[#5b5f61]"> {notif.subtitle}</span>}
                        </div>
                        <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] leading-[18px] line-clamp-2">{notif.message}</div>
                        <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px] mt-[4px]">{notif.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Requests */}
              <div className="bg-[#f9f9fc] border border-[#e4beb9] rounded-[12px] p-[17px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[20px] leading-[28px]">Yêu cầu đặt lịch mới</h3>
                  <div className="bg-[#b7131a] rounded-full px-[8px] py-[2px]">
                    <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-white text-[12px] leading-[16px]">2</span>
                  </div>
                </div>
                <div className="space-y-[12px]">
                  {bookingRequests.map((req, idx) => (
                    <div key={idx} className="bg-white border border-[#e4beb9] rounded-[8px] p-[12px]">
                      <div className="flex gap-[12px] mb-[8px]">
                        <div className="flex items-center justify-center rounded-full size-[40px] shrink-0" style={{ backgroundColor: req.bgColor }}>
                          <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[14px]" style={{ color: req.textColor }}>
                            {req.initials}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{req.name}</div>
                          <div className="font-['Be_Vietnam_Pro',sans-serif] font-normal text-[#5b5f61] text-[12px]">{req.tour}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-[8px] text-[12px] text-[#5b5f61] mb-[8px]">
                        <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                          <path d={svgPathsDashboard.pdc37d80} fill="#5B5F61" />
                        </svg>
                        <span className="font-['Be_Vietnam_Pro',sans-serif]">{req.date}</span>
                        <span>•</span>
                        <svg className="w-[12px] h-[13.467px]" fill="none" viewBox="0 0 12 13.4667">
                          <path d={svgPathsDashboard.p1ef9d00} fill="#5B5F61" />
                        </svg>
                        <span className="font-['Be_Vietnam_Pro',sans-serif]">{req.guests}</span>
                      </div>
                      <div className="flex gap-[8px]">
                        <button className="flex-1 bg-[#db322f] rounded-[8px] px-[12px] py-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[12px]">Chấp nhận</button>
                        <button className="flex-1 bg-white border border-[#e4beb9] rounded-[8px] px-[12px] py-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[12px]">Từ chối</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DashboardFooter title="C-TourGuide" description="Quản lý booking, lịch làm việc và thu nhập của guide." />
      </main>
    </div>
  );
}

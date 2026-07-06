import { Link } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";

const guideBookings = [
  { id: "CTG-482910", customer: "Lê Anh Tuấn", service: "Đánh hàng Quảng Châu", date: "20/08/2026", duration: "Cả ngày", status: "Chờ xác nhận", amount: "3.000.000đ" },
  { id: "CTG-482744", customer: "Nguyễn Hương", service: "City tour Thượng Hải", date: "22/08/2026", duration: "Nửa ngày", status: "Đã xác nhận", amount: "1.680.000đ" },
  { id: "CTG-481902", customer: "Trần Minh Khoa", service: "Phiên dịch công tác", date: "25/08/2026", duration: "Theo giờ", status: "Đã giữ chỗ", amount: "1.260.000đ" },
];

const calendarDays = [
  ["Thứ 2", "Rảnh", "09:00 - 18:00"],
  ["Thứ 3", "Đã có lịch", "Khách đi chợ Bạch Mã"],
  ["Thứ 4", "Rảnh", "13:00 - 20:00"],
  ["Thứ 5", "Tạm nghỉ", "Không nhận khách"],
  ["Thứ 6", "Đã có lịch", "Phiên dịch công tác"],
  ["Thứ 7", "Rảnh", "Cả ngày"],
  ["Chủ nhật", "Rảnh", "Cả ngày"],
];

function GuideShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9f9fc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <aside className="hidden w-[240px] border-r border-[#e4beb9] bg-white p-4 md:flex md:flex-col">
        <Link to="/" className="text-xl font-bold text-[#b7131a]">C-TourGuide</Link>
        <div className="mt-1 text-xs text-[#5b5f61]">Khu vực Local Guide</div>
        <nav className="mt-8 flex flex-col gap-2">
          {[
            ["/guide/dashboard", "Tổng quan"],
            ["/guide/bookings", "Booking"],
            ["/guide/calendar", "Lịch làm việc"],
            ["/guide/profile", "Hồ sơ guide"],
            ["/guide/verification", "Xác minh"],
            ["/guide/earnings", "Thu nhập"],
            ["/guide/messages", "Tin nhắn"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef] hover:text-[#b7131a]">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex-1 p-5 md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-[-0.05em]">{title}</h1>
              <p className="mt-2 text-[#5b5f61]">{description}</p>
            </div>
            <Link to="/guide/profile" className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Cập nhật hồ sơ</Link>
          </div>
          {children}
        </div>
        <DashboardFooter title="C-TourGuide Guide" description="Quản lý lịch nhận khách, booking, xác minh và thu nhập." />
      </main>
    </div>
  );
}

export function GuideOverviewPage() {
  return (
    <GuideShell title="Tổng quan guide" description="Theo dõi hiệu suất làm việc, booking mới, lịch sắp tới và trạng thái hồ sơ.">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Booking tháng này", "18", "+12%"],
          ["Thu nhập dự kiến", "45.2M", "VND"],
          ["Đánh giá", "4.9", "156 nhận xét"],
          ["Tỷ lệ phản hồi", "94%", "12 phút"],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-[#5b5f61]">{label}</div>
            <div className="mt-3 text-3xl font-bold">{value}</div>
            <div className="mt-1 text-sm text-[#5b5f61]">{sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Yêu cầu đặt lịch mới</h2>
            <Link to="/guide/bookings" className="font-bold text-[#b7131a]">Xem tất cả</Link>
          </div>
          <div className="mt-4 space-y-3">
            {guideBookings.slice(0, 2).map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-[#ece2e0] p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold">{booking.customer}</div>
                    <div className="mt-1 text-sm text-[#5b5f61]">{booking.service} · {booking.date}</div>
                  </div>
                  <span className="w-fit rounded-full bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#b7131a]">{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="rounded-3xl bg-[#fff1ef] p-6">
          <h2 className="text-xl font-bold">Trạng thái hồ sơ</h2>
          <div className="mt-4 space-y-3 text-sm text-[#5b403d]">
            <div className="rounded-xl bg-white p-4"><b>Xác minh danh tính</b><p className="mt-1">Đã hoàn tất</p></div>
            <div className="rounded-xl bg-white p-4"><b>Lịch nhận khách</b><p className="mt-1">Đang bật nhận khách</p></div>
            <div className="rounded-xl bg-white p-4"><b>Gợi ý</b><p className="mt-1">Cập nhật thêm ảnh chợ và video giới thiệu để tăng hiển thị.</p></div>
          </div>
        </aside>
      </div>
    </GuideShell>
  );
}

export function GuideBookingsPage() {
  return (
    <GuideShell title="Quản lý booking" description="Theo dõi yêu cầu mới, lịch đã xác nhận và trạng thái giữ chỗ của khách.">
      <div className="overflow-hidden rounded-3xl border border-[#ece2e0] bg-white shadow-sm">
        <div className="grid grid-cols-[1.1fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-[#ece2e0] bg-[#f8f3f2] px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#5b5f61]">
          <div>Mã booking</div><div>Khách</div><div>Dịch vụ</div><div>Ngày</div><div>Thời lượng</div><div>Trạng thái</div><div>Số tiền</div>
        </div>
        {guideBookings.map((booking) => (
          <div key={booking.id} className="grid grid-cols-[1.1fr_1fr_0.8fr_0.7fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-[#f2e8e6] px-5 py-4 text-sm last:border-0">
            <div className="font-bold text-[#b7131a]">{booking.id}</div>
            <div>{booking.customer}</div>
            <div>{booking.service}</div>
            <div>{booking.date}</div>
            <div>{booking.duration}</div>
            <div><span className="rounded-full bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#b7131a]">{booking.status}</span></div>
            <div className="font-bold">{booking.amount}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[["Tỷ lệ nhận lịch", "86%"], ["Thời gian phản hồi", "12 phút"], ["Booking tháng này", "18"]].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm"><div className="text-sm text-[#5b5f61]">{label}</div><div className="mt-2 text-3xl font-bold">{value}</div></div>
        ))}
      </div>
    </GuideShell>
  );
}

export function GuideCalendarPage() {
  return (
    <GuideShell title="Lịch làm việc" description="Bật/tắt khung giờ nhận khách, quản lý ngày nghỉ và lịch đã xác nhận.">
      <div className="grid gap-4 md:grid-cols-7">
        {calendarDays.map(([day, status, note]) => (
          <div key={day} className="rounded-2xl border border-[#ece2e0] bg-white p-5 shadow-sm">
            <div className="font-bold">{day}</div>
            <div className={`mt-4 w-fit rounded-full px-3 py-1 text-xs font-bold ${status === "Rảnh" ? "bg-[#e7f7ed] text-[#087443]" : status === "Tạm nghỉ" ? "bg-[#f2f2f4] text-[#5b5f61]" : "bg-[#fff1ef] text-[#b7131a]"}`}>{status}</div>
            <p className="mt-4 text-sm leading-6 text-[#5b403d]">{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Cài đặt nhận khách</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label><span className="mb-2 block font-semibold">Giờ bắt đầu</span><input type="time" defaultValue="09:00" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>
          <label><span className="mb-2 block font-semibold">Giờ kết thúc</span><input type="time" defaultValue="18:00" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" /></label>
          <label><span className="mb-2 block font-semibold">Trạng thái</span><select className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3"><option>Đang nhận khách</option><option>Tạm dừng nhận khách</option></select></label>
        </div>
      </div>
    </GuideShell>
  );
}

export function GuideProfileManagePage() {
  return (
    <GuideShell title="Hồ sơ guide" description="Cập nhật thông tin hiển thị, giá dịch vụ, chuyên môn và giới thiệu cá nhân.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            {['Tên hiển thị', 'Thành phố hoạt động', 'Ngôn ngữ', 'Chuyên môn chính', 'Giá theo giờ', 'Giá cả ngày'].map((field) => (
              <label key={field}><span className="mb-2 block font-semibold">{field}</span><input className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" placeholder={field} /></label>
            ))}
          </div>
          <label className="mt-4 block"><span className="mb-2 block font-semibold">Giới thiệu</span><textarea rows={6} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" defaultValue="Chuyên hỗ trợ khách Việt đi chợ đầu mối Quảng Châu, phiên dịch hỏi giá, kiểm mẫu và kết nối kho vận." /></label>
          <button className="mt-5 rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Lưu thay đổi</button>
        </form>
        <aside className="rounded-3xl bg-[#fff1ef] p-6">
          <h2 className="text-xl font-bold">Mẹo tăng hiển thị</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#5b403d]">
            <p>Hoàn thiện ảnh đại diện rõ mặt, mô tả kinh nghiệm theo thành phố và chuyên môn cụ thể.</p>
            <p>Cập nhật lịch rảnh thường xuyên để tăng tỷ lệ nhận booking.</p>
            <p>Phản hồi khách trong 15 phút giúp hồ sơ được ưu tiên hiển thị hơn.</p>
          </div>
        </aside>
      </div>
    </GuideShell>
  );
}

export function GuideVerificationPage() {
  const steps = [
    ["Xác minh giấy tờ", "CCCD/Hộ chiếu đã gửi, đang đối chiếu thông tin."],
    ["Xác minh nơi sinh sống", "Cần cập nhật địa chỉ hoặc giấy tờ cư trú tại Trung Quốc."],
    ["Kiểm tra kỹ năng", "Hoàn tất bài kiểm tra tình huống dịch Việt - Trung."],
    ["Duyệt hồ sơ", "Hồ sơ sẽ được hiển thị sau khi hoàn tất các bước trên."],
  ];
  return (
    <GuideShell title="Xác minh guide" description="Quản lý quy trình xác minh danh tính, khu vực sinh sống và năng lực hỗ trợ khách.">
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map(([title, desc], index) => (
          <div key={title} className="rounded-2xl border border-[#ece2e0] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b7131a] font-bold text-white">{index + 1}</div><h2 className="font-bold">{title}</h2></div>
            <p className="mt-4 text-sm leading-6 text-[#5b5f61]">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Tài liệu cần bổ sung</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {['Ảnh hộ chiếu/CCCD', 'Ảnh thẻ sinh viên hoặc giấy cư trú', 'Video giới thiệu 60 giây'].map((item) => <div key={item} className="rounded-xl border border-dashed border-[#d8c2bf] p-5 text-sm font-semibold text-[#5b403d]">{item}</div>)}
        </div>
      </div>
    </GuideShell>
  );
}

export function GuideEarningsPage() {
  const rows = [
    ["CTG-482744", "City tour Thượng Hải", "1.680.000đ", "Đã thanh toán"],
    ["CTG-481902", "Phiên dịch công tác", "1.260.000đ", "Chờ đối soát"],
    ["CTG-480118", "Đánh hàng Quảng Châu", "3.000.000đ", "Đã thanh toán"],
  ];
  return (
    <GuideShell title="Thu nhập" description="Theo dõi doanh thu, trạng thái đối soát và yêu cầu rút tiền của guide.">
      <div className="grid gap-4 md:grid-cols-3">
        {[["Số dư khả dụng", "12.8M"], ["Chờ đối soát", "4.2M"], ["Đã rút tháng này", "18.5M"]].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm"><div className="text-sm text-[#5b5f61]">{label}</div><div className="mt-2 text-3xl font-bold">{value} VND</div></div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Giao dịch gần đây</h2><button className="rounded-xl bg-[#b7131a] px-4 py-2 font-bold text-white">Yêu cầu rút tiền</button></div>
        <div className="mt-4 space-y-3">{rows.map(([id, service, amount, status]) => <div key={id} className="grid gap-3 rounded-2xl border border-[#ece2e0] p-4 md:grid-cols-4"><b>{id}</b><span>{service}</span><b>{amount}</b><span className="text-[#5b5f61]">{status}</span></div>)}</div>
      </div>
    </GuideShell>
  );
}

export function GuideMessagesPage() {
  return (
    <GuideShell title="Tin nhắn khách hàng" description="Trao đổi với khách trước chuyến đi, gửi vị trí hẹn và xác nhận yêu cầu đặc biệt.">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl bg-white p-5 shadow-sm">
          {['Lê Anh Tuấn', 'Nguyễn Hương', 'Trần Minh Khoa'].map((name, index) => <button key={name} className={`mb-3 w-full rounded-2xl p-4 text-left ${index === 0 ? 'bg-[#fff1ef]' : 'bg-[#f8f3f2]'}`}><b>{name}</b><p className="mt-1 text-sm text-[#5b5f61]">Đang trao đổi lịch trình...</p></button>)}
        </aside>
        <section className="flex h-[620px] flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-[#ece2e0] p-5"><h2 className="font-bold">Lê Anh Tuấn · Đánh hàng Quảng Châu</h2><p className="mt-1 text-sm text-[#5b5f61]">Tự động dịch Việt - Trung đang bật</p></div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
            <div className="max-w-[78%] rounded-2xl bg-[#f2f2f4] px-4 py-3">Anh muốn đi Bạch Mã trước hay Sha He trước ạ?</div>
            <div className="ml-auto max-w-[78%] rounded-2xl bg-[#b7131a] px-4 py-3 text-white">Mình muốn đi Bạch Mã trước, khoảng 8h30 có mặt được không?</div>
            <div className="max-w-[78%] rounded-2xl bg-[#f2f2f4] px-4 py-3">Được ạ. Em sẽ gửi vị trí hẹn ở cổng B ga Guangzhou Railway Station.</div>
          </div>
          <div className="border-t border-[#ece2e0] p-4"><input className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3" placeholder="Nhập tin nhắn..." /></div>
        </section>
      </div>
    </GuideShell>
  );
}

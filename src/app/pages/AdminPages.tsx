import { Link } from "react-router";
import { DashboardFooter } from "../components/layout/DashboardFooter";

const adminMenu = [
  ["/admin", "Tổng quan"],
  ["/admin/users", "Người dùng"],
  ["/admin/guides", "Duyệt guide"],
  ["/admin/bookings", "Booking"],
  ["/admin/reports", "Báo cáo"],
  ["/admin/partners", "Đối tác"],
  ["/revenue", "Doanh thu"],
];

const users = [
  ["Nguyễn Minh Anh", "Khách cá nhân", "minhanh@example.com", "Đã xác minh", "3 booking"],
  ["Phạm Khánh Linh", "Local Guide", "linh.guide@example.com", "Đã xác minh", "18 booking"],
  ["China Logistics Hub", "Đối tác", "ops@logihub.cn", "Chờ duyệt", "5 lead"],
  ["Trần Hoàng Nam", "Khách cá nhân", "nam@example.com", "Đang hoạt động", "1 booking"],
];

const guides = [
  ["Phạm Khánh Linh", "Quảng Châu", "Đánh hàng, mặc cả", "Đã xác minh", "4.8"],
  ["Lê Quốc Minh", "Thâm Quyến", "Linh kiện điện tử", "Đã xác minh", "4.9"],
  ["Vũ Minh Tuấn", "Nghĩa Ô", "Đồ gia dụng", "Chờ bổ sung giấy tờ", "4.7"],
  ["Hoàng Bảo Ngọc", "Thành Đô", "Tour gia đình", "Chờ duyệt", "4.8"],
];

const bookings = [
  ["CTG-482910", "Lê Anh Tuấn", "Phạm Khánh Linh", "Đánh hàng Quảng Châu", "Chờ guide xác nhận", "3.000.000đ"],
  ["CTG-482744", "Nguyễn Hương", "Trần Minh Hoàng", "City tour Bắc Kinh", "Đã giữ chỗ", "2.800.000đ"],
  ["CTG-481902", "Trần Minh Khoa", "Lê Quốc Minh", "Phiên dịch công tác", "Hoàn thành", "1.260.000đ"],
];

const reports = [
  ["RP-1092", "Khách phản ánh guide đến muộn", "Booking CTG-482744", "Đang xử lý", "Ưu tiên cao"],
  ["RP-1088", "Cửa hàng báo phí phát sinh", "Chợ Sha He", "Cần xác minh", "Trung bình"],
  ["RP-1081", "Yêu cầu hoàn tiền một phần", "Booking CTG-481902", "Đã phản hồi", "Cao"],
];

const partners = [
  ["China Logistics Hub", "Kho vận", "Quảng Châu", "Chờ duyệt", "12 yêu cầu"],
  ["Pearl Hotel Group", "Khách sạn", "Thượng Hải", "Đã duyệt", "8 yêu cầu"],
  ["Sino eSIM", "SIM/eSIM", "Toàn Trung Quốc", "Đã duyệt", "24 yêu cầu"],
];

function AdminShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f3f3f6] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <aside className="hidden w-[240px] border-r border-[#e2e2e5] bg-white p-4 md:flex md:flex-col">
        <Link to="/" className="text-xl font-bold text-[#b7131a]">C-TourGuide Admin</Link>
        <div className="mt-1 text-xs text-[#5b5f61]">Trung tâm quản trị</div>
        <nav className="mt-8 flex flex-col gap-2">
          {adminMenu.map(([to, label]) => (
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
            <Link to="/admin/reports" className="w-fit rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Xem báo cáo mới</Link>
          </div>
          {children}
        </div>
        <DashboardFooter title="C-TourGuide Admin" description="Quản trị người dùng, guide, booking, đối tác và báo cáo vận hành." />
      </main>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e2e2e5] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-[#f8f3f2] text-xs uppercase tracking-wide text-[#5b5f61]">
            <tr>{headers.map((header) => <th key={header} className="px-5 py-4 font-bold">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")} className="border-t border-[#f1e7e5]">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className="px-5 py-4">
                    {index === row.length - 2 ? <span className="rounded-full bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#b7131a]">{cell}</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminUsersPage() {
  return <AdminShell title="Quản lý người dùng" description="Theo dõi tài khoản khách cá nhân, guide, đối tác và trạng thái xác minh."><DataTable headers={["Tên", "Vai trò", "Email", "Trạng thái", "Hoạt động"]} rows={users} /></AdminShell>;
}

export function AdminGuidesPage() {
  return <AdminShell title="Duyệt và quản lý guide" description="Kiểm tra hồ sơ, chuyên môn, giấy tờ xác minh và chất lượng phục vụ của Local Guide."><DataTable headers={["Guide", "Thành phố", "Chuyên môn", "Trạng thái", "Điểm"]} rows={guides} /></AdminShell>;
}

export function AdminBookingsPage() {
  return <AdminShell title="Quản lý booking" description="Theo dõi booking, trạng thái giữ chỗ, hỗ trợ tranh chấp và lịch sử giao dịch."><DataTable headers={["Mã", "Khách", "Guide", "Dịch vụ", "Trạng thái", "Số tiền"]} rows={bookings} /></AdminShell>;
}

export function AdminReportsPage() {
  return <AdminShell title="Báo cáo và khiếu nại" description="Xử lý phản ánh, yêu cầu hoàn tiền, báo cáo hành vi vi phạm và tình huống cần hỗ trợ."><DataTable headers={["Mã", "Nội dung", "Liên quan", "Trạng thái", "Mức độ"]} rows={reports} /></AdminShell>;
}

export function AdminPartnersPage() {
  return <AdminShell title="Đối tác dịch vụ" description="Duyệt hồ sơ nhà bán hàng, khách sạn, kho vận, vé, SIM/eSIM và các dịch vụ liên kết."><DataTable headers={["Đối tác", "Loại hình", "Khu vực", "Trạng thái", "Lead"]} rows={partners} /></AdminShell>;
}

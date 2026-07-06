import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { PublicLayout } from "../components/layout/PublicLayout";
import { roleHomePath, saveSession as persistSession, type AccountRole } from "../lib/auth";

type AccountType = Exclude<AccountRole, "admin">;

const accountTypes: Record<AccountType, { title: string; description: string; fields: string[]; benefits: string[] }> = {
  traveler: {
    title: "Khách cá nhân",
    description: "Dành cho khách du lịch tự túc, người đi công tác hoặc dân buôn cần tìm guide tại Trung Quốc.",
    fields: ["Họ và tên", "Số điện thoại", "Email", "Thành phố dự định đến"],
    benefits: ["Đặt Local Guide", "Lưu lịch trình", "Chat song ngữ", "Theo dõi booking"],
  },
  guide: {
    title: "Local Guide",
    description: "Dành cho du học sinh, người Việt tại Trung Quốc hoặc hướng dẫn viên/phiên dịch viên địa phương.",
    fields: ["Họ và tên", "Số điện thoại", "Thành phố đang sinh sống", "Kinh nghiệm hoặc chuyên môn"],
    benefits: ["Nhận booking", "Quản lý lịch", "Theo dõi thu nhập", "Xác minh hồ sơ"],
  },
  merchant: {
    title: "Nhà bán hàng / Đối tác",
    description: "Dành cho khách sạn, nhà hàng, kho vận, đơn vị vé, SIM/eSIM, bảo hiểm hoặc dịch vụ hỗ trợ khách Việt.",
    fields: ["Tên doanh nghiệp", "Người liên hệ", "Số điện thoại", "Loại hình dịch vụ"],
    benefits: ["Hiển thị dịch vụ", "Nhận khách hàng tiềm năng", "Quản lý thông tin đối tác", "Kết nối với hành trình khách"],
  },
};

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("minhanh@example.com");
  const [password, setPassword] = useState("12345678");

  function saveSession(session: { email: string; name: string; role: AccountRole }) {
    persistSession(session);
    navigate(roleHomePath[session.role]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    saveSession({ email, name: "Nguyễn Minh Anh", role: "traveler" });
  }

  return (
    <PublicLayout>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <section className="rounded-3xl bg-[#b7131a] p-8 text-white md:p-10">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">C-TourGuide Account</span>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em]">Đăng nhập để tiếp tục hành trình</h1>
          <p className="mt-4 leading-7 text-white/85">Quản lý booking, chat với guide, lưu cẩm nang và theo dõi lịch trình tại Trung Quốc trong một tài khoản.</p>
          <div className="mt-8 grid gap-3 text-sm text-white/90">
            {['Booking và thanh toán minh bạch', 'Chat dịch Việt - Trung', 'Cảnh báo an toàn và hỗ trợ chuyến đi'].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 font-semibold">{item}</div>
            ))}
          </div>
        </section>

        <form onSubmit={submit} className="rounded-3xl border border-[#ece2e0] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-bold tracking-[-0.04em]">Đăng nhập</h2>
          <p className="mt-2 text-[#5b5f61]">Sử dụng email hoặc số điện thoại đã đăng ký.</p>
          <div className="mt-6 grid gap-4">
            <label>
              <span className="mb-2 block font-semibold">Email hoặc số điện thoại</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" />
            </label>
            <label>
              <span className="mb-2 block font-semibold">Mật khẩu</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" />
            </label>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-[#5b403d]"><input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập</label>
            <Link to="/register" className="font-semibold text-[#b7131a]">Tạo tài khoản</Link>
          </div>
          <button className="mt-6 w-full rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white hover:bg-[#9f1016]">Đăng nhập</button>
          <div className="mt-6 rounded-2xl bg-[#f8f3f2] p-4">
            <div className="text-sm font-bold text-[#1a1c1e]">Đăng nhập nhanh</div>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <button type="button" onClick={() => saveSession({ email: "khach@example.com", name: "Nguyễn Minh Anh", role: "traveler" })} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">Khách cá nhân</button>
              <button type="button" onClick={() => saveSession({ email: "guide@example.com", name: "Phạm Khánh Linh", role: "guide" })} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">Local Guide</button>
              <button type="button" onClick={() => saveSession({ email: "partner@example.com", name: "China Logistics Hub", role: "merchant" })} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">Đối tác</button>
              <button type="button" onClick={() => saveSession({ email: "admin@example.com", name: "Admin C-TourGuide", role: "admin" })} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">Admin</button>
            </div>
          </div>
        </form>
      </main>
    </PublicLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("traveler");
  const selected = accountTypes[accountType];

  function submit(event: FormEvent) {
    event.preventDefault();
    window.localStorage.setItem("ctourguide.registration", JSON.stringify({ accountType, submittedAt: new Date().toISOString() }));
    if (accountType === "guide") navigate("/guide-register");
    else if (accountType === "merchant") navigate("/partner/profile");
    else navigate("/guides");
  }

  return (
    <PublicLayout>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="max-w-3xl">
          <span className="rounded-full bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#b7131a]">Tạo tài khoản</span>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em]">Chọn loại tài khoản phù hợp</h1>
          <p className="mt-3 text-[#5b5f61]">C-TourGuide phân tách quyền lợi và thông tin đầu vào theo từng nhóm người dùng để vận hành minh bạch hơn.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="space-y-3">
            {(Object.keys(accountTypes) as AccountType[]).map((type) => {
              const item = accountTypes[type];
              return (
                <button key={type} onClick={() => setAccountType(type)} className={`w-full rounded-2xl border p-5 text-left transition ${accountType === type ? "border-[#b7131a] bg-[#fff1ef]" : "border-[#ece2e0] bg-white hover:border-[#b7131a]"}`}>
                  <div className="font-bold">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-[#5b5f61]">{item.description}</p>
                </button>
              );
            })}
          </aside>

          <form onSubmit={submit} className="rounded-3xl border border-[#ece2e0] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.04em]">{selected.title}</h2>
                <p className="mt-2 max-w-2xl text-[#5b5f61]">{selected.description}</p>
              </div>
              <Link to="/login" className="font-semibold text-[#b7131a]">Đã có tài khoản?</Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {selected.fields.map((field) => (
                <label key={field}>
                  <span className="mb-2 block font-semibold">{field}</span>
                  <input className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder={field} required />
                </label>
              ))}
              <label>
                <span className="mb-2 block font-semibold">Mật khẩu</span>
                <input type="password" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder="Tối thiểu 8 ký tự" required />
              </label>
              <label>
                <span className="mb-2 block font-semibold">Xác nhận mật khẩu</span>
                <input type="password" className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder="Nhập lại mật khẩu" required />
              </label>
            </div>

            <div className="mt-6 rounded-2xl bg-[#f8f3f2] p-5">
              <h3 className="font-bold">Quyền lợi chính</h3>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {selected.benefits.map((benefit) => <div key={benefit} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#5b403d]">{benefit}</div>)}
              </div>
            </div>

            <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#5b403d]">
              <input required type="checkbox" className="mt-1" /> Tôi đồng ý với điều khoản sử dụng, chính sách bảo mật và quy trình xác minh phù hợp với loại tài khoản đã chọn.
            </label>
            <button className="mt-6 rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white hover:bg-[#9f1016]">Tạo tài khoản</button>
          </form>
        </div>
      </main>
    </PublicLayout>
  );
}

export function PartnerOnboardingPage() {
  return (
    <PublicLayout>
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <div className="rounded-3xl border border-[#ece2e0] bg-white p-6 shadow-sm md:p-8">
          <span className="rounded-full bg-[#e7f4f8] px-3 py-1 text-xs font-bold text-[#006578]">Đối tác dịch vụ</span>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Hoàn thiện hồ sơ nhà bán hàng / đối tác</h1>
          <p className="mt-3 text-[#5b5f61]">Cập nhật thông tin pháp lý, loại hình dịch vụ, khu vực phục vụ và đầu mối vận hành để C-TourGuide xét duyệt hiển thị.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {['Tên pháp nhân hoặc thương hiệu', 'Mã số đăng ký kinh doanh', 'Loại hình dịch vụ', 'Thành phố/khu vực phục vụ', 'Người phụ trách vận hành', 'Email liên hệ'].map((field) => (
              <label key={field}>
                <span className="mb-2 block font-semibold">{field}</span>
                <input className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder={field} />
              </label>
            ))}
          </div>
          <button className="mt-6 rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white">Gửi hồ sơ đối tác</button>
        </div>
      </main>
    </PublicLayout>
  );
}

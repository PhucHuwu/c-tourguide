import { Link } from "react-router";
import { markets } from "../data/mock";
import { PublicLayout } from "../components/layout/PublicLayout";
import heroImage from "@/assets/generated/sourcing-logistics/sourcing-hero.png";

export function SourcingPage() {
  return (
    <PublicLayout>
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1fr_0.9fr] md:px-8 md:py-16">
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#b7131a]">Dành cho dân buôn Việt</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.05em] md:text-6xl">
              Đi Trung Quốc đánh hàng dễ hơn
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5b403d]">
              Tìm chợ đầu mối, thuê guide biết mặc cả, kiểm mẫu và kết nối kho vận về Việt Nam qua các đối tác tin cậy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/markets" className="rounded-xl bg-[#b7131a] px-6 py-3 font-bold text-white hover:bg-[#9f1016]">
                Xem danh sách chợ
              </Link>
              <Link to="/guides?service=sourcing" className="rounded-xl border border-[#b7131a] px-6 py-3 font-bold text-[#b7131a] hover:bg-[#fff1ef]">
                Tìm guide đánh hàng
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-[#5b403d]/15">
            <img src={heroImage} alt="Dịch vụ hỗ trợ đánh hàng tại Trung Quốc" className="h-full min-h-[360px] w-full object-cover" />
          </div>
        </section>

        <section className="bg-[#f8f3f2] py-14">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-[-0.04em]">Quy trình hỗ trợ đánh hàng</h2>
              <p className="mt-3 text-[#5b5f61]">Từ chuẩn bị danh sách sản phẩm đến đi chợ, hỏi giá, kiểm mẫu và gửi hàng về kho.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["1", "Chọn ngành hàng", "Xác định chợ phù hợp với sản phẩm, ngân sách và số lượng dự kiến."],
                ["2", "Đặt guide", "Chọn guide có kinh nghiệm mặc cả và hiểu thuật ngữ ngành hàng."],
                ["3", "Đi chợ & kiểm mẫu", "Hỏi MOQ, kiểm chất liệu, size, bao bì, điều kiện đổi trả."],
                ["4", "Kết nối kho vận", "Ghi nhận thông tin gian hàng và gửi hàng về kho đối tác."],
              ].map(([step, title, desc]) => (
                <article key={step} className="rounded-2xl border border-[#f0d8d5] bg-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b7131a] font-bold text-white">{step}</div>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b5f61]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.04em]">Chợ đầu mối nổi bật</h2>
              <p className="mt-3 text-[#5b5f61]">Các khu chợ được nhiều khách Việt quan tâm khi đi tìm nguồn hàng.</p>
            </div>
            <Link to="/markets" className="hidden font-bold text-[#b7131a] md:block">Xem tất cả</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {markets.slice(0, 6).map((market) => (
              <Link key={market.id} to={`/markets/${market.id}`} className="overflow-hidden rounded-2xl border border-[#ece2e0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <img src={market.image} alt={market.name} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <span className="rounded-full bg-[#e7f4f8] px-3 py-1 text-xs font-bold text-[#006578]">{market.category}</span>
                  <h3 className="mt-3 text-xl font-bold">{market.name}</h3>
                  <p className="mt-2 text-sm text-[#5b5f61]">{market.city} · {market.hours}</p>
                  <p className="mt-3 text-sm leading-6 text-[#5b403d]">{market.suitableFor}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-[#1a1c1e] py-14 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Logistics và khai báo</span><h2 className="mt-4 text-3xl font-bold tracking-[-0.04em]">Không chỉ đi chợ, còn cần gom hàng đúng cách</h2><p className="mt-4 leading-8 text-white/75">Dân buôn cần quản lý kiện hàng, địa chỉ kho, mô tả hàng hóa, hóa đơn, ảnh mẫu và các lưu ý khi vận chuyển hàng dễ vỡ, mỹ phẩm, linh kiện điện tử hoặc đồ trẻ em.</p><Link to="/handbook/customs-declaration" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-bold text-[#b7131a]">Xem checklist khai báo hàng hóa</Link></div>
            <div className="grid gap-4 sm:grid-cols-2">{[["Địa chỉ kho", "Lưu kho nhận hàng, người nhận, số điện thoại và mã khách."], ["Đóng hàng", "Chụp ảnh trước khi đóng, niêm phong, ghi trọng lượng và số kiện."], ["Khai báo hàng hóa", "Mô tả đúng ngành hàng, số lượng, chất liệu, giá trị và lưu hóa đơn."], ["Đối tác vận chuyển", "So sánh SLA, tuyến vận chuyển, phụ phí và chính sách bồi hoàn."]].map(([title, desc]) => <div key={title} className="rounded-3xl bg-white/10 p-5 backdrop-blur"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{desc}</p></div>)}</div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

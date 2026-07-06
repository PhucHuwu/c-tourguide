import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router";
import { PublicLayout } from "../components/layout/PublicLayout";
import { getSession } from "../lib/auth";

type PaymentMethod = "wechat" | "alipay" | "service" | "train" | "ticket" | "hotel";

const exchangeRate = 3540;
const historySeed = [
  ["PAY-9021", "Nạp WeChat Pay", "2.000.000đ", "564.9 CNY", "Đã xử lý"],
  ["PAY-9014", "Vé tàu Quảng Châu - Thâm Quyến", "680.000đ", "192.1 CNY", "Chờ xác nhận"],
  ["PAY-8997", "Đặt cọc guide", "1.000.000đ", "282.4 CNY", "Hoàn tất"],
];

export function PaymentPage() {
  const [session] = useState(() => getSession());
  const [method, setMethod] = useState<PaymentMethod>("wechat");
  const [amount, setAmount] = useState("2000000");
  const [history, setHistory] = useState(historySeed);
  const [submitted, setSubmitted] = useState("");
  const vnd = Number(amount) || 0;
  const fee = Math.max(Math.round(vnd * 0.018), 25000);
  const cny = useMemo(() => Math.max((vnd - fee) / exchangeRate, 0), [fee, vnd]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    const labels: Record<PaymentMethod, string> = { wechat: "Nạp WeChat Pay", alipay: "Nạp Alipay", service: "Thanh toán dịch vụ tại Trung Quốc", train: "Thanh toán vé tàu", ticket: "Thanh toán vé tham quan", hotel: "Thanh toán khách sạn" };
    const label = labels[method];
    const id = `PAY-${Date.now().toString().slice(-4)}`;
    setHistory((current) => [[id, label, `${vnd.toLocaleString("vi-VN")}đ`, `${cny.toFixed(1)} CNY`, "Đang kiểm tra"], ...current]);
    setSubmitted(`Đã tạo yêu cầu ${label}. Bộ phận vận hành sẽ kiểm tra thông tin trước khi xử lý.`);
  }

  return (
    <PublicLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {!session && (
          <section className="mb-8 rounded-3xl border border-[#f0d8d5] bg-[#fff8f7] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-[-0.04em] text-[#b7131a]">Đăng nhập để sử dụng chức năng thanh toán</h1>
                <p className="mt-3 max-w-3xl text-[#5b403d]">Các yêu cầu nạp WeChat Pay, Alipay, đổi tiền hoặc thanh toán dịch vụ tại Trung Quốc cần tài khoản để lưu lịch sử giao dịch, kiểm tra thông tin và hỗ trợ đối soát.</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link to="/login" className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Đăng nhập</Link>
                <Link to="/register" className="rounded-xl border border-[#b7131a] px-5 py-3 font-bold text-[#b7131a]">Tạo tài khoản</Link>
              </div>
            </div>
          </section>
        )}
        <section className="rounded-3xl bg-[#1a1c1e] p-8 text-white md:p-10">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Thanh toán Trung Quốc</span>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-6xl">Hỗ trợ nạp ví, đổi tiền và thanh toán dịch vụ địa phương</h1>
          <p className="mt-4 max-w-3xl leading-8 text-white/75">Dành cho khách Việt gặp khó khăn với WeChat Pay, Alipay, vé tàu, vé tham quan, khách sạn hoặc dịch vụ tại Trung Quốc. Mọi yêu cầu cần được kiểm tra thủ công và tuân thủ quy định pháp luật liên quan.</p>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]">
            <h2 className="text-2xl font-bold">Tạo yêu cầu thanh toán</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[["wechat", "Nạp WeChat Pay"], ["alipay", "Nạp Alipay"], ["service", "Thanh toán dịch vụ"], ["train", "Vé tàu"], ["ticket", "Vé tham quan"], ["hotel", "Khách sạn"]].map(([value, label]) => <button key={value} disabled={!session} onClick={() => setMethod(value as PaymentMethod)} className={`rounded-2xl p-4 text-left font-bold disabled:opacity-60 ${method === value ? "bg-[#b7131a] text-white" : "bg-[#f8f3f2] text-[#5b403d]"}`}>{label}</button>)}
            </div>
            <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
              <label><span className="mb-2 block font-semibold">Số tiền VNĐ</span><input value={amount} onChange={(event) => setAmount(event.target.value)} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" /></label>
              <label><span className="mb-2 block font-semibold">Tài khoản nhận / mã dịch vụ</span><input className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder="WeChat ID, Alipay ID, mã vé hoặc booking" required /></label>
              <label className="md:col-span-2"><span className="mb-2 block font-semibold">Ghi chú xử lý</span><textarea rows={4} className="w-full rounded-xl border border-[#e2e2e5] px-4 py-3 outline-none focus:border-[#b7131a]" placeholder="Ví dụ: cần thanh toán trước 18:00, gửi ảnh QR, số hộ chiếu nếu mua vé..." /></label>
              <label className="flex items-start gap-3 text-sm leading-6 text-[#5b403d] md:col-span-2"><input required type="checkbox" className="mt-1" /> Tôi hiểu đây là dịch vụ cần kiểm tra điều kiện pháp lý, hạn mức, nguồn tiền và quy định ngoại hối tại Việt Nam/Trung Quốc trước khi xử lý.</label>
              {session ? <button className="rounded-xl bg-[#b7131a] px-5 py-3 font-bold text-white">Gửi yêu cầu</button> : <Link to="/login" className="rounded-xl bg-[#b7131a] px-5 py-3 text-center font-bold text-white">Đăng nhập để gửi</Link>}
            </form>
            {submitted && <div className="mt-5 rounded-2xl bg-[#e7f7ed] p-4 font-bold text-[#087443]">{submitted}</div>}
          </section>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-[#fff1ef] p-6">
              <h2 className="text-xl font-bold">Ước tính quy đổi</h2>
              <div className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><span>Tỷ giá tham khảo</span><b>1 CNY = {exchangeRate.toLocaleString("vi-VN")}đ</b></div><div className="flex justify-between"><span>Phí dịch vụ</span><b>{fee.toLocaleString("vi-VN")}đ</b></div><div className="flex justify-between text-lg"><span>Nhận dự kiến</span><b>{cny.toFixed(1)} CNY</b></div></div>
            </div>
            <div className="rounded-3xl border border-[#ece2e0] bg-white p-6"><h2 className="text-xl font-bold">Có thể dùng cho</h2><div className="mt-4 flex flex-wrap gap-2">{["WeChat Pay", "Alipay", "Vé tàu", "Vé tham quan", "Khách sạn", "eSIM", "Đặt cọc guide"].map((item) => <span key={item} className="rounded-full bg-[#f8f3f2] px-3 py-2 text-sm font-bold text-[#5b403d]">{item}</span>)}</div></div>
            <div className="rounded-3xl bg-[#fff4d8] p-6 text-sm leading-6 text-[#5b403d]"><b>Lưu ý pháp lý:</b> mọi giao dịch hỗ trợ thanh toán, nạp ví hoặc đổi tiền phải được kiểm tra theo quy định về trung gian thanh toán, ngoại hối, phòng chống rửa tiền và quy định tại Việt Nam/Trung Quốc. C-TourGuide chỉ xử lý khi đủ điều kiện hợp lệ.</div>
            <Link to="/handbook/china-payment" className="block rounded-3xl bg-[#e7f4f8] p-6 font-bold text-[#006578]">Đọc cẩm nang thanh toán tại Trung Quốc →</Link>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ece2e0]">
          <h2 className="text-2xl font-bold">Lịch sử giao dịch</h2>
          <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-[#f8f3f2] text-xs uppercase tracking-wide text-[#5b5f61]"><tr>{["Mã", "Nội dung", "VNĐ", "CNY", "Trạng thái"].map((head) => <th key={head} className="px-5 py-4">{head}</th>)}</tr></thead><tbody>{history.map((row) => <tr key={row[0]} className="border-t border-[#f1e7e5]">{row.map((cell) => <td key={cell} className="px-5 py-4 font-semibold">{cell}</td>)}</tr>)}</tbody></table></div>
        </section>
      </main>
    </PublicLayout>
  );
}

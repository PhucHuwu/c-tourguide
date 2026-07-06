import { useMemo, useState } from "react";
import { Link } from "react-router";
import mapPlaceholder from "@/assets/generated/map/map-placeholder.png";
import marketImage from "@/assets/generated/map/market.png";

type PlaceType = "market" | "metro" | "atm" | "hospital" | "restroom";

type Place = {
  id: string;
  name: string;
  type: PlaceType;
  district: string;
  image: string;
  metro: string;
  hours: string;
  note: string;
};

const places: Place[] = [
  {
    id: "baima",
    name: "Chợ Bạch Mã",
    type: "market",
    district: "Yuexiu, Quảng Châu",
    image: marketImage,
    metro: "Ga Guangzhou Railway Station, Line 2/5",
    hours: "08:00 - 18:00",
    note: "Phù hợp tìm nguồn quần áo trung - cao cấp, nên đi cùng guide nếu lần đầu mặc cả.",
  },
  {
    id: "shahe",
    name: "Chợ Sha He",
    type: "market",
    district: "Tianhe, Quảng Châu",
    image: marketImage,
    metro: "Ga Shaheding, Line 6",
    hours: "06:00 - 15:00",
    note: "Nguồn hàng giá tốt, đông vào buổi sáng, cần kiểm hàng kỹ trước khi gửi kho.",
  },
  {
    id: "atm-railway",
    name: "ATM gần ga Quảng Châu",
    type: "atm",
    district: "Guangzhou Railway Station",
    image: marketImage,
    metro: "Cổng B ga Guangzhou Railway Station",
    hours: "24/7",
    note: "Nên kiểm tra phí rút tiền quốc tế trước khi sử dụng.",
  },
  {
    id: "hospital-yuexiu",
    name: "Bệnh viện Yuexiu",
    type: "hospital",
    district: "Yuexiu, Quảng Châu",
    image: marketImage,
    metro: "Line 2, cách chợ Bạch Mã khoảng 12 phút taxi",
    hours: "24/7",
    note: "Lưu số hộ chiếu, bảo hiểm và liên hệ khẩn cấp trước khi đi.",
  },
];

const filters: { id: PlaceType | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "market", label: "Chợ đầu mối" },
  { id: "metro", label: "Metro" },
  { id: "atm", label: "ATM" },
  { id: "hospital", label: "Bệnh viện" },
  { id: "restroom", label: "Nhà vệ sinh" },
];

export function MapPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PlaceType | "all">("all");
  const [selectedTransit, setSelectedTransit] = useState<"metro" | "taxi" | "walk">("metro");
  const [offlineDownloaded, setOfflineDownloaded] = useState(false);
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesFilter = filter === "all" || place.type === filter;
      const matchesQuery = `${place.name} ${place.district} ${place.note}`.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);
  const [selectedId, setSelectedId] = useState(places[0].id);
  const selectedPlace = places.find((place) => place.id === selectedId) || filteredPlaces[0] || places[0];

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdfc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <header className="sticky top-0 z-50 border-b border-[#f0d8d5] bg-white/95 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#b7131a]">C-TourGuide</Link>
          <nav className="hidden gap-6 text-sm font-semibold text-[#5b5f61] md:flex">
            <Link to="/guides">Tìm guide</Link>
            <Link to="/markets">Đánh hàng</Link>
            <Link to="/handbook">Cẩm nang</Link>
            <Link to="/ai">Trợ lý AI</Link>
          </nav>
          <Link to="/guide-register" className="rounded-xl bg-[#b7131a] px-4 py-2 text-sm font-bold text-white">Đăng ký làm guide</Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-8 md:grid-cols-[340px_1fr_340px] md:px-8">
        <aside className="rounded-3xl bg-[#f8f3f2] p-5">
          <h1 className="text-2xl font-bold">Bản đồ Trung Quốc</h1>
          <p className="mt-2 text-sm leading-6 text-[#5b5f61]">Mock map dành cho khách Việt: chợ, metro, ATM, bệnh viện và điểm tiện ích.</p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm Bạch Mã, ATM, bệnh viện..."
            className="mt-5 w-full rounded-xl border border-[#e2e2e5] bg-white px-4 py-3 outline-none focus:border-[#b7131a]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button key={item.id} onClick={() => setFilter(item.id)} className={`rounded-full px-3 py-2 text-xs font-bold ${filter === item.id ? "bg-[#b7131a] text-white" : "bg-white text-[#5b403d]"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {filteredPlaces.length ? filteredPlaces.map((place) => (
              <button key={place.id} onClick={() => setSelectedId(place.id)} className={`w-full rounded-2xl p-4 text-left shadow-sm ${selectedPlace.id === place.id ? "bg-[#fff1ef] ring-2 ring-[#b7131a]" : "bg-white"}`}>
                <div className="font-bold">{place.name}</div>
                <div className="mt-1 text-sm text-[#5b5f61]">{place.district}</div>
              </button>
            )) : <div className="rounded-2xl border border-dashed border-[#dfc9c6] p-5 text-center text-sm text-[#5b5f61]">Không có địa điểm phù hợp.</div>}
          </div>
          <div className="mt-5 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-bold">Bản đồ offline Quảng Châu</div>
                <div className="mt-1 text-xs text-[#5b5f61]">145 MB · cập nhật hôm nay</div>
              </div>
              <button onClick={() => setOfflineDownloaded(true)} className="rounded-xl bg-[#b7131a] px-4 py-2 text-xs font-bold text-white">
                {offlineDownloaded ? "Đã tải" : "Tải"}
              </button>
            </div>
          </div>
        </aside>

        <section className="relative min-h-[560px] overflow-hidden rounded-3xl border border-[#ece2e0] bg-[#e8e8ec] shadow-sm">
          <img src={mapPlaceholder} alt="Bản đồ mock Quảng Châu" className="h-full min-h-[560px] w-full object-cover" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full rounded-full bg-[#b7131a] px-4 py-3 font-bold text-white shadow-xl">
            {selectedPlace.name}
          </div>
          <div className="absolute left-5 top-5 rounded-2xl bg-white/95 p-4 shadow-lg">
            <div className="text-sm font-bold">Dịch Trung - Việt đang bật</div>
            <div className="mt-1 text-xs text-[#5b5f61]">Tên địa điểm và ghi chú đã được Việt hóa.</div>
          </div>
        </section>

        <aside className="rounded-3xl border border-[#ece2e0] bg-white p-5 shadow-sm">
          <img src={selectedPlace.image} alt={selectedPlace.name} className="h-44 w-full rounded-2xl object-cover" />
          <h2 className="mt-5 text-2xl font-bold">{selectedPlace.name}</h2>
          <p className="mt-1 text-sm text-[#5b5f61]">{selectedPlace.district}</p>
          <div className="mt-5 space-y-3 text-sm">
            <div className="rounded-2xl bg-[#f8f3f2] p-4"><b>Ga gần nhất</b><p className="mt-1 text-[#5b403d]">{selectedPlace.metro}</p></div>
            <div className="rounded-2xl bg-[#f8f3f2] p-4"><b>Giờ hoạt động</b><p className="mt-1 text-[#5b403d]">{selectedPlace.hours}</p></div>
            <div className="rounded-2xl bg-[#f8f3f2] p-4"><b>Lưu ý</b><p className="mt-1 leading-6 text-[#5b403d]">{selectedPlace.note}</p></div>
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Chỉ đường mock</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["metro", "Metro"],
                ["taxi", "Taxi"],
                ["walk", "Đi bộ"],
              ].map(([value, label]) => (
                <button key={value} onClick={() => setSelectedTransit(value as "metro" | "taxi" | "walk")} className={`rounded-xl px-3 py-2 text-sm font-bold ${selectedTransit === value ? "bg-[#b7131a] text-white" : "bg-[#f2f2f4] text-[#5b403d]"}`}>
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-[#f0d8d5] p-4 text-sm leading-6 text-[#5b403d]">
              {selectedTransit === "metro" && "Gợi ý: đi metro đến ga gần nhất, sau đó đi bộ 6-10 phút. Phù hợp nếu bạn mang ít hàng."}
              {selectedTransit === "taxi" && "Gợi ý: dùng địa chỉ tiếng Trung từ guide, xác nhận cổng vào trước khi xuống xe."}
              {selectedTransit === "walk" && "Gợi ý: chỉ nên đi bộ nếu bạn đang ở khu chợ lân cận và không mang kiện hàng lớn."}
            </div>
          </div>
        </aside>
      </main>
      <footer className="mt-auto border-t border-[#f0d8d5] bg-[#f8f3f2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-xl font-bold text-[#b7131a]">C-TourGuide</div>
            <p className="mt-1 text-sm text-[#5b5f61]">Bản đồ mock hỗ trợ di chuyển, tìm chợ và tiện ích tại Trung Quốc.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#5b5f61]">
            <Link to="/guides">Tìm guide</Link>
            <Link to="/ai">Trợ lý AI</Link>
            <Link to="/safety">An toàn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

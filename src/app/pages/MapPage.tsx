import { useMemo, useState } from "react";
import marketImage from "@/assets/generated/map/market.png";
import { PublicLayout } from "../components/layout/PublicLayout";

type PlaceType = "market" | "metro" | "atm" | "hospital" | "restroom" | "airport" | "attraction" | "restaurant";

type Place = {
  id: string;
  name: string;
  type: PlaceType;
  district: string;
  image: string;
  metro: string;
  hours: string;
  note: string;
  mapQuery: string;
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
    mapQuery: "Baima Clothing Wholesale Market Guangzhou China",
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
    mapQuery: "Shahe Clothing Wholesale Market Guangzhou China",
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
    mapQuery: "Guangzhou Railway Station ATM China",
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
    mapQuery: "Yuexiu Hospital Guangzhou China",
  },
  { id: "baiyun-airport", name: "Sân bay Bạch Vân", type: "airport", district: "Baiyun, Quảng Châu", image: marketImage, metro: "Airport South/North, Line 3", hours: "24/7", note: "Nên lưu terminal và cửa ra trước khi đặt xe hoặc hẹn guide.", mapQuery: "Guangzhou Baiyun International Airport" },
  { id: "canton-tower", name: "Canton Tower", type: "attraction", district: "Haizhu, Quảng Châu", image: marketImage, metro: "Ga Canton Tower, Line 3/APM", hours: "09:30 - 22:30", note: "Đi buổi chiều tối đẹp hơn, nên mua vé trước vào mùa cao điểm.", mapQuery: "Canton Tower Guangzhou" },
  { id: "restroom-baima", name: "Nhà vệ sinh gần Bạch Mã", type: "restroom", district: "Yuexiu, Quảng Châu", image: marketImage, metro: "Trong khu thương mại gần cổng chính", hours: "Theo giờ chợ", note: "Nên hỏi bảo vệ hoặc guide vì lối vào có thể thay đổi theo tầng.", mapQuery: "Baima Market Guangzhou restroom" },
  { id: "viet-restaurant", name: "Nhà hàng Việt tại Quảng Châu", type: "restaurant", district: "Yuexiu, Quảng Châu", image: marketImage, metro: "Khu Beijing Road / Yuexiu", hours: "10:00 - 22:00", note: "Phù hợp khách cần bữa ăn dễ ăn sau khi đi chợ hoặc công tác.", mapQuery: "Vietnamese restaurant Guangzhou Yuexiu" },
];

const filters: { id: PlaceType | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "market", label: "Chợ đầu mối" },
  { id: "metro", label: "Metro" },
  { id: "atm", label: "ATM" },
  { id: "hospital", label: "Bệnh viện" },
  { id: "restroom", label: "Nhà vệ sinh" },
  { id: "airport", label: "Sân bay" },
  { id: "attraction", label: "Tham quan" },
  { id: "restaurant", label: "Nhà hàng Việt" },
];

export function MapPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PlaceType | "all">("all");
  const [selectedTransit, setSelectedTransit] = useState<"metro" | "taxi" | "walk">("metro");
  const [offlineDownloaded, setOfflineDownloaded] = useState(false);
  const [mapMode, setMapMode] = useState<"google" | "china">("google");
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesFilter = filter === "all" || place.type === filter;
      const matchesQuery = `${place.name} ${place.district} ${place.note}`.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);
  const [selectedId, setSelectedId] = useState(places[0].id);
  const selectedPlace = places.find((place) => place.id === selectedId) || filteredPlaces[0] || places[0];
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(selectedPlace.mapQuery)}&output=embed`;
  const directionsSrc = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedPlace.mapQuery)}&travelmode=${selectedTransit === "metro" ? "transit" : selectedTransit === "taxi" ? "driving" : "walking"}`;

  return (
    <PublicLayout>
      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-8 md:grid-cols-[340px_1fr_340px] md:px-8">
        <aside className="rounded-3xl bg-[#f8f3f2] p-5">
          <h1 className="text-2xl font-bold">Bản đồ Trung Quốc</h1>
          <p className="mt-2 text-sm leading-6 text-[#5b5f61]">Bản đồ dành cho khách Việt: chợ, metro, ATM, bệnh viện và điểm tiện ích.</p>
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
          {mapMode === "google" ? <iframe key={selectedPlace.id} title={`Google Maps - ${selectedPlace.name}`} src={mapSrc} className="h-full min-h-[560px] w-full border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /> : <div className="flex h-full min-h-[560px] flex-col justify-between bg-[#dfeff2] p-6"><div><div className="rounded-3xl bg-white/90 p-5 shadow-xl"><h2 className="text-2xl font-bold">Bản đồ nội địa Trung Quốc</h2><p className="mt-2 text-sm text-[#5b5f61]">Chế độ mô phỏng Baidu/Amap: ưu tiên tên địa điểm tiếng Trung, ga metro, chợ đầu mối và chỉ dẫn taxi.</p></div></div><div className="mx-auto rounded-full bg-[#b7131a] px-5 py-3 font-bold text-white shadow-xl">{selectedPlace.name}</div><div className="grid gap-3 md:grid-cols-3">{["Metro gần nhất", "Gọi taxi", "Lưu offline"].map((item) => <div key={item} className="rounded-2xl bg-white/90 p-4 font-bold text-[#006578] shadow">{item}</div>)}</div></div>}
          <div className="absolute left-5 top-5 rounded-2xl bg-white/95 p-4 shadow-lg">
            <div className="text-sm font-bold">{selectedPlace.name}</div>
            <div className="mt-1 text-xs text-[#5b5f61]">Đang xem trên Google Maps.</div>
            <div className="mt-3 flex gap-2"><button onClick={() => setMapMode("google")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mapMode === "google" ? "bg-[#b7131a] text-white" : "bg-[#f2f2f4]"}`}>Google</button><button onClick={() => setMapMode("china")} className={`rounded-lg px-3 py-2 text-xs font-bold ${mapMode === "china" ? "bg-[#006578] text-white" : "bg-[#f2f2f4]"}`}>Nội địa</button></div>
            <a href={directionsSrc} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-xl bg-[#b7131a] px-4 py-2 text-xs font-bold text-white">
              Mở chỉ đường
            </a>
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
            <h3 className="font-bold">Chỉ đường</h3>
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
            <a href={directionsSrc} target="_blank" rel="noreferrer" className="mt-3 block rounded-xl bg-[#b7131a] px-4 py-3 text-center font-bold text-white">
              Mở Google Maps
            </a>
          </div>
        </aside>
      </main>
    </PublicLayout>
  );
}

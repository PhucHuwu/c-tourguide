import { Link } from "react-router";
import { useState } from "react";
import svgPathsMap from "@/assets/generated/map/svg-paths";
import mapPlaceholder from "@/assets/generated/map/map-placeholder.png";
import marketImage from "@/assets/generated/map/market.png";

const places = [
  {
    id: 1,
    name: "Guangzhou Baima Clothing Market",
    district: "Yuexiu District, Guangzhou",
    image: marketImage,
    metro: "Guangzhou Railway Sta. (Line 2/5)",
    hours: "08:00 - 18:00",
    isFavorite: true,
  },
];

export function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [translationActive, setTranslationActive] = useState(true);
  const [selectedTransit, setSelectedTransit] = useState<"metro" | "bus" | "taxi">("metro");
  const [activeFilters, setActiveFilters] = useState<string[]>(["atms"]);
  const [selectedPlace, setSelectedPlace] = useState(places[0]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="border-b border-[#e2e2e5] bg-white px-[40px] py-[16px]">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[48px] leading-[52.8px] tracking-[-0.96px]">
            C-TourGuide
          </Link>

          {/* Navigation */}
          <nav className="flex gap-[32px] items-center">
            <Link to="/search" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Search
            </Link>
            <Link to="/handbook" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Handbook
            </Link>
            <div className="relative pb-[6px] border-b-2 border-[#b7131a]">
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[14px] tracking-[0.14px]">Map</span>
            </div>
            <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              Sourcing
            </Link>
            <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#5b5f61] text-[14px] tracking-[0.14px] hover:text-[#b7131a] transition-colors">
              AI
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex gap-[16px] items-center">
            <button className="p-[8px] rounded-full hover:bg-[#f9f9fc] transition-colors">
              <svg className="w-[16px] h-[20px]" fill="none" viewBox="0 0 16 20">
                <path d={svgPathsMap.p164b49c0} fill="#B7131A" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-[#f9f9fc] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsMap.p1fe7b600} fill="#B7131A" />
              </svg>
            </button>
            <button className="p-[8px] rounded-full hover:bg-[#f9f9fc] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsMap.p3de21300} fill="#B7131A" />
              </svg>
            </button>
            <Link
              to="/dashboard"
              className="bg-[#b7131a] px-[16px] py-[8px] rounded-[8px] font-['Be_Vietnam_Pro',sans-serif] font-semibold text-white text-[14px] tracking-[0.14px] hover:bg-[#db322f] transition-colors"
            >
              Register as Guide
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar */}
        <aside className="w-[280px] bg-white border-r border-[#e2e2e5] flex flex-col overflow-y-auto">
          <div className="p-[20px]">
            {/* Search Box */}
            <div className="relative mb-[16px]">
              <input
                type="text"
                placeholder="Tìm kiếm địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#e2e2e5] rounded-[8px] pl-[40px] pr-[40px] py-[12px] font-['Be_Vietnam_Pro',sans-serif] text-[14px] text-[#1a1c1e] placeholder:text-[#5b5f61] focus:outline-none focus:border-[#b7131a]"
              />
              <svg className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[18px] h-[18px]" fill="none" viewBox="0 0 18 18">
                <path d={svgPathsMap.p8a35e00} fill="#5B5F61" />
              </svg>
              <button className="absolute right-[8px] top-1/2 -translate-y-1/2 p-[4px]">
                <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgPathsMap.p3ac62a80} fill="#B7131A" />
                </svg>
              </button>
            </div>

            {/* Translation Toggle */}
            <div className="flex items-center justify-between mb-[24px] p-[8px] bg-[#f9f9fc] rounded-[6px]">
              <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">Chinese-Vietnamese Translation Active</span>
            </div>

            {/* Transit Options */}
            <div className="mb-[24px]">
              <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[16px] mb-[12px]">Transit Options</h3>
              <div className="flex gap-[12px]">
                <button
                  onClick={() => setSelectedTransit("metro")}
                  className={`flex-1 flex flex-col items-center gap-[8px] p-[12px] rounded-[8px] border transition-colors ${
                    selectedTransit === "metro" ? "bg-[#b7131a] border-[#b7131a]" : "bg-white border-[#e2e2e5] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d={svgPathsMap.p43f11e00} fill={selectedTransit === "metro" ? "white" : "#B7131A"} />
                  </svg>
                  <span className={`font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px] ${selectedTransit === "metro" ? "text-white" : "text-[#1a1c1e]"}`}>Metro</span>
                </button>
                <button
                  onClick={() => setSelectedTransit("bus")}
                  className={`flex-1 flex flex-col items-center gap-[8px] p-[12px] rounded-[8px] border transition-colors ${
                    selectedTransit === "bus" ? "bg-[#b7131a] border-[#b7131a]" : "bg-white border-[#e2e2e5] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d={svgPathsMap.p4f66f780} fill={selectedTransit === "bus" ? "white" : "#5B5F61"} />
                  </svg>
                  <span className={`font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px] ${selectedTransit === "bus" ? "text-white" : "text-[#1a1c1e]"}`}>Bus</span>
                </button>
                <button
                  onClick={() => setSelectedTransit("taxi")}
                  className={`flex-1 flex flex-col items-center gap-[8px] p-[12px] rounded-[8px] border transition-colors ${
                    selectedTransit === "taxi" ? "bg-[#b7131a] border-[#b7131a]" : "bg-white border-[#e2e2e5] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d={svgPathsMap.p37b5f980} fill={selectedTransit === "taxi" ? "white" : "#5B5F61"} />
                  </svg>
                  <span className={`font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px] ${selectedTransit === "taxi" ? "text-white" : "text-[#1a1c1e]"}`}>Taxi</span>
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-[24px]">
              <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[16px] mb-[12px]">Quick Filters</h3>
              <div className="flex flex-wrap gap-[8px]">
                <button
                  onClick={() => toggleFilter("wholesale")}
                  className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-full border transition-colors ${
                    activeFilters.includes("wholesale") ? "bg-white border-[#b7131a] text-[#b7131a]" : "bg-white border-[#e2e2e5] text-[#5b5f61] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                    <path d={svgPathsMap.p318ecc80} fill={activeFilters.includes("wholesale") ? "#B7131A" : "#5B5F61"} />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px]">Wholesale</span>
                </button>
                <button
                  onClick={() => toggleFilter("atms")}
                  className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-full transition-colors ${
                    activeFilters.includes("atms") ? "bg-[#b7131a] text-white" : "bg-white border border-[#e2e2e5] text-[#5b5f61] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                    <path d={svgPathsMap.p50c8cc00} fill={activeFilters.includes("atms") ? "white" : "#5B5F61"} />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px]">ATMs</span>
                </button>
                <button
                  onClick={() => toggleFilter("hospitals")}
                  className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-full border transition-colors ${
                    activeFilters.includes("hospitals") ? "bg-white border-[#b7131a] text-[#b7131a]" : "bg-white border-[#e2e2e5] text-[#5b5f61] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                    <path d={svgPathsMap.p5e37fc00} fill={activeFilters.includes("hospitals") ? "#B7131A" : "#5B5F61"} />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px]">Hospitals</span>
                </button>
                <button
                  onClick={() => toggleFilter("restrooms")}
                  className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-full border transition-colors ${
                    activeFilters.includes("restrooms") ? "bg-white border-[#b7131a] text-[#b7131a]" : "bg-white border-[#e2e2e5] text-[#5b5f61] hover:border-[#b7131a]"
                  }`}
                >
                  <svg className="w-[12px] h-[12px]" fill="none" viewBox="0 0 12 12">
                    <path d={svgPathsMap.p55a1b780} fill={activeFilters.includes("restrooms") ? "#B7131A" : "#5B5F61"} />
                  </svg>
                  <span className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[12px]">Restrooms</span>
                </button>
              </div>
            </div>

            {/* Offline Maps */}
            <div className="pt-[24px] border-t border-[#e2e2e5]">
              <div className="flex items-center justify-between mb-[12px]">
                <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[16px]">Offline Maps</h3>
                <button className="p-[4px]">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPathsMap.p5a0a780} fill="#B7131A" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between p-[12px] bg-[#f9f9fc] rounded-[8px]">
                <div className="flex-1">
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px] mb-[2px]">Guangzhou Region</div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[11px]">145 MB • Updated Today</div>
                </div>
                <button className="p-[4px]">
                  <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                    <path d={svgPathsMap.p12e12780} fill="#B7131A" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 relative bg-[#e8e8ec]">
          <img src={mapPlaceholder} alt="Map" className="w-full h-full object-cover" />

          {/* Map Controls */}
          <div className="absolute right-[24px] top-[24px] flex flex-col gap-[8px]">
            <button className="bg-white border border-[#e2e2e5] rounded-[8px] size-[40px] flex items-center justify-center hover:bg-[#f9f9fc] transition-colors drop-shadow-md">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsMap.p6fa8900} fill="#1A1C1E" />
              </svg>
            </button>
            <button className="bg-white border border-[#e2e2e5] rounded-[8px] size-[40px] flex items-center justify-center hover:bg-[#f9f9fc] transition-colors drop-shadow-md">
              <svg className="w-[20px] h-[4px]" fill="none" viewBox="0 0 20 4">
                <rect width="20" height="4" fill="#1A1C1E" rx="2" />
              </svg>
            </button>
          </div>

          {/* Location Marker */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <svg className="w-[40px] h-[50px]" fill="none" viewBox="0 0 40 50">
              <path d={svgPathsMap.p12dcc100} fill="#B7131A" />
              <circle cx="20" cy="18" r="8" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Sidebar - Place Details */}
        <aside className="w-[320px] bg-white border-l border-[#e2e2e5] flex flex-col">
          <div className="relative h-[200px]">
            <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
            <button className="absolute top-[12px] right-[12px] bg-white rounded-full size-[40px] flex items-center justify-center drop-shadow-md hover:bg-[#f9f9fc] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path
                  d={svgPathsMap.p6113c00}
                  fill={selectedPlace.isFavorite ? "#B7131A" : "none"}
                  stroke="#B7131A"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-[20px] overflow-y-auto">
            <h2 className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#1a1c1e] text-[24px] leading-[28.8px] mb-[8px]">{selectedPlace.name}</h2>
            <div className="flex items-center gap-[6px] mb-[24px]">
              <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
                <path d={svgPathsMap.p8a0be00} fill="#5B5F61" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[14px]">{selectedPlace.district}</span>
            </div>

            {/* Metro Info */}
            <div className="bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] p-[16px] mb-[16px]">
              <div className="flex items-start gap-[12px]">
                <div className="bg-[#b7131a] rounded-[6px] p-[8px] flex items-center justify-center">
                  <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                    <path d={svgPathsMap.p43f11e00} fill="white" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px] mb-[2px]">Nearest Metro</div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{selectedPlace.metro}</div>
                </div>
              </div>
            </div>

            {/* Hours Info */}
            <div className="bg-[#f9f9fc] border border-[#e2e2e5] rounded-[8px] p-[16px] mb-[16px]">
              <div className="flex items-start gap-[12px]">
                <svg className="w-[20px] h-[20px] mt-[2px]" fill="none" viewBox="0 0 20 20">
                  <path d={svgPathsMap.p3a70b100} fill="#5B5F61" />
                </svg>
                <div className="flex-1">
                  <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px] mb-[2px]">Hours</div>
                  <div className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#1a1c1e] text-[14px]">{selectedPlace.hours}</div>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <button className="w-full bg-[#b7131a] rounded-[8px] px-[20px] py-[14px] flex items-center justify-center gap-[8px] hover:bg-[#db322f] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsMap.p2c2df680} fill="white" />
              </svg>
              <span className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-white text-[16px]">Get Directions</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

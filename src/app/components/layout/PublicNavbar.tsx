import { NavLink } from "react-router";

const navItems = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/guides", label: "Tìm guide" },
  { to: "/markets", label: "Đánh hàng" },
  { to: "/handbook", label: "Cẩm nang" },
  { to: "/map", label: "Bản đồ" },
  { to: "/ai", label: "Trợ lý AI" },
  { to: "/messages", label: "Tin nhắn" },
];

export function PublicNavbar() {
  return (
    <div className="border-b border-[#f0d8d5] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 md:px-8" aria-label="Điều hướng chính">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? "bg-[#fff1ef] text-[#b7131a]" : "text-[#5b5f61] hover:bg-[#fff8f7] hover:text-[#b7131a]"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

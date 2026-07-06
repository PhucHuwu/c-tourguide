import { useState } from "react";
import { Link, NavLink } from "react-router";

const navItems = [
  { to: "/guides", label: "Tìm guide" },
  { to: "/markets", label: "Đánh hàng" },
  { to: "/handbook", label: "Cẩm nang" },
  { to: "/map", label: "Bản đồ" },
  { to: "/ai", label: "Trợ lý AI" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#f0d8d5] bg-[#fffdfc]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] text-2xl font-bold tracking-[-0.04em] text-[#b7131a]">
          C-TourGuide
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? "text-[#b7131a]" : "text-[#5b5f61] hover:text-[#b7131a]"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/messages" className="rounded-lg px-4 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
            Tin nhắn
          </Link>
          <Link to="/guide-register" className="rounded-lg bg-[#b7131a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9f1016]">
            Đăng ký làm guide
          </Link>
        </div>
        <button className="rounded-lg border border-[#f0d8d5] px-3 py-2 text-sm font-semibold text-[#b7131a] md:hidden" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>
      </div>
      {open && (
        <div className="border-t border-[#f0d8d5] bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
                {item.label}
              </Link>
            ))}
            <Link to="/messages" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
              Tin nhắn
            </Link>
            <Link to="/guide-register" onClick={() => setOpen(false)} className="rounded-lg bg-[#b7131a] px-3 py-2 text-center font-semibold text-white">
              Đăng ký làm guide
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

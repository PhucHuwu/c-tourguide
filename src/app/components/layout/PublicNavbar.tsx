import { NavLink } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { getSession, SESSION_EVENT, type AccountRole, type Session } from "../../lib/auth";

const publicNavItems = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/guides", label: "Tìm guide" },
  { to: "/markets", label: "Đánh hàng" },
  { to: "/handbook", label: "Cẩm nang" },
  { to: "/map", label: "Bản đồ" },
  { to: "/ai", label: "Trợ lý AI" },
];

const roleNavItems: Record<AccountRole, { to: string; label: string }[]> = {
  traveler: [
    { to: "/profile", label: "Tài khoản" },
    { to: "/messages", label: "Tin nhắn" },
  ],
  guide: [
    { to: "/guide/dashboard", label: "Khu vực guide" },
  ],
  merchant: [
    { to: "/partner/dashboard", label: "Khu vực đối tác" },
  ],
  admin: [],
};

export function PublicNavbar() {
  const [session, setSession] = useState<Session | null>(() => getSession());
  const navItems = useMemo(() => [...publicNavItems, ...(session ? roleNavItems[session.role] : [])], [session]);

  useEffect(() => {
    const syncSession = () => setSession(getSession());
    window.addEventListener("storage", syncSession);
    window.addEventListener(SESSION_EVENT, syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(SESSION_EVENT, syncSession);
    };
  }, []);

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

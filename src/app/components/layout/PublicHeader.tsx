import { useEffect, useState } from "react";
import { Link } from "react-router";

type Session = {
  email: string;
  name: string;
  role: "traveler" | "guide" | "merchant" | "admin";
};

function getSession(): Session | null {
  try {
    const raw = window.localStorage.getItem("ctourguide.session");
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

const roleLabels: Record<Session["role"], string> = {
  traveler: "Khách cá nhân",
  guide: "Local Guide",
  merchant: "Đối tác",
  admin: "Admin",
};

export function PublicHeader() {
  const [session, setSession] = useState<Session | null>(() => getSession());

  useEffect(() => {
    const syncSession = () => setSession(getSession());
    window.addEventListener("storage", syncSession);
    window.addEventListener("ctourguide:session", syncSession);
    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("ctourguide:session", syncSession);
    };
  }, []);

  function logout() {
    window.localStorage.removeItem("ctourguide.session");
    window.dispatchEvent(new Event("ctourguide:session"));
  }

  return (
    <header className="border-b border-[#f0d8d5] bg-[#fffdfc]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="shrink-0 font-['Be_Vietnam_Pro',sans-serif] text-2xl font-bold tracking-[-0.04em] text-[#b7131a]">
          C-TourGuide
        </Link>

        {session ? (
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-bold text-[#1a1c1e]">{session.name}</div>
              <div className="text-xs text-[#5b5f61]">{roleLabels[session.role]}</div>
            </div>
            <Link to="/profile" aria-label="Tài khoản" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0d8d5] bg-white text-sm font-bold text-[#b7131a] hover:bg-[#fff1ef]">
              {session.name.split(" ").slice(-2).map((part) => part[0]).join("").toUpperCase()}
            </Link>
            <button onClick={logout} className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
              Đăng nhập
            </Link>
            <Link to="/register" className="hidden rounded-lg bg-[#b7131a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9f1016] sm:inline-flex">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

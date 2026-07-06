import { Link } from "react-router";

export function PublicHeader() {
  return (
    <header className="border-b border-[#f0d8d5] bg-[#fffdfc]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="shrink-0 font-['Be_Vietnam_Pro',sans-serif] text-2xl font-bold tracking-[-0.04em] text-[#b7131a]">
          C-TourGuide
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-[#5b403d] hover:bg-[#fff1ef]">
            Đăng nhập
          </Link>
          <Link to="/register" className="hidden rounded-lg bg-[#b7131a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9f1016] sm:inline-flex">
            Đăng ký
          </Link>
          <Link to="/profile" aria-label="Tài khoản" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0d8d5] bg-white text-sm font-bold text-[#b7131a] hover:bg-[#fff1ef]">
            MA
          </Link>
        </div>
      </div>
    </header>
  );
}

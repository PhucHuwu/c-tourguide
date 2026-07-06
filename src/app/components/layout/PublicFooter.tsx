import { Link } from "react-router";

export function PublicFooter() {
  return (
    <footer className="border-t border-[#f0d8d5] bg-[#f8f3f2]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <div className="text-xl font-bold text-[#b7131a]">C-TourGuide</div>
          <p className="mt-1 text-sm text-[#5b5f61]">Nền tảng hỗ trợ người Việt đi Trung Quốc an toàn và thuận tiện hơn.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#5b5f61]">
          <Link to="/safety">An toàn</Link>
          <Link to="/guide-register">Dành cho guide</Link>
          <Link to="/admin">Quản trị</Link>
          <Link to="/revenue">Doanh thu</Link>
        </div>
      </div>
    </footer>
  );
}

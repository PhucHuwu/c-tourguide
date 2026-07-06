import { Link } from "react-router";

export function DashboardFooter({ title, description }: { title: string; description: string }) {
  return (
    <footer className="mt-auto border-t border-[#e2e2e5] bg-white px-[40px] py-[24px]">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[18px]">{title}</div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{description}</div>
        </div>
        <Link to="/" className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px]">
          Về trang chủ
        </Link>
      </div>
    </footer>
  );
}

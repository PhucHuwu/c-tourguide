import { Link } from "react-router";

export function DashboardFooter({ title, description, homePath = "/", homeLabel = "Về trang chủ" }: { title: string; description: string; homePath?: string; homeLabel?: string }) {
  return (
    <footer className="mt-auto border-t border-[#e2e2e5] bg-white px-4 py-6 md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] font-bold text-[#b7131a] text-[18px]">{title}</div>
          <div className="font-['Be_Vietnam_Pro',sans-serif] text-[#5b5f61] text-[12px]">{description}</div>
        </div>
        <Link to={homePath} className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[#b7131a] text-[14px]">
          {homeLabel}
        </Link>
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fffdfc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <PublicHeader />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}

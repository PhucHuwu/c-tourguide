import type { ReactNode } from "react";
import { AiQuickChat } from "./AiQuickChat";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";
import { PublicNavbar } from "./PublicNavbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fffdfc] font-['Be_Vietnam_Pro',sans-serif] text-[#1a1c1e]">
      <div className="sticky top-0 z-50">
        <PublicHeader />
        <PublicNavbar />
      </div>
      <div className="flex-1">{children}</div>
      <PublicFooter />
      <AiQuickChat />
    </div>
  );
}

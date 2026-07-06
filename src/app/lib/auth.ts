export type AccountRole = "traveler" | "guide" | "merchant" | "admin";

export type Session = {
  email: string;
  name: string;
  role: AccountRole;
};

export const SESSION_KEY = "ctourguide.session";
export const SESSION_EVENT = "ctourguide:session";

export const roleLabels: Record<AccountRole, string> = {
  traveler: "Khách cá nhân",
  guide: "Local Guide",
  merchant: "Đối tác",
  admin: "Admin",
};

export const roleHomePath: Record<AccountRole, string> = {
  traveler: "/profile",
  guide: "/dashboard",
  merchant: "/partner-onboarding",
  admin: "/admin",
};

export function getSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: Session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

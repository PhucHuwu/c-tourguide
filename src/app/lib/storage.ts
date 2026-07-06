import type { Booking, BookingStatus, Message } from "../data/mock";
import { initialMessages } from "../data/mock";

const BOOKINGS_KEY = "ctourguide.bookings";
const MESSAGES_KEY = "ctourguide.messages";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getBookings() {
  return readJson<Booking[]>(BOOKINGS_KEY, []);
}

export function getBooking(id: string) {
  return getBookings().find((booking) => booking.id === id);
}

export function saveBooking(booking: Booking) {
  const bookings = getBookings();
  writeJson(BOOKINGS_KEY, [booking, ...bookings.filter((item) => item.id !== booking.id)]);
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const bookings = getBookings().map((booking) => (booking.id === id ? { ...booking, status } : booking));
  writeJson(BOOKINGS_KEY, bookings);
}

export function getMessages() {
  return readJson<Message[]>(MESSAGES_KEY, initialMessages);
}

export function saveMessages(messages: Message[]) {
  writeJson(MESSAGES_KEY, messages);
}

export function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
}

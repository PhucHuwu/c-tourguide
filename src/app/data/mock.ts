import heroImage from "@/assets/generated/home/hero-local-guide.png";
import guidePhoto1 from "@/assets/generated/guide-search/guide-photo-1.png";
import guidePhoto2 from "@/assets/generated/guide-search/guide-photo-2.png";
import profileCover from "@/assets/generated/guide-profile/profile-header-background.png";
import profileAvatar from "@/assets/generated/guide-profile/guide-avatar.png";
import galleryLarge from "@/assets/generated/guide-profile/gallery-large.png";
import galleryTopRight from "@/assets/generated/guide-profile/gallery-top-right.png";
import galleryBottomRight from "@/assets/generated/guide-profile/gallery-bottom-right.png";
import marketImage from "@/assets/generated/sourcing-logistics/market-background.png";
import sourcingHero from "@/assets/generated/sourcing-logistics/sourcing-hero.png";
import mapImage from "@/assets/generated/map/map-placeholder.png";
import metroImage from "@/assets/generated/travel-handbook/metro-guide.png";

export type ServiceType = "tour" | "interpreter" | "sourcing" | "airport" | "business";
export type BookingStatus = "pending" | "confirmed" | "paid" | "active" | "completed" | "cancelled";

export type Guide = {
  id: string;
  name: string;
  city: string;
  avatar: string;
  cover: string;
  gallery: string[];
  languages: string[];
  specialties: string[];
  pricePerHour: number;
  pricePerDay: number;
  rating: number;
  reviews: number;
  responseRate: number;
  responseTime: string;
  experienceYears: number;
  verified: boolean;
  bio: string;
};

export type Booking = {
  id: string;
  guideId: string;
  travelerName: string;
  city: string;
  serviceType: ServiceType;
  date: string;
  duration: "hourly" | "half-day" | "full-day" | "multi-day";
  guests: number;
  notes: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
};

export type Message = {
  id: string;
  author: "traveler" | "guide" | "system";
  text: string;
  translation?: string;
  time: string;
  kind?: "text" | "location";
};

export const assets = {
  heroImage,
  sourcingHero,
  mapImage,
  metroImage,
};

export const serviceLabels: Record<ServiceType, string> = {
  tour: "Du lịch tự túc",
  interpreter: "Phiên dịch",
  sourcing: "Đánh hàng",
  airport: "Đón sân bay",
  business: "Công tác",
};

export const durationLabels = {
  hourly: "Theo giờ",
  "half-day": "Nửa ngày",
  "full-day": "Cả ngày",
  "multi-day": "Nhiều ngày",
} as const;

export const guides: Guide[] = [
  {
    id: "ha-shanghai",
    name: "Nguyễn Thu Hà",
    city: "Thượng Hải",
    avatar: guidePhoto1,
    cover: profileCover,
    gallery: [galleryLarge, galleryTopRight, galleryBottomRight],
    languages: ["Tiếng Việt", "Tiếng Trung HSK6", "Tiếng Anh"],
    specialties: ["Du lịch gia đình", "Đánh hàng", "Có xe 4 chỗ"],
    pricePerHour: 380000,
    pricePerDay: 2600000,
    rating: 4.9,
    reviews: 42,
    responseRate: 98,
    responseTime: "12 phút",
    experienceYears: 5,
    verified: true,
    bio: "Du học sinh sinh sống tại Thượng Hải 5 năm, chuyên hỗ trợ khách Việt đi tự túc, đặt vé, đi metro và tìm nguồn hàng nhẹ.",
  },
  {
    id: "hoang-beijing",
    name: "Trần Minh Hoàng",
    city: "Bắc Kinh",
    avatar: guidePhoto2,
    cover: profileCover,
    gallery: [galleryTopRight, galleryLarge, galleryBottomRight],
    languages: ["Tiếng Việt", "Tiếng Trung", "Tiếng Anh"],
    specialties: ["Tour lịch sử", "Tour VIP", "Có xe 7 chỗ"],
    pricePerHour: 450000,
    pricePerDay: 3200000,
    rating: 5,
    reviews: 89,
    responseRate: 100,
    responseTime: "8 phút",
    experienceYears: 8,
    verified: true,
    bio: "Hướng dẫn viên nhiều kinh nghiệm tại Bắc Kinh, am hiểu Tử Cấm Thành, Vạn Lý Trường Thành và các điểm lịch sử lớn.",
  },
  {
    id: "linh-guangzhou",
    name: "Phạm Khánh Linh",
    city: "Quảng Châu",
    avatar: profileAvatar,
    cover: profileCover,
    gallery: [galleryBottomRight, galleryLarge, galleryTopRight],
    languages: ["Tiếng Việt", "Tiếng Trung HSK6"],
    specialties: ["Chợ Bạch Mã", "Mặc cả", "Logistics"],
    pricePerHour: 420000,
    pricePerDay: 3000000,
    rating: 4.8,
    reviews: 76,
    responseRate: 96,
    responseTime: "15 phút",
    experienceYears: 6,
    verified: true,
    bio: "Chuyên dẫn khách Việt đi chợ đầu mối Quảng Châu, hỗ trợ hỏi giá, thương lượng, kiểm hàng và kết nối kho vận.",
  },
  {
    id: "minh-shenzhen",
    name: "Lê Quốc Minh",
    city: "Thâm Quyến",
    avatar: guidePhoto1,
    cover: profileCover,
    gallery: [galleryLarge, galleryBottomRight, galleryTopRight],
    languages: ["Tiếng Việt", "Tiếng Trung", "Tiếng Anh"],
    specialties: ["Huaqiangbei", "Linh kiện điện tử", "Phiên dịch công tác"],
    pricePerHour: 500000,
    pricePerDay: 3500000,
    rating: 4.9,
    reviews: 58,
    responseRate: 94,
    responseTime: "18 phút",
    experienceYears: 7,
    verified: true,
    bio: "Hỗ trợ khách công tác và dân buôn tìm nguồn linh kiện, thiết bị điện tử tại Thâm Quyến, đặc biệt khu Huaqiangbei.",
  },
];

export const markets = [
  {
    id: "baima",
    name: "Chợ Bạch Mã",
    city: "Quảng Châu",
    category: "Quần áo thời trang",
    image: marketImage,
    hours: "08:00 - 18:00",
    suitableFor: "Shop thời trang, người mới đi Quảng Châu đánh hàng",
    priceLevel: "Trung bình - cao",
    bargaining: "Nên có guide hỗ trợ mặc cả và kiểm mẫu",
    warning: "Luôn kiểm size, chất liệu và điều kiện đổi trả trước khi đặt cọc.",
    guideIds: ["linh-guangzhou"],
  },
  {
    id: "shahe",
    name: "Chợ Sha He",
    city: "Quảng Châu",
    category: "Quần áo giá sỉ",
    image: marketImage,
    hours: "06:00 - 15:00",
    suitableFor: "Người cần nguồn hàng giá tốt, số lượng lớn",
    priceLevel: "Thấp - trung bình",
    bargaining: "Cần đi sớm và hỏi MOQ rõ ràng",
    warning: "Khu chợ đông, nên cẩn thận tư trang và kiểm hàng kỹ.",
    guideIds: ["linh-guangzhou"],
  },
  {
    id: "huaqiangbei",
    name: "Huaqiangbei",
    city: "Thâm Quyến",
    category: "Linh kiện điện tử",
    image: marketImage,
    hours: "09:30 - 18:30",
    suitableFor: "Dân buôn điện tử, linh kiện, phụ kiện công nghệ",
    priceLevel: "Rộng, tùy chất lượng và số lượng",
    bargaining: "Cần phiên dịch biết thuật ngữ kỹ thuật",
    warning: "Nên test mẫu, xác nhận bảo hành và nguồn gốc trước khi mua.",
    guideIds: ["minh-shenzhen"],
  },
];

export const handbookArticles = [
  {
    id: "guangzhou-sourcing",
    city: "Quảng Châu",
    title: "Đi chợ Bạch Mã và Sha He cho người mới",
    topic: "Đánh hàng",
    image: marketImage,
    summary: "Checklist chuẩn bị, khung giờ nên đi, cách hỏi giá và những lỗi thường gặp khi đặt cọc.",
  },
  {
    id: "shanghai-metro",
    city: "Thượng Hải",
    title: "Cách đi metro Thượng Hải cho khách Việt",
    topic: "Di chuyển",
    image: metroImage,
    summary: "Hướng dẫn mua vé, dùng Alipay/WeChat và cách đọc bảng chỉ dẫn trong ga.",
  },
  {
    id: "china-payment",
    city: "Toàn Trung Quốc",
    title: "Lưu ý thanh toán tại Trung Quốc",
    topic: "Thanh toán",
    image: heroImage,
    summary: "Những điều cần chuẩn bị trước khi đi, kèm lưu ý pháp lý với dịch vụ nạp/đổi tiền.",
  },
];

export const initialMessages: Message[] = [
  {
    id: "m1",
    author: "guide",
    text: "Chào bạn, mình sẽ hỗ trợ chuyến đi ngày mai. Bạn muốn gặp ở khách sạn hay ga metro gần chợ?",
    translation: "您好，我明天会协助您的行程。您想在酒店见面还是在市场附近的地铁站见面？",
    time: "09:30",
  },
  {
    id: "m2",
    author: "traveler",
    text: "Mình muốn đi chợ Bạch Mã trước, sau đó qua Sha He nếu còn thời gian.",
    translation: "我想先去白马市场，如果还有时间再去沙河市场。",
    time: "09:34",
  },
];

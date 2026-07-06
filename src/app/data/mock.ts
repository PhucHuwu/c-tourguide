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

export type GuideReview = {
  id: string;
  bookingId: string;
  guideId: string;
  travelerName: string;
  rating: number;
  punctuality: number;
  communication: number;
  expertise: number;
  support: number;
  comment: string;
  wouldRecommend: boolean;
  createdAt: string;
};

export type Message = {
  id: string;
  author: "traveler" | "guide" | "system";
  text: string;
  translation?: string;
  time: string;
  kind?: "text" | "location" | "image";
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
  {
    id: "anh-guangzhou",
    name: "Đỗ Mai Anh",
    city: "Quảng Châu",
    avatar: guidePhoto2,
    cover: profileCover,
    gallery: [galleryTopRight, galleryBottomRight, galleryLarge],
    languages: ["Tiếng Việt", "Tiếng Trung", "Tiếng Quảng Đông cơ bản"],
    specialties: ["Chợ mỹ phẩm", "Phiên dịch đặt hàng", "Kiểm mẫu"],
    pricePerHour: 390000,
    pricePerDay: 2800000,
    rating: 4.9,
    reviews: 64,
    responseRate: 97,
    responseTime: "10 phút",
    experienceYears: 4,
    verified: true,
    bio: "Am hiểu các khu chợ mỹ phẩm, phụ kiện và đồ gia dụng tại Quảng Châu; hỗ trợ khách hỏi MOQ, kiểm mẫu và làm việc với kho vận.",
  },
  {
    id: "tuan-yiwu",
    name: "Vũ Minh Tuấn",
    city: "Nghĩa Ô",
    avatar: profileAvatar,
    cover: profileCover,
    gallery: [galleryLarge, galleryTopRight, galleryBottomRight],
    languages: ["Tiếng Việt", "Tiếng Trung"],
    specialties: ["Hàng phụ kiện", "Đồ gia dụng", "Nguồn sỉ số lượng lớn"],
    pricePerHour: 360000,
    pricePerDay: 2500000,
    rating: 4.7,
    reviews: 38,
    responseRate: 92,
    responseTime: "22 phút",
    experienceYears: 5,
    verified: true,
    bio: "Hỗ trợ khách Việt tìm nguồn hàng phụ kiện, văn phòng phẩm, đồ gia dụng và quà tặng tại Nghĩa Ô với lịch trình tối ưu theo khu chợ.",
  },
  {
    id: "ngoc-chengdu",
    name: "Hoàng Bảo Ngọc",
    city: "Thành Đô",
    avatar: guidePhoto1,
    cover: profileCover,
    gallery: [galleryBottomRight, galleryLarge, galleryTopRight],
    languages: ["Tiếng Việt", "Tiếng Trung", "Tiếng Anh"],
    specialties: ["Ẩm thực Tứ Xuyên", "Gấu trúc", "Tour gia đình"],
    pricePerHour: 350000,
    pricePerDay: 2400000,
    rating: 4.8,
    reviews: 51,
    responseRate: 95,
    responseTime: "14 phút",
    experienceYears: 4,
    verified: true,
    bio: "Chuyên thiết kế lịch trình Thành Đô nhẹ nhàng cho gia đình, kết hợp ẩm thực địa phương, khu gấu trúc và phố cổ.",
  },
  {
    id: "khoa-zhangjiajie",
    name: "Nguyễn Đăng Khoa",
    city: "Thành Đô",
    avatar: guidePhoto2,
    cover: profileCover,
    gallery: [galleryTopRight, galleryLarge, galleryBottomRight],
    languages: ["Tiếng Việt", "Tiếng Trung"],
    specialties: ["Điểm check-in", "Vé tham quan", "Lịch trình nhiều ngày"],
    pricePerHour: 370000,
    pricePerDay: 2700000,
    rating: 4.9,
    reviews: 47,
    responseRate: 96,
    responseTime: "11 phút",
    experienceYears: 6,
    verified: true,
    bio: "Hỗ trợ khách Việt lên lịch trình Trương Gia Giới - Phượng Hoàng Cổ Trấn, tối ưu giờ tham quan và tránh các điểm quá tải.",
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
  {
    id: "xingfa",
    name: "Chợ Xingfa",
    city: "Quảng Châu",
    category: "Mỹ phẩm & chăm sóc cá nhân",
    image: marketImage,
    hours: "09:00 - 18:00",
    suitableFor: "Shop mỹ phẩm, spa, nhà bán hàng online cần tìm mẫu mới",
    priceLevel: "Trung bình, phụ thuộc thương hiệu và MOQ",
    bargaining: "Nên hỏi rõ chứng từ, hạn dùng và điều kiện đổi hàng",
    warning: "Cẩn trọng với hàng không rõ nguồn gốc hoặc bao bì giống thương hiệu lớn.",
    guideIds: ["anh-guangzhou", "linh-guangzhou"],
  },
  {
    id: "yide-road",
    name: "Yide Road",
    city: "Quảng Châu",
    category: "Đồ chơi & quà tặng",
    image: marketImage,
    hours: "09:00 - 17:30",
    suitableFor: "Người tìm đồ chơi, phụ kiện trang trí, quà tặng theo mùa",
    priceLevel: "Thấp - trung bình",
    bargaining: "Giá tốt hơn khi gom mẫu theo kiện hoặc theo thùng",
    warning: "Nên kiểm tiêu chuẩn an toàn nếu nhập đồ chơi cho trẻ em.",
    guideIds: ["anh-guangzhou"],
  },
  {
    id: "yiwu-international",
    name: "Yiwu International Trade City",
    city: "Nghĩa Ô",
    category: "Phụ kiện & đồ gia dụng",
    image: marketImage,
    hours: "09:00 - 17:00",
    suitableFor: "Dân buôn cần tìm nhiều ngành hàng trong một khu phức hợp lớn",
    priceLevel: "Rộng, tối ưu khi nhập số lượng lớn",
    bargaining: "Cần chuẩn bị danh sách gian hàng và lịch đi theo khu",
    warning: "Khu chợ rất lớn, nên đi cùng người nắm sơ đồ để tiết kiệm thời gian.",
    guideIds: ["tuan-yiwu"],
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
  {
    id: "shenzhen-electronics",
    city: "Thâm Quyến",
    title: "Kinh nghiệm đi Huaqiangbei tìm linh kiện điện tử",
    topic: "Đánh hàng",
    image: marketImage,
    summary: "Cách chuẩn bị mã sản phẩm, test mẫu, hỏi bảo hành và làm việc với nhà cung cấp linh kiện.",
  },
  {
    id: "phoenix-town",
    city: "Phượng Hoàng Cổ Trấn",
    title: "Lịch trình Phượng Hoàng Cổ Trấn 2 ngày 1 đêm",
    topic: "Du lịch",
    image: galleryLarge,
    summary: "Điểm check-in, khung giờ đẹp, lưu ý vé tham quan và cách tránh các dịch vụ mời chào quá giá.",
  },
  {
    id: "chengdu-food",
    city: "Thành Đô",
    title: "Ăn gì ở Thành Đô nếu không ăn cay giỏi",
    topic: "Ẩm thực",
    image: heroImage,
    summary: "Danh sách món dễ ăn hơn, câu tiếng Trung cần biết khi gọi món và lưu ý mức cay Tứ Xuyên.",
  },
  {
    id: "guangzhou-vietnamese-food",
    city: "Quảng Châu",
    title: "Nhà hàng Việt và quán ăn dễ gọi món ở Quảng Châu",
    topic: "Ẩm thực",
    image: heroImage,
    summary: "Gợi ý khu vực có món dễ ăn, cách hỏi mức cay, món phù hợp sau một ngày đi chợ đầu mối.",
  },
  {
    id: "guangzhou-hotels-malls",
    city: "Quảng Châu",
    title: "Khách sạn và trung tâm thương mại tiện cho dân buôn",
    topic: "Lưu trú",
    image: marketImage,
    summary: "Nên ở gần ga nào, khu nào tiện đi Bạch Mã, Sha He, Beijing Road và gửi hàng về kho.",
  },
  {
    id: "phoenix-scam-alerts",
    city: "Phượng Hoàng Cổ Trấn",
    title: "Cảnh báo lừa đảo và dịch vụ mời chào quá giá",
    topic: "An toàn",
    image: galleryLarge,
    summary: "Các tình huống thường gặp quanh vé tham quan, chụp ảnh, thuyền, quán ăn và cách hỏi giá trước khi dùng dịch vụ.",
  },
  {
    id: "china-train-ticket",
    city: "Toàn Trung Quốc",
    title: "Mua vé tàu và vé tham quan tại Trung Quốc",
    topic: "Vé tham quan",
    image: metroImage,
    summary: "Chuẩn bị hộ chiếu, tên tiếng Anh, giờ tàu, chính sách đổi vé và lưu ý khi nhờ đối tác hỗ trợ thanh toán.",
  },
  {
    id: "customs-declaration",
    city: "Quảng Châu",
    title: "Khai báo hàng hóa và lưu ý vận chuyển về Việt Nam",
    topic: "Logistics",
    image: marketImage,
    summary: "Checklist thông tin kiện hàng, hóa đơn, mô tả hàng hóa, lưu ý hàng dễ vỡ, mỹ phẩm, linh kiện và đồ trẻ em.",
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

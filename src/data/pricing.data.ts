import { PricingItem } from '../types/pricing.types';

export const PRICING_CATEGORIES = [
  { id: 'all', name: 'Tất cả dịch vụ' },
  { id: 'ink', name: 'Nạp Mực' },
  { id: 'parts', name: 'Thay Linh Kiện' },
  { id: 'repair', name: 'Sửa Bo Mạch & Cơ' },
  { id: 'software', name: 'Phần Mềm & Driver' }
] as const;

export const DEFAULT_PRICING_LIST: PricingItem[] = [
  // NẠP MỰC
  {
    id: 'ink-1',
    category: 'ink',
    categoryName: 'Nạp Mực / Bơm Mực Tận Nơi',
    serviceName: 'Nạp mực máy in Laser trắng đen A4 (Canon, HP)',
    applicableModels: 'Canon 2900, 3000, 6030, 6230, HP 1020, 1005, 1006, M402, M404, M12a...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 90000,
    warranty: 'Bảo hành đến khi hết mực, bản in sắc nét',
    description: 'Mực nạp siêu mịn loại 1 nhập khẩu, ít mực thải, không hại trống từ, kèm vệ sinh hộp mực miễn phí.',
    popular: true
  },
  {
    id: 'ink-2',
    category: 'ink',
    categoryName: 'Nạp Mực / Bơm Mực Tận Nơi',
    serviceName: 'Nạp mực máy in Brother, Pantum, Xerox',
    applicableModels: 'Brother HL-L2321D, 2366DW, B2080DW, DCP-B7535DW, Pantum P2500W...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 130000,
    warranty: 'Bảo hành hết hộp mực, reset nhông miễn phí',
    description: 'Mực chuyên dụng công nghệ bám từ cho Brother, không bị mờ đen, hỗ trợ reset bộ đếm hộp mực tại chỗ.'
  },
  {
    id: 'ink-3',
    category: 'ink',
    categoryName: 'Nạp Mực / Bơm Mực Tận Nơi',
    serviceName: 'Nạp mực máy in Laser A3 (Canon 8610, 8620, 8630, 8780x...)',
    applicableModels: 'Canon LBP 8610, 8620, 8630, 8780x, HP LaserJet 5200, M706n...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 280000,
    warranty: 'Bảo hành đến hạt mực cuối cùng',
    description: 'Chuyên dụng cho bản vẽ kỹ thuật, in bản đồ, in sớ sắc nét không lem.'
  },
  {
    id: 'ink-4',
    category: 'ink',
    categoryName: 'Nạp Mực / Bơm Mực Tận Nơi',
    serviceName: 'Châm mực máy in phun màu liên tục (Epson, Canon, Brother, HP)',
    applicableModels: 'Epson L3110, L3210, L805, L1800, Canon G1010, G2010, Brother T310, T510...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 80000,
    warranty: 'Cam kết chuẩn màu, không nghẹt đầu phun',
    description: 'Mực Dye UV hoặc Pigment chống phai chất lượng cao, cân chỉnh màu chuẩn cho văn phòng và studio ảnh.'
  },
  {
    id: 'ink-5',
    category: 'ink',
    categoryName: 'Nạp Mực / Bơm Mực Tận Nơi',
    serviceName: 'Nạp mực máy in Laser Màu A4',
    applicableModels: 'HP Color LaserJet CP1025, M154a, M254dw, Canon LBP 611Cn, 621Cw...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 300000,
    warranty: 'Bảo hành màu sắc tươi sáng, thay chip nếu cần',
    description: 'Mực laser màu hạt siêu mịn, bảo vệ drum và gạt màu, bảo hành tận nơi.'
  },

  // THAY THẾ LINH KIỆN
  {
    id: 'part-1',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Trống (Drum) máy in Laser đen trắng A4',
    applicableModels: 'Canon 2900, 3300, HP 1020, 1102, Brother 2321D, 2366...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 140000,
    warranty: 'Bảo hành 3 tháng hoặc 3 lần nạp mực',
    description: 'Khắc phục lỗi in mờ, chấm đen lặp lại, sọc đen đậm dọc trang giấy. Trống Mitsu/Hàn Quốc siêu bền.',
    popular: true
  },
  {
    id: 'part-2',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Gạt Mực (Gạt lớn / Gạt nhỏ)',
    applicableModels: 'Các dòng Canon, HP, Brother, Samsung, Xerox...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 80000,
    warranty: 'Bảo hành 3 tháng',
    description: 'Khắc phục hiện tượng mực thải tràn, vệt đen ngang hoặc mép bản in lem nhem.'
  },
  {
    id: 'part-3',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Trục Từ / Trục Cao Su (Trục sạc)',
    applicableModels: 'Canon, HP Laser',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 100000,
    warranty: 'Bảo hành 3 tháng',
    description: 'Xử lý lỗi bóng chữ (bóng mờ), chữ không bám giấy, bản in loang lổ mờ nhạt.'
  },
  {
    id: 'part-4',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Hộp Mực Mới 100% (Cartridge full box)',
    applicableModels: 'Hộp mực 12A, 05A, 49A, 85A, 83A, 78A, TN-2385...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 320000,
    warranty: 'Bảo hành 6 - 12 tháng (1 đổi 1)',
    description: 'Hộp mực mới nguyên seal có lỗ đổ mực thông minh, in 2.000 - 2.500 trang, nạp lại được 3-4 lần.',
    popular: true
  },
  {
    id: 'part-5',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Bao Lụa Sấy (Fuser Film Sleeve)',
    applicableModels: 'Canon 2900, 3300, HP M402, Brother...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 220000,
    warranty: 'Bảo hành 3 - 6 tháng',
    description: 'Khắc phục kẹt giấy ở cụm sấy, giấy ra bị nhăn rúm, rách mép, mực cạo nhẹ bị bay màu.'
  },
  {
    id: 'part-6',
    category: 'parts',
    categoryName: 'Thay Thế Linh Kiện Hao Mòn',
    serviceName: 'Thay Quả Đào Kéo Giấy (Cao su kéo giấy)',
    applicableModels: 'Tất cả các dòng máy in laser và phun màu',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 150000,
    warranty: 'Bảo hành 3 tháng',
    description: 'Xử lý lỗi máy không kéo giấy, kéo nhiều tờ cùng lúc, kéo được nửa tờ thì dừng kêu rột rột.'
  },

  // SỬA CHỮA PHẦN CỨNG & BO MẠCH
  {
    id: 'rep-1',
    category: 'repair',
    categoryName: 'Sửa Chữa Phần Cứng & Bo Mạch',
    serviceName: 'Sửa kẹt giấy cơ bản / Lấy dị vật (kim kẹp, thun, rách)',
    applicableModels: 'Tất cả các dòng máy in',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 100000,
    warranty: 'Kiểm tra test máy kỹ lưỡng',
    description: 'Tháo gỡ dị vật an toàn, vệ sinh đường dẫn giấy, cân chỉnh bánh răng cơ kéo.'
  },
  {
    id: 'rep-2',
    category: 'repair',
    categoryName: 'Sửa Chữa Phần Cứng & Bo Mạch',
    serviceName: 'Sửa nguồn máy in (Mất nguồn, chập cháy nổ, cắm nhầm điện 220V)',
    applicableModels: 'Canon, HP, Brother, Epson',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 350000,
    warranty: 'Bảo hành 3 tháng',
    description: 'Thay IC nguồn, tụ lọc, cầu chì bảo vệ chuyên dụng, kiểm tra điện áp đầu ra chuẩn.'
  },
  {
    id: 'rep-3',
    category: 'repair',
    categoryName: 'Sửa Chữa Phần Cứng & Bo Mạch',
    serviceName: 'Sửa Card Formatter / Bo Điều Khiển (Không nhận máy tính, treo đèn)',
    applicableModels: 'Canon 2900, HP P1102w, HP M402, Brother...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 450000,
    warranty: 'Bảo hành 3 tháng',
    description: 'Khắc phục lỗi cắm dây USB máy tính không báo kết nối, lỗi Firmware, lỗi cổng LAN/Wifi.'
  },
  {
    id: 'rep-4',
    category: 'repair',
    categoryName: 'Sửa Chữa Phần Cứng & Bo Mạch',
    serviceName: 'Ngâm thông & Cân chỉnh Đầu Phun Máy In Màu (Epson, Canon)',
    applicableModels: 'Epson L310, L3110, L3210, L805, L1800, Canon G1010, G2010...',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 300000,
    warranty: 'Bảo hành in đủ tia màu',
    description: 'Dung dịch chuyên dụng đánh tan cặn mực khô lâu ngày không in, khôi phục màu sắc gốc sắc nét.'
  },

  // PHẦN MỀM & MẠNG
  {
    id: 'soft-1',
    category: 'software',
    categoryName: 'Cài Đặt Phần Mềm & Driver Mạng',
    serviceName: 'Cài đặt Driver & Chia sẻ Máy in qua Mạng LAN / Wifi nội bộ',
    applicableModels: 'Windows 10, 11, MacOS, Laptop, Máy bàn văn phòng',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 100000,
    warranty: 'Hỗ trợ Ultraviewer miễn phí 30 ngày',
    description: 'Cài đặt driver chuẩn, khắc phục lỗi 0x0000011b, 0x00000709 khi share máy in Win 10/11.'
  },
  {
    id: 'soft-2',
    category: 'software',
    categoryName: 'Cài Đặt Phần Mềm & Driver Mạng',
    serviceName: 'Reset Bộ Đếm Mực Thải Tràn Bộ Nhớ (Epson Waste Ink Pad)',
    applicableModels: 'Epson L-Series (L120, L310, L3110, L3210, L805, L1800...)',
    price: 'Gọi hoặc nhắn Zalo 0938.386.326',
    rawPrice: 120000,
    warranty: 'Phần mềm chính hãng vĩnh viễn',
    description: 'Khắc phục lỗi 2 đèn đỏ chớp luân phiên, báo "Service Required" hoặc "A printer ink pad is at the end of its service life".'
  }
];

export const PRICING_LIST = DEFAULT_PRICING_LIST;

import { PrinterProduct } from '../types/product.types';

export const PRINTER_PRODUCTS: PrinterProduct[] = [
  // MÁY CŨ CHẤT LƯỢNG CAO
  {
    id: 'prod-used-1',
    name: 'Canon LBP 2900 (Cũ Zin 95% - Nồi Đồng Cối Đá)',
    brand: 'Canon',
    condition: 'used',
    conditionText: 'Máy Cũ Like New 95% - Nguyên Bản 100%',
    price: 1850000,
    originalPrice: 3950000,
    warranty: 'Bảo hành 6 tháng tận nơi (1 đổi 1 trong 30 ngày)',
    imageUrl: '',
    badge: 'Bán Chạy Nhất',
    features: [
      'Dòng máy in huyền thoại bền bỉ số 1 thị trường',
      'Hộp mực 12A cực rẻ, nạp mực chỉ 80.000đ/lần',
      'Linh kiện dễ tìm, không bao giờ lo thiếu đồ thay',
      'Đã được Mr. Ân bảo dưỡng thay bao lụa & rulo mới 100%'
    ],
    specs: {
      type: 'Laser đơn sắc trắng đen A4/A5',
      functions: 'In đơn năng tốc độ cao',
      speed: '12 trang / phút',
      connection: 'Cổng USB 2.0 tốc độ cao',
      duplex: 'In 2 mặt thủ công',
      cartridge: 'Canon 303 / HP 12A (Dung lượng 2.000 trang)'
    },
    gifts: [
      'Tặng 01 Hộp mực Cartridge mới 100% trị giá 350.000đ',
      'Tặng dây cáp USB chống nhiễu + dây nguồn zin',
      'Miễn phí giao hàng & cài đặt tận nơi tại Tây Ninh'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-used-2',
    name: 'Canon LBP 6030w Cũ Like New 98% (Có Wifi Không Dây)',
    brand: 'Canon',
    condition: 'used',
    conditionText: 'Máy Cũ Siêu Lướt 98% - Rất Mới',
    price: 1750000,
    originalPrice: 2890000,
    warranty: 'Bảo hành 6 tháng tận nơi',
    imageUrl: '',
    badge: 'Có Wifi Nhỏ Gọn',
    features: [
      'In trực tiếp từ điện thoại Smartphone iPhone, Android, Laptop qua Wifi',
      'Kích thước nhỏ gọn đặt vừa mọi góc bàn làm việc',
      'Khởi động nhanh trong 10 giây với công nghệ On-Demand Fixing',
      'Phù hợp giáo viên, gia đình, shop bán hàng online in bill'
    ],
    specs: {
      type: 'Laser trắng đen nhỏ gọn',
      functions: 'In đơn năng Wifi',
      speed: '18 trang / phút',
      connection: 'Wifi 802.11b/g/n, USB 2.0',
      duplex: 'In 2 mặt thủ công',
      cartridge: 'Canon 325 / HP 85A'
    },
    gifts: [
      'Tặng kèm 01 hộp mực mới 100%',
      'Cáp nguồn + Cáp kết nối USB',
      'Cài đặt in trên điện thoại và laptop tại nhà miễn phí'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-used-3',
    name: 'HP LaserJet 1020 Cũ Bền Bỉ (Dùng Hộp Mực 12A)',
    brand: 'HP',
    condition: 'used',
    conditionText: 'Máy Cũ 92% - Cơ Kéo Siêu Khỏe',
    price: 1350000,
    originalPrice: 2600000,
    warranty: 'Bảo hành 6 tháng tận nơi',
    imageUrl: '',
    badge: 'Giá Rẻ Tiết Kiệm',
    features: [
      'Máy in kinh tế kéo giấy cực khỏe, ít kẹt',
      'Cùng kết cấu và dùng chung hộp mực 12A với Canon 2900',
      'Chi phí in ấn siêu rẻ chỉ vài chục đồng một trang',
      'Đã qua kiểm tra và test 500 trang in liên tục'
    ],
    specs: {
      type: 'Laser trắng đen',
      functions: 'In laser trắng đen',
      speed: '14 trang / phút',
      connection: 'USB 2.0',
      duplex: 'In 2 mặt thủ công',
      cartridge: 'HP Q2612A (12A)'
    },
    gifts: [
      'Hộp mực mới nguyên seal',
      'Dây nguồn + Cáp máy in',
      'Cài đặt tận nhà'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-used-4',
    name: 'Brother HL-L2366DW Cũ (In 2 Mặt Tự Động + Wifi + LAN)',
    brand: 'Brother',
    condition: 'used',
    conditionText: 'Máy Cũ 95% - Tính Năng Cao Cấp',
    price: 1950000,
    originalPrice: 3890000,
    warranty: 'Bảo hành 6 tháng tận nơi',
    imageUrl: '',
    badge: 'In 2 Mặt + Wifi',
    features: [
      'Tự động đảo mặt in 2 mặt (Duplex) tiết kiệm 50% giấy',
      'Tích hợp Wifi và cổng mạng LAN văn phòng tiện dụng',
      'Tốc độ cực nhanh 30 trang/phút, khay giấy kín 250 tờ',
      'Khay giấy lớn kín không lo chuột bọ hay ẩm mốc giấy'
    ],
    specs: {
      type: 'Laser đen trắng tốc độ cao',
      functions: 'In đảo mặt tự động + Mạng Wifi/LAN',
      speed: '30 trang / phút',
      connection: 'Wifi, LAN Ethernet, USB 2.0',
      duplex: 'Tự động 2 mặt (Auto Duplex)',
      cartridge: 'TN-2385 (2.600 trang)'
    },
    gifts: [
      'Tặng cụm mực + drum mới 100%',
      'Cáp nguồn, cáp mạng bấm sẵn',
      'Hỗ trợ setup hệ thống mạng nội bộ công ty'
    ],
    stockStatus: 'low_stock'
  },
  {
    id: 'prod-used-5',
    name: 'Epson L805 Cũ Chuyên In Ảnh Màu 6 Màu (Đầu Phun Chuẩn 100%)',
    brand: 'Epson',
    condition: 'used',
    conditionText: 'Máy Cũ 90% - Đầu Phun Zin Đủ Tia',
    price: 3600000,
    originalPrice: 6500000,
    warranty: 'Bảo hành 3 tháng (Có cam kết test tia phun)',
    imageUrl: '',
    badge: 'In Màu 6 Hộp Mực',
    features: [
      'Hệ thống 6 màu mực độc lập cho bản in màu sống động, chân thực',
      'Chuyên in ảnh thẻ, photobook, in bìa đĩa CD/DVD, in Decal tem nhãn',
      'Kết nối Wifi không dây tiện lợi',
      'Mr. Ân trực tiếp test đầu phun không đứt nét trước khi giao'
    ],
    specs: {
      type: 'In phun màu 6 màu chuyên nghiệp',
      functions: 'In ảnh màu chất lượng cao Wifi',
      speed: '37 trang / phút (nháp), 12 giây / ảnh 10x15',
      connection: 'Wifi, USB 2.0',
      duplex: 'Thủ công',
      cartridge: 'Mực nước Epson T673 6 màu'
    },
    gifts: [
      'Đổ đầy 6 bình mực màu mới 100%',
      'Tặng 1 xấp giấy in ảnh Glossy cao cấp',
      'Cân chỉnh Profile màu màn hình chuẩn'
    ],
    stockStatus: 'contact'
  },

  // MÁY MỚI 100% CHÍNH HÃNG
  {
    id: 'prod-new-1',
    name: 'Canon LBP 2900 Mới 100% Chính Hãng (Nguyên Seal Lê Bảo Minh)',
    brand: 'Canon',
    condition: 'new',
    conditionText: 'Mới 100% Fullbox - Bảo Hành Hãng 12 Tháng',
    price: 3850000,
    originalPrice: 4200000,
    warranty: 'Bảo hành chính hãng 12 tháng tại nhà',
    imageUrl: '',
    badge: 'Hàng Mới Chính Hãng',
    features: [
      'Sản phẩm kinh điển được mọi văn phòng tin dùng',
      'Độ bền cơ học vượt trội, rất hiếm khi hỏng vặt',
      'Bản in sắc nét tuyệt đối, mực in thông dụng giá rẻ',
      'Linh kiện thay thế sẵn có ở mọi nơi'
    ],
    specs: {
      type: 'Laser trắng đen A4',
      functions: 'In laser đơn năng',
      speed: '12 trang / phút',
      connection: 'USB 2.0',
      duplex: 'Thủ công',
      cartridge: 'Canon 303 (Nguyên seal hãng)'
    },
    gifts: [
      'Giao hàng tận nơi miễn phí',
      'Tặng 01 ream giấy in cao cấp 500 tờ A4',
      'Bảo trì miễn phí 1 năm bởi Kỹ thuật Ân Phát'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-new-2',
    name: 'Brother HL-L2321D Mới 100% (In 2 Mặt Tự Động Siêu Bền)',
    brand: 'Brother',
    condition: 'new',
    conditionText: 'Mới 100% Chính Hãng - Bảo Hành 24 Tháng',
    price: 2890000,
    originalPrice: 3250000,
    warranty: 'Bảo hành chính hãng 24 tháng',
    imageUrl: '',
    badge: 'Bảo Hành 2 Năm',
    features: [
      'Tự động in 2 mặt tiết kiệm giấy và thao tác lật',
      'Tốc độ in nhanh 30 trang/phút, phục vụ công việc gấp',
      'Hộp mực dung lượng lớn lên đến 2.600 trang in',
      'Khay chứa giấy kín 250 tờ chống bụi bẩn và ẩm giấy'
    ],
    specs: {
      type: 'Laser trắng đen 2 mặt',
      functions: 'In đảo mặt tự động tốc độ cao',
      speed: '30 trang / phút',
      connection: 'USB 2.0 Hi-Speed',
      duplex: 'In 2 mặt tự động 100%',
      cartridge: 'TN-2385 và Cụm Drum DR-2385'
    },
    gifts: [
      'Tặng 1 Ream giấy bãi bằng Double A A4',
      'Cáp kết nối + đĩa driver',
      'Lắp đặt và hướng dẫn sử dụng chi tiết'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-new-3',
    name: 'Epson EcoTank L3210 Mới 100% (Đa Năng In / Scan / Copy Mực Liên Tục)',
    brand: 'Epson',
    condition: 'new',
    conditionText: 'Mới 100% Fullbox Chính Hãng',
    price: 3490000,
    originalPrice: 3990000,
    warranty: 'Bảo hành 24 tháng hoặc 30.000 trang in',
    imageUrl: '',
    badge: 'In Màu Đa Năng',
    features: [
      'Tích hợp 3 trong 1: In màu, Scan tài liệu, Copy đen trắng/màu sắc nét',
      'Bình mực tích hợp sẵn trong thân máy, nạp mực dễ dàng không sợ lem',
      '1 bộ mực in được tới 4.500 trang đen trắng và 7.500 trang màu',
      'Công nghệ in không nhiệt Heat-Free tiết kiệm điện và siêu bền đầu phun'
    ],
    specs: {
      type: 'In phun màu liên tục đa chức năng',
      functions: 'In màu, Scan tài liệu, Photo copy',
      speed: '10 trang đen / phút, 5 trang màu / phút',
      connection: 'USB 2.0',
      duplex: 'Thủ công',
      cartridge: 'Bộ 4 màu mực chính hãng Epson 003'
    },
    gifts: [
      'Tặng kèm trọn bộ 4 bình mực zin theo máy',
      'Tặng 1 tệp giấy in ảnh cao cấp',
      'Miễn phí lắp đặt, cân chỉnh tia mực tại nhà'
    ],
    stockStatus: 'in_stock'
  },
  {
    id: 'prod-new-4',
    name: 'HP LaserJet Pro M404dn Mới 100% (Chuyên Cho Văn Phòng Doanh Nghiệp)',
    brand: 'HP',
    condition: 'new',
    conditionText: 'Mới 100% Chính Hãng HP',
    price: 5690000,
    originalPrice: 6300000,
    warranty: 'Bảo hành 12 tháng tận nơi',
    imageUrl: '',
    badge: 'Chuyên Văn Phòng Lớn',
    features: [
      'Công suất in khủng lên tới 80.000 trang/tháng',
      'Tốc độ cực nhanh 38 trang/phút, in đảo mặt tự động mượt mà',
      'Cổng mạng Gigabit Ethernet kết nối cho hàng chục máy tính công ty',
      'Bảo mật dữ liệu in ấn doanh nghiệp HP Wolf Security'
    ],
    specs: {
      type: 'Laser trắng đen văn phòng cao cấp',
      functions: 'In đảo mặt mạng LAN',
      speed: '38 trang / phút',
      connection: 'Gigabit LAN, USB 2.0',
      duplex: 'Tự động 2 mặt',
      cartridge: 'HP 76A (CF276A) in 3.000 trang'
    },
    gifts: [
      'Giao hàng & cấu hình mạng văn phòng miễn phí',
      'Tặng hộp mực công ty dung lượng lớn',
      'Cam kết hỗ trợ kỹ thuật ưu tiên'
    ],
    stockStatus: 'in_stock'
  }
];

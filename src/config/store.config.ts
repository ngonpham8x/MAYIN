export interface StoreConfig {
  companyName: string;
  brandName: string;
  shortName: string;
  zaloProfileName: string;
  tagline: string;
  technicianName: string;
  phone: string;
  displayPhone: string;
  zaloUrl: string;
  address: string;
  mapsEmbedUrl: string;
  mapsAppUrl: string;
  workingHours: string;
  emergencyService: string;
  responseTime: string;
  email: string;
  invoiceNotice: string;
  supportedBrands: string[];
  areasCovered: string[];
}

export const STORE_INFO: StoreConfig = {
  companyName: 'CÔNG TY TNHH KỸ THUẬT BẢO ĐẠT',
  brandName: 'CÔNG TY KỸ THUẬT BẢO ĐẠT',
  shortName: 'BẢO ĐẠT',
  zaloProfileName: 'Mr. Ân',
  tagline: 'Chuyên Kinh Doanh Sản Phẩm & Cung Cấp Dịch Vụ Sửa Chữa Thiết Bị Văn Phòng',
  technicianName: 'Mr. Ân',
  phone: '0938386326',
  displayPhone: '0938.386.326',
  zaloUrl: 'https://zalo.me/0938386326',
  address: '9B Hẻm 14 Hoàng Lê Kha, Khu phố 4, Phường Tân Ninh, TP. Tây Ninh',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=11.302827,106.1019956&z=16&output=embed',
  mapsAppUrl: 'https://maps.app.goo.gl/4JAGrovpiddkKERb8',
  workingHours: '7:30 - 21:00 (Thứ 2 - Chủ Nhật, Ngày Lễ)',
  emergencyService: 'Hỗ trợ kỹ thuật tận nơi tại Tây Ninh',
  responseTime: 'Hỗ trợ kỹ thuật tận nơi nhanh chóng khi có sự cố',
  email: 'baodat.photocopytayninh@gmail.com',
  invoiceNotice: 'Có phát hành hóa đơn điện tử VAT đầy đủ cho công ty, doanh nghiệp và cơ quan nhà nước.',
  supportedBrands: ['Canon', 'Ricoh', 'Toshiba', 'Sharp', 'Konica Minolta', 'Lanier', 'HP', 'Brother', 'Epson'],
  areasCovered: [
    'TP. Tây Ninh (Toàn bộ các phường, xã)',
    'Thị xã Hòa Thành (Long Hoa, Hiệp Tân, Long Thành...)',
    'Huyện Châu Thành',
    'Huyện Dương Minh Châu',
    'Huyện Gò Dầu & Trảng Bàng',
    'Huyện Tân Biên & Tân Châu'
  ]
};

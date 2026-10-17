import { MaintenancePlan } from '../types/maintenance.types';

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'plan-personal',
    name: 'Gói Cá Nhân & Hộ Kinh Doanh',
    targetAudience: 'Dành cho gia đình, giáo viên, shop bán hàng online (1 - 2 máy in)',
    pricePerMonth: 'Gọi hoặc nhắn Zalo 0938.386.326',
    badge: 'Tiết Kiệm',
    features: [
      'Vệ sinh, hút bụi mực, bôi mỡ nhiệt cụm sấy định kỳ 1 tháng/lần',
      'Giảm ngay 20% chi phí nạp mực và linh kiện thay thế',
      'Ưu tiên xử lý lỗi kẹt giấy, không kéo giấy nhanh chóng',
      'Hỗ trợ cài đặt driver và sửa lỗi từ xa qua Ultraviewer 24/7',
      'Không giới hạn số lần tư vấn kỹ thuật qua Hotline Mr. Ân'
    ],
    commitments: [
      'Kỹ thuật viên có mặt đúng hẹn',
      'Báo cáo tình trạng linh kiện trước khi phát sinh lỗi',
      'Thanh toán linh hoạt theo quý hoặc năm'
    ]
  },
  {
    id: 'plan-office',
    name: 'Gói Doanh Nghiệp Tiêu Chuẩn',
    targetAudience: 'Văn phòng công ty, trường học, phòng công chứng, kế toán (3 - 10 máy in)',
    pricePerMonth: 'Gọi hoặc nhắn Zalo 0938.386.326',
    badge: 'Được Chọn Nhiều Nhất',
    isPopular: true,
    features: [
      'Bảo trì, kiểm tra toàn diện 2 lần / tháng tận văn phòng',
      'Kỹ thuật viên có mặt hỗ trợ nhanh chóng khi có sự cố ngắt quãng',
      'CHO MƯỢN MÁY IN TƯƠNG ĐƯƠNG MIỄN PHÍ khi máy phải nhận về tiệm',
      'Giảm 25% chi phí nạp mực chính hãng & linh kiện thay thế',
      'Quản lý hệ sinh thái máy in chia sẻ qua mạng LAN, bảo mật file in',
      'Có xuất hóa đơn VAT điện tử hợp lệ đầy đủ hàng tháng/quý'
    ],
    commitments: [
      'Cam kết không gián đoạn công việc in ấn của doanh nghiệp',
      'Bảo dưỡng hệ thống cơ kéo và sấy chống kẹt giấy mùa nồm ẩm',
      'Ký hợp đồng dịch vụ pháp lý rõ ràng'
    ]
  },
  {
    id: 'plan-vip',
    name: 'Gói Doanh Nghiệp VIP & Cơ Quan',
    targetAudience: 'Ngân hàng, bệnh viện, tập đoàn, xưởng sản xuất (> 10 máy in)',
    pricePerMonth: 'Gọi hoặc nhắn Zalo 0938.386.326',
    badge: 'Dịch Vụ Trọn Gói VIP',
    features: [
      'Trực kỹ thuật viên ưu tiên số 1, phản hồi nhanh chóng',
      'Không giới hạn số lần gọi hỗ trợ khẩn cấp tại chỗ trong tháng',
      'Tặng gói nạp mực định kỳ hoặc tính phí trọn gói theo số lượng trang in',
      'Dự phòng sẵn máy in và hộp mực sơ cua tại trụ sở khách hàng',
      'Báo cáo kiểm định hao mòn thiết bị và lập kế hoạch khấu hao định kỳ',
      'Hợp đồng bảo trì toàn diện kèm hóa đơn VAT, thanh toán chuyển khoản'
    ],
    commitments: [
      'Kỹ thuật trưởng Mr. Ân trực tiếp giám sát phụ trách',
      'Cung cấp mực in chuẩn xuất xứ nguồn gốc rõ ràng',
      'Khảo sát và tư vấn tối ưu chi phí in ấn hàng năm'
    ]
  }
];

export const COMMON_PRINTER_ISSUES = [
  {
    label: 'Kẹt giấy liên tục (Paper Jam)',
    symptom: 'Giấy chạy vào nửa chừng bị gấp quạt hoặc kẹt lại ở cụm sấy',
    cause: 'Bao lụa rách, rulo ép chai cứng, mòn bánh cao su kéo giấy hoặc có dị vật ghim kẹp',
    solution: 'Tháo dị vật, vệ sinh bôi mỡ sấy chuyên dụng hoặc thay bao lụa mới.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  },
  {
    label: 'Bản in bị vệt đen dọc hoặc ngang',
    symptom: 'Giấy in ra có đường kẻ đen dài từ trên xuống dưới hoặc vệt đen cách nhau đều',
    cause: 'Hỏng trống (Drum) bị xước hoặc hỏng gạt lớn thu hồi mực thải',
    solution: 'Thay trống Drum Mitsu hoặc thay thanh gạt mực thải mới.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  },
  {
    label: 'In ra bản in trắng tinh hoặc mờ nhạt',
    symptom: 'Chữ mờ căm không nhìn rõ, hoặc giấy chạy ra trắng toát',
    cause: 'Hết mực, gãy lò xo tiếp mass trục từ, hỏng hộp quang laser hoặc mất cao áp',
    solution: 'Nạp mực bổ sung, căn chỉnh lò xo tiếp xúc mass hoặc kiểm tra cụm quang.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  },
  {
    label: 'Máy nháy đèn đỏ / Vàng không in',
    symptom: 'Đèn Attention nhấp nháy, máy tính báo "Toner Empty", "Paper Out" hoặc "Service Req"',
    cause: 'Hết mực, lỗi chip hộp mực, sensor nhận giấy bị kẹt bụi, hoặc tràn bộ đếm mực thải',
    solution: 'Reset chip mực, vệ sinh sensor hoặc chạy phần mềm reset tràn bộ nhớ.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  },
  {
    label: 'Máy không kéo được giấy',
    symptom: 'Nghe tiếng cơ quay rít rít nhưng giấy không được hút lên khay',
    cause: 'Mòn quả đào kéo giấy (Pick-up roller) do ma sát lâu ngày hoặc bụi giấy bám kín',
    solution: 'Vệ sinh phục hồi cao su kéo giấy hoặc thay quả đào mới.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  },
  {
    label: 'Mất kết nối Wifi / Không nhận máy tính',
    symptom: 'Đổi modem wifi xong máy in không kết nối được, hoặc cắm dây USB máy tính không nhận',
    cause: 'Sai địa chỉ IP mạng nội bộ, lỏng cổng USB, lỗi Driver cập nhật Windows hoặc hỏng card Formatter',
    solution: 'Cài lại IP tĩnh máy in, setup kết nối Wifi hoặc hỗ trợ qua Ultraviewer.',
    priceEst: 'Gọi hoặc nhắn Zalo 0938.386.326'
  }
];

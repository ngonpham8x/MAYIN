import React from 'react';
import { Wrench, Droplet, Cog, Cpu, Wifi, CheckCircle2, Send } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';

export interface ServicesOverviewProps {
  onSelectService: (serviceName: string) => void;
  onBookNow: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  onSelectService,
  onBookNow: _onBookNow,
}) => {
  const services = [
    {
      icon: Droplet,
      iconColor: 'text-blue-600 bg-blue-100',
      title: 'Nạp Mực / Bơm Mực Tận Nơi',
      price: 'Gọi hoặc nhắn Zalo',
      models: 'Canon, HP, Brother, Epson, Pantum...',
      desc: 'Sử dụng mực siêu mịn loại 1 nhập khẩu, ít mực thải, bảo vệ trống từ. Kỹ thuật viên vệ sinh hộp mực và xả mực thải miễn phí tại chỗ.',
      features: ['Bản in đậm nét, không lem', 'Reset nhông Brother miễn phí', 'Bảo hành đến hạt mực cuối cùng']
    },
    {
      icon: Cog,
      iconColor: 'text-amber-600 bg-amber-100',
      title: 'Khắc Phục Kẹt Giấy & Cơ Kéo',
      price: 'Gọi hoặc nhắn Zalo',
      models: 'Tất cả các dòng máy in laser & phun',
      desc: 'Xử lý triệt để giấy kẹt quạt lò xo, giấy kẹt ở cụm sấy, máy kéo nhiều tờ một lúc hoặc phát ra tiếng kêu cọc cọc khi khởi động.',
      features: ['Thay bao lụa sấy chịu nhiệt', 'Thay quả đào cao su kéo giấy', 'Bôi mỡ nhiệt Fuser chính hãng']
    },
    {
      icon: Wrench,
      iconColor: 'text-emerald-600 bg-emerald-100',
      title: 'Thay Trống Drum & Gạt Mực',
      price: 'Gọi hoặc nhắn Zalo',
      models: 'Hộp mực 12A, 05A, 49A, 85A, 83A, TN-2385...',
      desc: 'Đặc trị lỗi bản in bị vệt đen dọc mép giấy, chấm đen lặp lại theo chu kỳ, chữ mờ căm hoặc bóng ma chữ lặp lại trên trang.',
      features: ['Trống Mitsu siêu bền 3-4 lần nạp', 'Gạt lớn thu hồi mực thải sạch sẽ', 'Bảo hành 3 tháng tận nơi']
    },
    {
      icon: Cpu,
      iconColor: 'text-indigo-600 bg-indigo-100',
      title: 'Sửa Nguồn & Bo Formatter',
      price: 'Gọi hoặc nhắn Zalo',
      models: 'Canon 2900, HP M402, Brother...',
      desc: 'Khắc phục sự cố máy in không lên nguồn, cắm nhầm điện 220V, cắm cáp USB máy tính không nhận tín hiệu, chập cháy bo cao áp.',
      features: ['Linh kiện IC, tụ lọc chuẩn zin', 'Test tải kỹ càng trước khi bàn giao', 'Bảo hành 3 - 6 tháng']
    },
    {
      icon: Wifi,
      iconColor: 'text-rose-600 bg-rose-100',
      title: 'Cài Đặt Driver & Mạng LAN/Wifi',
      price: 'Gọi hoặc nhắn Zalo',
      models: 'Windows 10, 11, MacOS, Laptop',
      desc: 'Cài đặt driver chuẩn, khắc phục triệt để lỗi chia sẻ máy in mạng nội bộ 0x0000011b, 0x00000709, cài đặt in trực tiếp từ điện thoại.',
      features: ['Chia sẻ in cho cả phòng ban', 'In không dây qua điện thoại / iPad', 'Hỗ trợ Ultraviewer miễn phí 30 ngày']
    }
  ];

  return (
    <section id="dich-vu" className="py-12 sm:py-16 bg-white border-b border-slate-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-200">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Dịch Vụ Kỹ Thuật Tận Nơi Uy Tín</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Dịch Vụ Sửa Máy In & Nạp Mực Uy Tín
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base">
            Kỹ thuật trưởng <strong className="text-slate-900">{STORE_INFO.technicianName}</strong> trang bị đầy đủ dụng cụ đồ nghề chuyên dụng, linh kiện thay thế tại chỗ, xử lý nhanh chóng trong ngày.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-5 sm:p-6 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5 gap-2">
                    <div className={`p-2.5 rounded-xl ${srv.iconColor} group-hover:scale-105 transition-transform shrink-0`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <a
                      href={STORE_INFO.zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3 h-3 text-blue-600" />
                      <span>{srv.price}</span>
                    </a>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-[11px] text-blue-600 font-semibold mb-2">
                    {srv.models}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.desc}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 mb-5 border-t border-slate-200/80 pt-3">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectService(srv.title)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors shadow-xs text-center truncate"
                  >
                    Báo Giá Dịch Vụ
                  </button>

                  <a
                    href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                      `Xin chào Mr. Ân, tôi cần tư vấn và nhận báo giá dịch vụ: ${srv.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1 truncate"
                  >
                    <Send className="w-3 h-3 shrink-0" />
                    <span>Nhắn Zalo</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

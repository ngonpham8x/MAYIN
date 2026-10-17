import React from 'react';
import { Phone, MapPin, Clock, Send, ExternalLink, Navigation } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';
import { BDLogo } from './BDLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-10 sm:pt-12 pb-8 border-t border-slate-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BDLogo size={42} className="shrink-0" />
              <div className="min-w-0">
                <span className="text-sm sm:text-base font-black tracking-tight text-white uppercase block truncate">
                  {STORE_INFO.companyName}
                </span>
                <p className="text-xs text-blue-400 font-semibold truncate">
                  {STORE_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Công ty chúng tôi chuyên kinh doanh sản phẩm và cung cấp dịch vụ sửa chữa thiết bị văn phòng, máy in, máy photocopy (Canon, Ricoh, Toshiba, Sharp, Konica Minolta, HP, Brother, Epson...). Phụ trách kỹ thuật: <strong className="text-white">{STORE_INFO.technicianName}</strong>.
            </p>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dịch Vụ Chuyên Trách
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#dich-vu" className="hover:text-blue-400 transition-colors">
                  • Sửa máy in & photocopy tận nơi
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-blue-400 transition-colors">
                  • Nạp mực máy in Canon, HP, Brother
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-blue-400 transition-colors">
                  • Nạp mực máy photocopy Ricoh, Toshiba
                </a>
              </li>
              <li>
                <a href="#bang-gia" className="hover:text-blue-400 transition-colors">
                  • Thay trống Drum, gạt, bao lụa sấy
                </a>
              </li>
              <li>
                <a href="#san-pham" className="hover:text-blue-400 transition-colors">
                  • Bán máy in cũ lướt & mới chính hãng
                </a>
              </li>
              <li>
                <a href="#bao-tri" className="hover:text-blue-400 transition-colors">
                  • Gói bảo trì định kỳ doanh nghiệp & cơ quan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Google Maps (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ Kỹ Thuật Trưởng
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Địa chỉ tiệm:</span>
                  <span className="text-white font-medium">{STORE_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Hotline Kỹ Thuật (Mr. Ân):</span>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-amber-400 hover:text-amber-300 font-bold text-sm block"
                  >
                    {STORE_INFO.displayPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Giờ làm việc:</span>
                  <span className="text-white font-medium">{STORE_INFO.workingHours}</span>
                </div>
              </div>

              {/* Action Buttons: Direct Call, Zalo, Google Maps */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi Điện</span>
                </a>
                <a
                  href={STORE_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-xl text-xs transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </a>
                <a
                  href={STORE_INFO.mapsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold py-2 px-2 rounded-xl text-xs transition-colors border border-slate-700"
                >
                  <Navigation className="w-3.5 h-3.5 text-rose-400" />
                  <span>Chỉ Đường</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Invoices Note */}
        <div className="py-6 border-b border-slate-800/80 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{STORE_INFO.invoiceNotice}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Khu vực hỗ trợ tận nơi: Tây Ninh, Hòa Thành, Châu Thành, Gò Dầu, Trảng Bàng, Tân Biên, Dương Minh Châu.</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {STORE_INFO.companyName}. Đã đăng ký bản quyền thương hiệu.</p>
          <p className="flex items-center gap-1 justify-center">
            <span>Kỹ thuật trưởng:</span>
            <strong className="text-slate-400">{STORE_INFO.technicianName}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

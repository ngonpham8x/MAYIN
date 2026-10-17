import React from 'react';
import { MapPin, Navigation, Phone, Clock, ExternalLink, CheckCircle2, Car, Compass, Send } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';

export const GoogleMapsLocation: React.FC = () => {
  return (
    <section id="vi-tri" className="py-12 sm:py-16 bg-white border-b border-slate-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-rose-100">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Vị Trí & Bản Đồ Google Maps</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vị Trí Cửa Hàng & Khu Vực Phục Vụ Tận Nơi
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            Quý khách có thể mang máy đến trực tiếp tiệm để test lấy liền, hoặc gọi kỹ thuật trưởng <strong className="text-slate-900">Mr. Ân (0938.386.326)</strong> để được hỗ trợ sửa chữa và nạp mực tận nơi tại Tây Ninh.
          </p>
        </div>

        {/* Map & Store Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Clear Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
            {/* Map Top Bar */}
            <div className="bg-slate-900 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-semibold truncate">Bản Đồ Google Maps Trực Quan</span>
              </div>
              <a
                href={STORE_INFO.mapsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 rounded-md transition-colors shrink-0 text-[11px] sm:text-xs"
              >
                <span>Mở Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Maps iframe */}
            <div className="relative w-full h-[300px] sm:h-[380px] bg-slate-100">
              <iframe
                title={`Bản đồ vị trí ${STORE_INFO.companyName} Tây Ninh`}
                src={STORE_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Map Address & Link Below Map */}
            <div className="p-3 sm:p-3.5 bg-slate-50 border-t border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-slate-700 text-[11px] sm:text-xs">
                <Car className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Số 9B Hẻm 14 Hoàng Lê Kha, ô tô đậu trước tiệm thoải mái.</span>
              </div>
              <a
                href={STORE_INFO.mapsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-bold flex items-center gap-1 shrink-0 text-[11px] sm:text-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ đường tới tiệm &rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Store Details & Areas Covered */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Contact Details Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Thông Tin Cửa Hàng & Hotline</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-[11px] block">Địa chỉ:</span>
                    <strong className="text-slate-900 font-semibold">{STORE_INFO.address}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-[11px] block">Kỹ thuật trưởng (Mr. Ân):</span>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-sm"
                    >
                      {STORE_INFO.displayPhone}
                    </a>
                    <span className="text-slate-400 text-[11px] block">Hỗ trợ kỹ thuật 24/7</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 text-[11px] block">Giờ phục vụ:</span>
                    <span className="text-slate-800 font-medium">{STORE_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Call & Directions Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs text-center truncate"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>Gọi Mr. Ân</span>
                </a>

                <a
                  href={STORE_INFO.mapsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs text-center truncate"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>Chỉ Đường</span>
                </a>
              </div>
            </div>

            {/* Coverage Areas Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 sm:p-5">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Khu Vực Kỹ Thuật Phục Vụ Tận Nơi</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                {STORE_INFO.areasCovered.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-slate-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

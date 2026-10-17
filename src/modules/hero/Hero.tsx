import React from 'react';
import { Phone, ArrowRight, Send } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';
import { BDLogo } from '../layout/BDLogo';

export interface HeroProps {
  onQuickBookClick?: () => void;
  onSelectIssue?: (issueLabel: string) => void;
  onOpenChat?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100 w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Tag with BD Logo */}
        <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-800 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs mb-4">
          <BDLogo size={22} className="shrink-0" />
          <span className="font-bold tracking-tight">{STORE_INFO.companyName}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
        </div>

        {/* Main Title */}
        <h1 className="text-xl min-[360px]:text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Sửa Chữa & Kinh Doanh <br className="hidden sm:inline" />
          <span className="text-blue-600 block sm:inline">
            Thiết Bị Văn Phòng • Máy In • Photocopy
          </span>
        </h1>

        {/* Description matching exact Zalo bio */}
        <p className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-base sm:leading-relaxed max-w-3xl mx-auto px-1">
          {STORE_INFO.tagline}. Phụ trách kỹ thuật: <strong className="text-slate-900">{STORE_INFO.technicianName}</strong> ({STORE_INFO.displayPhone}). Phục vụ tận nơi tại Tây Ninh. Nạp mực, sửa kẹt giấy, thay linh kiện chính hãng, bảo trì định kỳ cho cơ quan & doanh nghiệp.
        </p>

        {/* 3 Guarantees Badges - Clean & Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 max-w-2xl mx-auto pt-5 sm:pt-6">
          <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 text-center">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">📋 Báo Giá Zalo</span>
            <span className="text-[11px] text-slate-500 block truncate">100% minh bạch & uy tín</span>
          </div>
          <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 text-center">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">🛡️ Bảo Hành Dài</span>
            <span className="text-[11px] text-slate-500 block truncate">Linh kiện chuẩn 3-12 tháng</span>
          </div>
          <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 text-center">
            <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">☎️ 0938.386.326</span>
            <span className="text-[11px] text-slate-500 block truncate">Mr. Ân trực tư vấn 24/7</span>
          </div>
        </div>

        {/* Main Action CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-2.5 pt-5 sm:pt-6">
          <a
            href="#bang-gia"
            className="w-full sm:w-auto min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 sm:px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md"
          >
            <span>Bảng Giá & Báo Giá Zalo</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>

          <a
            href={STORE_INFO.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Send className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Nhắn Zalo Mr. Ân</span>
          </a>

          <a
            href={`tel:${STORE_INFO.phone}`}
            className="w-full sm:w-auto min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>Gọi Hotline: {STORE_INFO.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MAINTENANCE_PLANS } from '../../data';
import { STORE_INFO } from '../../config/store.config';
import { ShieldCheck, CheckCircle2, Phone, Send, X, Building2, UserCheck, Check, Sparkles } from 'lucide-react';

export interface MaintenancePlansProps {
  onRequestConsultation?: (planName: string) => void;
}

export const MaintenancePlans: React.FC<MaintenancePlansProps> = ({ onRequestConsultation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Gói Doanh Nghiệp Tiêu Chuẩn');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [printerCount, setPrinterCount] = useState('3 - 5 máy');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleOpenConsultation = (planName: string) => {
    setSelectedPlan(planName);
    setSubmitted(false);
    setModalOpen(true);
    if (onRequestConsultation) {
      onRequestConsultation(planName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone || !address) return;
    setSubmitted(true);
  };

  return (
    <section id="bao-tri" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Giải Pháp Ổn Định 100% Cho Công Việc In Ấn</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Dịch Vụ Bảo Trì Định Kỳ Văn Phòng & Doanh Nghiệp
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base">
            Không lo máy in hỏng đột xuất giữa kỳ báo cáo, không lo kẹt giấy gián đoạn công việc. Cam kết <strong className="text-slate-900">cho mượn máy in thay thế miễn phí</strong> và hỗ trợ tận nơi nhanh chóng khi có sự cố.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {MAINTENANCE_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border transition-all p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md relative ${
                plan.isPopular
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs truncate ${
                      plan.isPopular
                        ? 'bg-blue-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                    {plan.targetAudience}
                  </p>
                  <div className="mt-3 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
                    <span className="text-[11px] text-slate-500 font-medium block">Chi phí bảo trì:</span>
                    <strong className="text-xs sm:text-sm text-blue-700 font-bold block truncate">
                      {plan.pricePerMonth}
                    </strong>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Quyền Lợi & Hạng Mục Định Kỳ:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commitments */}
                <div className="border-t border-slate-100 pt-3 mb-5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Cam Kết Dịch Vụ:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-500">
                    {plan.commitments.map((cmt, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span>{cmt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenConsultation(plan.name)}
                  className={`w-full font-bold py-2.5 px-2 rounded-xl text-xs transition-colors shadow-xs text-center truncate ${
                    plan.isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Đăng Ký Khảo Sát
                </button>

                <a
                  href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                    `Xin chào Mr. Ân, cơ quan/doanh nghiệp chúng tôi muốn tư vấn: ${plan.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1 text-center truncate"
                >
                  <Send className="w-3 h-3 shrink-0" />
                  <span>Zalo Tư Vấn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Modal via React Portal */}
      {modalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Tiếp Nhận Đăng Ký Khảo Sát!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Cảm ơn bạn! Kỹ thuật trưởng Mr. Ân sẽ liên hệ lại qua SĐT/Zalo <strong>{phone}</strong> để tư vấn phương án bảo trì tối ưu nhất cho {companyName || 'quý khách'}.
                </p>
                
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Gọi Mr. Ân: {STORE_INFO.displayPhone}</span>
                  </a>

                  <a
                    href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                      `Xin chào Mr. Ân, tôi vừa đăng ký khảo sát gói [${selectedPlan}] (Đơn vị: ${companyName}, Liên hệ: ${contactName}, SĐT: ${phone}, Số máy: ${printerCount}, Địa chỉ: ${address}). Nhờ Mr. Ân hỗ trợ tư vấn giúp nhé!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Nhắn Zalo Mr. Ân</span>
                  </a>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2 rounded-xl text-xs mt-2"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Đăng Ký Khảo Sát Miễn Phí</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">{selectedPlan}</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tên Cơ Quan / Doanh Nghiệp / Cá Nhân *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="VD: Công ty TNHH ABC Tây Ninh..."
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Người Liên Hệ *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="Họ và tên..."
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Số Điện Thoại / Zalo *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="09xx..."
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Số Lượng Máy In Dự Kiến Bảo Trì</label>
                    <select
                      value={printerCount}
                      onChange={e => setPrinterCount(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                    >
                      <option>1 - 2 máy</option>
                      <option>3 - 5 máy</option>
                      <option>6 - 10 máy</option>
                      <option>&gt; 10 máy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Địa Chỉ Tận Nơi *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Số nhà, đường, phường/xã tại Tây Ninh..."
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Gửi Thông Tin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};


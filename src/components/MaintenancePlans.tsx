import React, { useState } from 'react';
import { MAINTENANCE_PLANS, STORE_INFO } from '../data/mockData';
import { ShieldCheck, CheckCircle2, Clock, Phone, Building2, UserCheck, FileCheck, Send, AlertCircle, X, MessageSquare } from 'lucide-react';

interface MaintenancePlansProps {
  onRequestConsultation: (planName: string) => void;
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
            Dịch Vụ Bảo Trì Định Kỳ Văn Phòng & Cá Nhân
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base">
            Không lo máy in hỏng đột xuất giữa kỳ báo cáo, không lo kẹt giấy gián đoạn công việc. Cam kết <strong>cho mượn máy in thay thế miễn phí</strong> và hỗ trợ tận nơi nhanh chóng khi có sự cố.
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
                <div className="mb-4 pt-1">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[30px]">
                    {plan.targetAudience}
                  </p>
                </div>

                <div className="py-3 sm:py-4 border-y border-slate-100 mb-5">
                  <span className="text-xs text-slate-400 block">Chi phí định kỳ:</span>
                  <div className="text-lg sm:text-xl font-black text-blue-700 mt-0.5 truncate">
                    {plan.pricePerMonth}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                    Miễn phí khảo sát & vệ sinh lần đầu
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Quyền Lợi Chi Tiết:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a
                  href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                    `Xin chào Mr. Ân, tôi quan tâm và cần tư vấn: ${plan.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1 text-center truncate"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>Nhắn Zalo</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.name);
                    setSubmitted(false);
                    setModalOpen(true);
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 text-center truncate"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Khảo Sát</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative">
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
                <h3 className="text-lg font-bold text-slate-900">Tiếp Nhận Đăng Ký Khảo Sát</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Cảm ơn bạn! Kỹ thuật trưởng Mr. Ân sẽ liên hệ lại qua SĐT/Zalo <strong>{phone}</strong> để tư vấn phương án bảo trì tối ưu nhất cho {companyName || 'quý khách'}.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs mt-2"
                >
                  Hoàn Tất
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
        </div>
      )}
    </section>
  );
};

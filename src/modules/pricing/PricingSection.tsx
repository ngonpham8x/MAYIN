import React, { useState } from 'react';
import { STORE_INFO } from '../../config/store.config';
import { ShieldCheck, Search, Calculator, CheckCircle2, Phone, Sparkles, Settings, Send, Lock, Eye, X, Image as ImageIcon } from 'lucide-react';
import { PricingItem, PriceDisplayMode } from '../../types';

export interface PricingSectionProps {
  pricingList: PricingItem[];
  priceDisplayMode: PriceDisplayMode;
  isAdminLoggedIn?: boolean;
  onOpenSettings: () => void;
  onSelectServiceToBook: (serviceName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingList = [],
  priceDisplayMode = 'zalo_contact',
  isAdminLoggedIn = false,
  onOpenSettings,
  onSelectServiceToBook,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ink' | 'parts' | 'repair' | 'software'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // Interactive Calculator State
  const [calcBrand, setCalcBrand] = useState('Canon');
  const [calcIssue, setCalcIssue] = useState('ink_refill');

  const categories = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'ink', label: 'Nạp Mực' },
    { key: 'parts', label: 'Linh Kiện' },
    { key: 'repair', label: 'Sửa Bo Mạch' },
    { key: 'software', label: 'Phần Mềm / Mạng' }
  ];

  const filteredPricing = (pricingList || []).filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.applicableModels.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCalculatorEstimate = () => {
    const issueMap: Record<string, string> = {
      ink_refill: 'Nạp mực tận nơi',
      paper_jam: 'Sửa kẹt giấy & cụm sấy',
      black_stripes: 'Thay trống Drum / gạt mực sọc đen',
      no_paper_pickup: 'Thay quả đào kéo giấy',
      no_power: 'Sửa nguồn / bo mạch máy in',
      wifi_driver: 'Cài đặt Driver chia sẻ in mạng Wifi/LAN'
    };

    return {
      issueName: issueMap[calcIssue] || 'Kiểm tra lỗi tổng quát',
      note: 'Mr. Ân trực tiếp tư vấn chi tiết đúng dòng máy và tình trạng'
    };
  };

  const calcResult = getCalculatorEstimate();

  const renderDisplayPrice = (item: PricingItem) => {
    if (priceDisplayMode === 'zalo_contact') {
      return (
        <span className="text-blue-700 font-bold text-xs sm:text-sm">
          Gọi / Zalo {STORE_INFO.displayPhone}
        </span>
      );
    }
    if (item.rawPrice) {
      return (
        <span className="text-blue-700 font-black text-sm sm:text-base">
          {item.rawPrice.toLocaleString('vi-VN')} đ
        </span>
      );
    }
    return (
      <span className="text-blue-700 font-bold text-xs sm:text-sm">
        {item.price || `Gọi / Zalo ${STORE_INFO.displayPhone}`}
      </span>
    );
  };

  return (
    <section id="bang-gia" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Niêm Yết Rõ Ràng • Báo Giá Chuẩn</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Bảng Giá Dịch Vụ & Báo Giá Zalo Nhanh
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-base">
            Mọi dịch vụ đều được báo trước rõ ràng, bảo hành chu đáo tận nơi bởi <strong className="text-slate-900">{STORE_INFO.technicianName}</strong>. Không phát sinh chi phí ẩn.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={onOpenSettings}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs border ${
                isAdminLoggedIn
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200'
              }`}
              title={isAdminLoggedIn ? 'Quản lý bảng giá (Đã đăng nhập)' : 'Đăng nhập để chỉnh sửa bảng giá'}
            >
              {isAdminLoggedIn ? (
                <Settings className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-slate-500" />
              )}
              <span>Cài Đặt & Chỉnh Sửa Bảng Giá</span>
              {isAdminLoggedIn && (
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                  Quản trị viên
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Instant Estimator Box */}
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-4 sm:p-6 mb-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="p-2 bg-blue-100 rounded-xl text-blue-600 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Ước Tính Nhanh Chi Phí Xử Lý Máy In Của Bạn
              </h3>
              <p className="text-xs text-slate-500">
                Chọn hãng máy và hiện tượng đang gặp phải để nhận hướng xử lý và liên hệ Mr. Ân
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Brand Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hãng máy in của bạn:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {['Canon', 'HP', 'Brother', 'Epson', 'Pantum'].map(b => (
                  <button
                    key={b}
                    onClick={() => setCalcBrand(b)}
                    className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition-all ${
                      calcBrand === b
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Issue Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tình trạng / Hiện tượng máy in:
              </label>
              <select
                value={calcIssue}
                onChange={e => setCalcIssue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="ink_refill">Nạp mực / Hết mực / In mờ</option>
                <option value="paper_jam">Kẹt giấy / Giấy nhăn ở cụm sấy</option>
                <option value="black_stripes">Bản in bị vệt đen dọc / Sọc đen / Chấm đen</option>
                <option value="no_paper_pickup">Không kéo được giấy / Kéo nhiều tờ</option>
                <option value="no_power">Mất nguồn / Không lên điện / Cắm nhầm điện</option>
                <option value="wifi_driver">Lỗi chia sẻ mạng LAN / Cài Driver Wifi</option>
              </select>
            </div>
          </div>

          {/* Result Banner */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-blue-900 font-semibold mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Giải pháp khuyến nghị cho <strong>{calcBrand}</strong>:</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {calcResult.issueName}
              </p>
              <p className="text-[11px] text-slate-600">
                {calcResult.note}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
              <a
                href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                  `Xin chào Mr. Ân, máy in ${calcBrand} của tôi đang gặp tình trạng: ${calcResult.issueName}. Xin báo giá và hướng dẫn xử lý giúp tôi!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nhận Báo Giá Zalo</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi Mr. Ân</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 bg-slate-200/70 p-1 rounded-xl max-w-full">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 whitespace-nowrap min-h-[38px] flex items-center justify-center ${
                  activeCategory === cat.key
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm dịch vụ, model máy (Canon 2900, 12A...)"
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3 px-4">Tên Dịch Vụ / Hạng Mục</th>
                <th className="py-3 px-4">Áp Dụng Cho Model</th>
                <th className="py-3 px-4">Báo Giá</th>
                <th className="py-3 px-4">Bảo Hành</th>
                <th className="py-3 px-4 text-right">Liên Hệ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPricing.map(item => (
                <tr key={item.id} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setPreviewImage({ url: item.imageUrl!, title: item.serviceName })}
                          className="relative group shrink-0"
                          title="Nhấp để xem ảnh phóng to"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.serviceName}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 group-hover:scale-105 transition-transform shadow-xs"
                          />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
                            <Eye className="w-3.5 h-3.5 text-white" />
                          </div>
                        </button>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 group-hover:text-blue-700">
                            {item.serviceName}
                          </span>
                          {item.popular && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                              Phổ Biến
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5 max-w-md">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.applicableModels}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {renderDisplayPrice(item)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px] border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      {item.warranty}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                          `Xin chào Mr. Ân, tôi cần báo giá dịch vụ: ${item.serviceName} (${item.applicableModels}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] transition-colors shadow-xs inline-flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Zalo</span>
                      </a>
                      <a
                        href={`tel:${STORE_INFO.phone}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] transition-colors shadow-xs inline-flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Gọi</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards View */}
        <div className="lg:hidden space-y-3">
          {filteredPricing.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2.5"
            >
              <div className="flex items-start gap-3">
                {item.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewImage({ url: item.imageUrl!, title: item.serviceName })}
                    className="relative group shrink-0"
                    title="Xem ảnh"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.serviceName}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                  </button>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.serviceName}
                    </h4>
                    {item.popular && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        Phổ Biến
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">
                    Dòng máy: {item.applicableModels}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Giá niêm yết:</span>
                <div>{renderDisplayPrice(item)}</div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                <span className="text-emerald-800 font-medium">Bảo hành:</span>
                <span className="font-bold text-emerald-700">{item.warranty}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                    `Xin chào Mr. Ân, tôi cần báo giá dịch vụ: ${item.serviceName} (${item.applicableModels}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Nhắn Zalo</span>
                </a>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="w-full min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Gọi Mr. Ân</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-xs truncate max-w-[85%]">{previewImage.title}</span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
                title="Đóng ảnh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 bg-slate-100 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

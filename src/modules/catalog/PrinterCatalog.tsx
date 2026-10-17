import React, { useState } from 'react';
import { PRINTER_PRODUCTS, STORE_INFO } from '../../data';
import { PrinterProduct } from '../../types';
import { ShoppingCart, CheckCircle2, Gift, Phone, Eye, Sparkles, Filter, ShieldCheck, ArrowRight, X, Send } from 'lucide-react';
import { PrinterDeviceVisual } from './PrinterDeviceVisual';

interface PrinterCatalogProps {
  onAddToCart: (product: PrinterProduct) => void;
  onOpenOrderModal: (product: PrinterProduct) => void;
}

export const PrinterCatalog: React.FC<PrinterCatalogProps> = ({
  onAddToCart,
  onOpenOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'used' | 'new' | 'canon' | 'hp' | 'brother' | 'epson'>('all');
  const [selectedProduct, setSelectedProduct] = useState<PrinterProduct | null>(null);

  const tabs = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'used', label: 'Máy In Cũ Zin' },
    { key: 'new', label: 'Máy In Mới 100%' },
    { key: 'canon', label: 'Canon' },
    { key: 'hp', label: 'HP' },
    { key: 'brother', label: 'Brother' },
    { key: 'epson', label: 'Epson (Màu)' },
  ];

  const filteredProducts = PRINTER_PRODUCTS.filter(product => {
    if (activeTab === 'all') return true;
    if (activeTab === 'used') return product.condition === 'used';
    if (activeTab === 'new') return product.condition === 'new';
    if (activeTab === 'canon') return product.brand === 'Canon';
    if (activeTab === 'hp') return product.brand === 'HP';
    if (activeTab === 'brother') return product.brand === 'Brother';
    if (activeTab === 'epson') return product.brand === 'Epson';
    return true;
  });

  return (
    <section id="san-pham" className="py-12 sm:py-16 bg-white border-b border-slate-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Máy In Cũ & Mới Nguyên Bản 100%</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Kho Máy In Cũ Lướt & Mới Chính Hãng
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-2xl">
              Máy cũ tuyển chọn nguyên zin (Canon 2900, HP 1020, Brother 2 mặt Wifi...) đã được <strong className="text-slate-900">Mr. Ân</strong> test kỹ, thay bao lụa mới và tặng kèm hộp mực mới 100%. Giao hàng, cài đặt tận nhà miễn phí.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-slate-900">Cam Kết Chất Lượng</p>
              <p className="text-slate-500">1 đổi 1 trong 30 ngày • Bảo hành tận nơi</p>
            </div>
          </div>
        </div>

        {/* Tab Filters - Mobile scroll & swipe friendly */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 mb-6 sm:mb-8 border-b border-slate-200 pb-3 sm:pb-4 max-w-full">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 min-h-[38px] ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <PrinterDeviceVisual
                    product={product}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {product.badge && (
                      <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs truncate">
                        {product.badge}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                        product.condition === 'new'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-slate-950 font-black'
                      }`}
                    >
                      {product.condition === 'new' ? 'MỚI 100%' : 'CŨ LIKE NEW'}
                    </span>
                  </div>

                  {/* Quick View Button Overlay */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-2.5 right-2.5 bg-white/95 hover:bg-white text-slate-800 p-1.5 sm:p-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 transition-opacity"
                    title="Xem chi tiết máy in"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-[11px]">Chi tiết</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-blue-600">{product.brand}</span>
                    <span className="text-[11px]">{product.conditionText}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="font-bold text-slate-900 text-sm sm:text-base leading-snug hover:text-blue-600 cursor-pointer transition-colors line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  {/* Price: Zalo or Phone */}
                  <div className="mt-3 bg-blue-50/70 border border-blue-200/60 rounded-xl p-2.5 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 font-medium block">Báo giá máy:</span>
                      <strong className="text-xs font-bold text-blue-700 block truncate">Gọi hoặc nhắn Zalo</strong>
                    </div>
                    <span className="text-xs font-bold text-blue-700 shrink-0">{STORE_INFO.displayPhone}</span>
                  </div>

                  {/* Specs Pill List */}
                  <div className="mt-3 py-2 border-y border-slate-100 space-y-1 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tốc độ in:</span>
                      <strong className="text-slate-800">{product.specs.speed}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kết nối:</span>
                      <strong className="text-slate-800 truncate max-w-[150px] text-right">{product.specs.connection}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Đảo mặt:</span>
                      <strong className="text-slate-800">{product.specs.duplex}</strong>
                    </div>
                  </div>

                  {/* Gifts */}
                  <div className="mt-3 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-amber-800">
                      <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Quà tặng kèm theo máy:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-800/90 pl-1">
                      {product.gifts.slice(0, 2).map((g, i) => (
                        <li key={i} className="truncate">{g}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Warranty */}
                  <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{product.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Zalo & Phone */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <a
                  href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                    `Xin chào Mr. Ân, tôi cần báo giá và tư vấn mua máy in: ${product.name} (${product.conditionText}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs text-center truncate"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>Nhắn Zalo</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="w-full min-h-[44px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-2.5 px-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 text-center truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Gọi Mr. Ân</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Free consultation banner */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">Chưa Biết Nên Mua Máy In Nào Phù Hợp Nhu Cầu?</h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
              Đừng lo! Hãy để Mr. Ân tư vấn chính xác theo nhu cầu in của bạn (in đơn hàng Shopee/Lazada, in tài liệu học tập, in văn phòng 2 mặt, in màu...). Tiết kiệm tối đa chi phí mua máy và nạp mực sau này.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md text-center"
            >
              <Phone className="w-4 h-4 animate-ring shrink-0" />
              <span>Gọi: {STORE_INFO.displayPhone}</span>
            </a>
            <a
              href={STORE_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-900 hover:bg-slate-100 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 text-center"
            >
              <Send className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Chat Zalo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="sm:w-1/2">
                <div className="w-full h-48 sm:h-56 rounded-xl border border-slate-200 overflow-hidden">
                  <PrinterDeviceVisual
                    product={selectedProduct}
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-2.5 text-center">
                  <span className="text-xs text-slate-500 font-medium">Tình trạng máy:</span>
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{selectedProduct.conditionText}</p>
                </div>
              </div>

              <div className="sm:w-1/2 space-y-2.5">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedProduct.brand}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h3>

                <div className="p-2.5 bg-blue-50/70 border border-blue-200/60 rounded-xl">
                  <span className="text-[11px] text-slate-500 font-medium block">Báo giá máy:</span>
                  <span className="text-sm sm:text-base font-extrabold text-blue-700 block mt-0.5 truncate">
                    Gọi hoặc nhắn Zalo {STORE_INFO.displayPhone}
                  </span>
                </div>

                <div className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{selectedProduct.warranty}</span>
                </div>

                {/* Specs List */}
                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <p><strong>Loại máy:</strong> {selectedProduct.specs.type}</p>
                  <p><strong>Chức năng:</strong> {selectedProduct.specs.functions}</p>
                  <p><strong>Tốc độ:</strong> {selectedProduct.specs.speed}</p>
                  <p><strong>Kết nối:</strong> {selectedProduct.specs.connection}</p>
                  <p><strong>In 2 mặt:</strong> {selectedProduct.specs.duplex}</p>
                  <p><strong>Hộp mực:</strong> {selectedProduct.specs.cartridge}</p>
                </div>
              </div>
            </div>

            {/* Features & Gifts */}
            <div className="mt-5 pt-4 border-t border-slate-200 space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5">Đặc Điểm Nổi Bật:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5 mb-1">
                  <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Gói Quà Tặng Độc Quyền Khi Mua Máy:
                </h4>
                <ul className="text-xs text-amber-800 space-y-0.5 pl-1">
                  {selectedProduct.gifts.map((gift, idx) => (
                    <li key={idx}>• {gift}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`https://zalo.me/${STORE_INFO.phone}?text=${encodeURIComponent(
                  `Xin chào Mr. Ân, tôi cần báo giá và tư vấn mua máy in: ${selectedProduct.name} (${selectedProduct.conditionText}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Nhắn Tin Zalo Mr. Ân</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="w-full min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Gọi Mr. Ân: {STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

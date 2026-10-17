import React, { useState } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus, CheckCircle2, Phone, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, PrinterProduct } from '../../types';
import { STORE_INFO } from '../../config/store.config';
import { PrinterDeviceVisual } from '../catalog/PrinterDeviceVisual';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl relative">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shrink-0">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {step === 'cart' ? 'Giỏ Hàng Máy In' : step === 'checkout' ? 'Xác Nhận Đặt Hàng' : 'Đặt Hàng Thành Công'}
              </h3>
              <p className="text-xs text-slate-500">Miễn phí giao hàng & lắp đặt tận nơi tại Tây Ninh</p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              if (step === 'success') {
                onClearCart();
                setStep('cart');
              }
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'cart' && (
          <div className="py-3">
            {cart.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <ShoppingCart className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs sm:text-sm font-semibold text-slate-600">Giỏ hàng của bạn đang trống</p>
                <p className="text-[11px] text-slate-400">Hãy chọn một chiếc máy in phù hợp để đặt mua</p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
                >
                  Xem Danh Mục Máy In &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border border-slate-200 overflow-hidden shrink-0">
                        <PrinterDeviceVisual
                          product={item.product}
                          className="w-full h-full"
                          showBadge={false}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{item.product.name}</h4>
                        <p className="text-slate-500 text-[11px] truncate">{item.product.conditionText}</p>
                        <span className="font-bold text-blue-700 block mt-0.5 text-[11px]">
                          Báo giá: Gọi hoặc nhắn Zalo
                        </span>
                      </div>

                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold px-1 text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 shrink-0"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Vận chuyển & lắp đặt tận nơi:</span>
                    <span className="text-emerald-600 font-bold">MIỄN PHÍ</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm font-black text-slate-900">
                    <span>Báo giá chính thức:</span>
                    <span className="text-blue-700 font-bold">Gọi hoặc nhắn Zalo Mr. Ân</span>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs text-center truncate"
                  >
                    Chọn Thêm
                  </button>
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md text-center truncate"
                  >
                    Tiếp Tục Đặt Hàng
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && (
          <form onSubmit={handleCheckout} className="py-3 space-y-3.5">
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Họ và tên..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Số điện thoại / Zalo *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Số điện thoại nhận máy..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Địa chỉ giao máy tận nơi *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Địa chỉ giao hàng tại Tây Ninh..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ghi chú thêm</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Cần cài đặt máy in cho mấy máy tính, xuất hóa đơn VAT..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-xs"
                />
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
              >
                Quay Lại
              </button>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
              >
                Gửi Đơn Hàng
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Đặt Hàng Thành Công!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Mã đơn: <strong className="text-blue-600">{orderId}</strong>. Kỹ thuật trưởng Mr. Ân sẽ liên hệ xác nhận và giao máy đến <strong>{address}</strong> cho bạn sớm nhất!
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
                  `Xin chào Mr. Ân, tôi vừa đặt đơn máy in mã ${orderId} (Tên: ${customerName}, SĐT: ${phone}, Đ/C: ${address}). Nhờ Mr. Ân xác nhận qua Zalo giúp tôi nhé!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nhắn Zalo Mr. Ân</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Phone, Clock, Settings, ShoppingCart, Menu, X, Send, ShieldCheck, Lock, LogOut } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';
import { CartItem } from '../../types/cart.types';
import { BDLogo } from './BDLogo';

export interface HeaderProps {
  cart: CartItem[];
  isAdminLoggedIn?: boolean;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenSettings: () => void;
  onAdminLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  isAdminLoggedIn = false,
  onOpenCart,
  onOpenChat: _onOpenChat,
  onOpenSettings,
  onAdminLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs w-full overflow-hidden">
      {/* Top Bar: Clean, Informative, Mobile-Safe */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs min-w-0 truncate">
            <span className="flex items-center gap-1.5 text-white font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Kỹ thuật: <strong className="text-white">{STORE_INFO.technicianName}</strong>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400 truncate">
              <Clock className="w-3 h-3 text-blue-400 shrink-0" />
              {STORE_INFO.emergencyService}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            {isAdminLoggedIn && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Quản trị viên
              </span>
            )}
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 tracking-tight text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{STORE_INFO.displayPhone}</span>
            </a>
            <a
              href={STORE_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] sm:text-xs bg-blue-950 px-2 py-0.5 rounded border border-blue-800"
            >
              Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-17 gap-1">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2 min-w-0 group py-1">
            <BDLogo size={36} className="shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-base font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors uppercase truncate">
                  {STORE_INFO.companyName}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate hidden min-[360px]:block">
                Sửa Chữa & Kinh Doanh Thiết Bị Văn Phòng
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#dich-vu" className="hover:text-blue-600 transition-colors">
              Dịch Vụ
            </a>
            <a href="#bang-gia" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
              Báo Giá Zalo
            </a>
            <a href="#san-pham" className="hover:text-blue-600 transition-colors">
              Máy In Cũ & Mới
            </a>
            <a href="#bao-tri" className="hover:text-blue-600 transition-colors">
              Bảo Trì Định Kỳ
            </a>
            <a href="#vi-tri" className="hover:text-blue-600 transition-colors">
              Bản Đồ Tiệm
            </a>

            {/* Menu Cài Đặt Giá & Dịch Vụ - Có bảo vệ đăng nhập */}
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenSettings}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition-all text-xs ${
                  isAdminLoggedIn
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200'
                }`}
                title={isAdminLoggedIn ? 'Cài đặt bảng giá & dịch vụ (Đã đăng nhập)' : 'Cài đặt giá & dịch vụ (Yêu cầu đăng nhập quản trị)'}
              >
                {isAdminLoggedIn ? (
                  <Settings className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                )}
                <span>Cài Đặt Giá & Dịch Vụ</span>
                {isAdminLoggedIn && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>

              {isAdminLoggedIn && onAdminLogout && (
                <button
                  onClick={onAdminLogout}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                  title="Đăng xuất quản trị"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.displayPhone}</span>
            </a>

            {/* Settings button on medium screens */}
            <button
              onClick={onOpenSettings}
              className={`hidden lg:inline-flex xl:hidden p-2 rounded-xl border ${
                isAdminLoggedIn
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
              title={isAdminLoggedIn ? 'Cài đặt giá & dịch vụ (Đã đăng nhập)' : 'Cài đặt giá & dịch vụ (Yêu cầu đăng nhập)'}
            >
              {isAdminLoggedIn ? (
                <Settings className="w-4 h-4 text-emerald-600" />
              ) : (
                <Lock className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              title="Giỏ hàng máy in"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white rounded-full text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Quick Pricing CTA on sm+ */}
            <a
              href="#bang-gia"
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors shadow-xs shrink-0"
            >
              Báo Giá Nhanh
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          {/* Quick Menu Button: Cài Đặt Giá & Dịch Vụ */}
          <div className="space-y-1.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl border font-bold transition-colors text-xs ${
                isAdminLoggedIn
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {isAdminLoggedIn ? (
                  <Settings className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-500" />
                )}
                <span>Cài Đặt Giá & Dịch Vụ</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isAdminLoggedIn ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {isAdminLoggedIn ? 'Đã đăng nhập' : 'Cần đăng nhập'}
              </span>
            </button>

            {isAdminLoggedIn && onAdminLogout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminLogout();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất tài khoản quản trị</span>
              </button>
            )}
          </div>

          <nav className="flex flex-col space-y-1 text-xs font-semibold">
            <a
              href="#dich-vu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Dịch Vụ Sửa Chữa & Nạp Mực
            </a>
            <a
              href="#bang-gia"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-blue-700 font-bold bg-slate-50 rounded-xl"
            >
              Báo Giá Zalo & Hotline
            </a>
            <a
              href="#san-pham"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Kho Máy In Cũ & Mới Chính Hãng
            </a>
            <a
              href="#bao-tri"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Gói Bảo Trì Định Kỳ Doanh Nghiệp
            </a>
            <a
              href="#vi-tri"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              Bản Đồ Cửa Hàng (9B Hẻm 14 Hoàng Lê Kha)
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs text-center shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi Mr. Ân</span>
            </a>
            <a
              href={STORE_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded-xl text-xs text-center shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nhắn Zalo</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

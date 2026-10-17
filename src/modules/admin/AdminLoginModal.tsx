import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, Eye, EyeOff, X, CheckCircle2, RefreshCw } from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'change_password'>('login');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Change password form state
  const [cpUsername, setCpUsername] = useState('');
  const [cpOldPassword, setCpOldPassword] = useState('');
  const [cpNewPassword, setCpNewPassword] = useState('');
  const [cpConfirmPassword, setCpConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState<string | null>(null);
  const [changeError, setChangeError] = useState<string | null>(null);

  if (!isOpen) return null;

  const normalize = (val: string) => val.trim().replace(/[\s.-]/g, '');
  const defaultPhone = normalize(STORE_INFO.phone); // "0938386326"

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const storedPassword = localStorage.getItem('anphat_admin_password') || defaultPhone;
      const cleanUser = username.trim().toLowerCase();
      const normUser = normalize(cleanUser);
      const cleanPass = password.trim();

      // Tên đăng nhập mặc định là SĐT (0938386326, 0938.386.326) hoặc admin
      const isUserValid = normUser === defaultPhone || cleanUser === 'admin';

      // Mật khẩu: mật khẩu đã đổi hoặc mật khẩu mặc định là SĐT
      let isPassValid = false;
      if (cleanPass === storedPassword) {
        isPassValid = true;
      } else if (storedPassword === defaultPhone) {
        // Chưa đổi mật khẩu: mật khẩu mặc định là SĐT (cả dạng liền và có dấu chấm)
        if (normalize(cleanPass) === defaultPhone) {
          isPassValid = true;
        }
      }

      if (isUserValid && isPassValid) {
        const sessionData = {
          isLoggedIn: true,
          username: cleanUser,
          loginTime: Date.now(),
        };

        if (rememberMe) {
          localStorage.setItem('anphat_admin_session', JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem('anphat_admin_session', JSON.stringify(sessionData));
        }

        setIsLoading(false);
        setPassword('');
        setError(null);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!');
      }
    }, 250);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError(null);
    setChangeSuccess(null);

    const normUser = normalize(cpUsername.trim().toLowerCase());
    if (normUser !== defaultPhone && cpUsername.trim().toLowerCase() !== 'admin') {
      setChangeError('Tài khoản đăng nhập không chính xác!');
      return;
    }

    const storedPassword = localStorage.getItem('anphat_admin_password') || defaultPhone;
    const cleanOldPass = cpOldPassword.trim();

    // Check old password
    const isOldValid = cleanOldPass === storedPassword || (storedPassword === defaultPhone && normalize(cleanOldPass) === defaultPhone);
    if (!isOldValid) {
      setChangeError('Mật khẩu hiện tại không chính xác!');
      return;
    }

    if (cpNewPassword.trim().length < 4) {
      setChangeError('Mật khẩu mới phải có ít nhất 4 ký tự!');
      return;
    }

    if (cpNewPassword.trim() !== cpConfirmPassword.trim()) {
      setChangeError('Mật khẩu mới và xác nhận mật khẩu không trùng khớp!');
      return;
    }

    // Save new password
    localStorage.setItem('anphat_admin_password', cpNewPassword.trim());
    setChangeSuccess('Đã đổi mật khẩu mới thành công! Đang chuyển về màn hình đăng nhập...');
    
    // Auto switch back to login with new password prefilled for convenience
    setTimeout(() => {
      setUsername(cpUsername.trim());
      setPassword(cpNewPassword.trim());
      setCpOldPassword('');
      setCpNewPassword('');
      setCpConfirmPassword('');
      setChangeSuccess(null);
      setActiveTab('login');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl shrink-0">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">Quản Trị Hệ Thống</h3>
              <p className="text-[11px] text-slate-400">Kỹ Thuật Bảo Đạt - Thiết Bị Văn Phòng</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'login'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('change_password');
              setChangeError(null);
              setChangeSuccess(null);
              if (username) setCpUsername(username);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'change_password'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đổi Mật Khẩu
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {activeTab === 'login' ? (
            <>
              {error && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Tài khoản đăng nhập:
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Nhập tài khoản đăng nhập..."
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block font-bold text-slate-700">
                      Mật khẩu:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Ẩn' : 'Hiện'}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu..."
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all text-xs sm:text-sm pr-10"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Ghi nhớ đăng nhập trên máy này</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('change_password');
                      if (username) setCpUsername(username);
                    }}
                    className="text-blue-600 hover:underline font-medium text-[11px]"
                  >
                    Đổi mật khẩu?
                  </button>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {isLoading ? (
                      <span>Đang xác thực...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Đăng Nhập Quản Trị</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors text-xs"
                  >
                    Hủy Bỏ
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {changeSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{changeSuccess}</span>
                </div>
              )}

              {changeError && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{changeError}</span>
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tài khoản đăng nhập:
                  </label>
                  <input
                    type="text"
                    required
                    value={cpUsername}
                    onChange={e => setCpUsername(e.target.value)}
                    placeholder="Nhập tài khoản đăng nhập..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mật khẩu hiện tại:
                  </label>
                  <input
                    type="password"
                    required
                    value={cpOldPassword}
                    onChange={e => setCpOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block font-bold text-slate-700">
                      Mật khẩu mới:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showNewPassword ? 'Ẩn' : 'Hiện'}</span>
                    </button>
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={cpNewPassword}
                    onChange={e => setCpNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới (tối thiểu 4 ký tự)..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Xác nhận mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    required
                    value={cpConfirmPassword}
                    onChange={e => setCpConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Lưu Mật Khẩu Mới</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl transition-colors text-xs"
                  >
                    Quay Lại Đăng Nhập
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

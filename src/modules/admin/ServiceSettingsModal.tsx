import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, RefreshCw, Settings, ShieldCheck, Phone, Send, DollarSign, LogOut, KeyRound, AlertCircle, CheckCircle2, Image as ImageIcon, Upload, Camera } from 'lucide-react';
import { PricingItem, PriceDisplayMode } from '../../types';
import { STORE_INFO } from '../../config/store.config';

interface ServiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingList: PricingItem[];
  onSavePricingList: (updatedList: PricingItem[]) => void;
  priceDisplayMode: 'zalo_contact' | 'custom_price';
  onSavePriceDisplayMode: (mode: 'zalo_contact' | 'custom_price') => void;
  onResetDefaults: () => void;
  onLogout: () => void;
}

export const ServiceSettingsModal: React.FC<ServiceSettingsModalProps> = ({
  isOpen,
  onClose,
  pricingList,
  onSavePricingList,
  priceDisplayMode,
  onSavePriceDisplayMode,
  onResetDefaults,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'display_mode' | 'services_list' | 'add_service' | 'password'>('display_mode');
  const [currentMode, setCurrentMode] = useState<'zalo_contact' | 'custom_price'>(priceDisplayMode);
  const [editingItem, setEditingItem] = useState<PricingItem | null>(null);

  // New service form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'ink' | 'parts' | 'repair' | 'software'>('ink');
  const [newModels, setNewModels] = useState('');
  const [newPrice, setNewPrice] = useState('Gọi hoặc nhắn Zalo 0938.386.326');
  const [newWarranty, setNewWarranty] = useState('Bảo hành tận nơi chu đáo');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Image compression and encoding helper for client storage
  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, WebP)!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          callback(compressed);
        } else {
          callback(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveDisplayMode = () => {
    onSavePriceDisplayMode(currentMode);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa dịch vụ này khỏi bảng giá?')) {
      const updated = pricingList.filter(item => item.id !== id);
      onSavePricingList(updated);
    }
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = pricingList.map(item =>
      item.id === editingItem.id ? editingItem : item
    );
    onSavePricingList(updated);
    setEditingItem(null);
  };

  const handleAddNewService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const catNameMap = {
      ink: 'Nạp Mực / Bơm Mực Tận Nơi',
      parts: 'Thay Thế Linh Kiện Hao Mòn',
      repair: 'Sửa Chữa Phần Cứng & Bo Mạch',
      software: 'Cài Đặt Phần Mềm & Driver Mạng'
    };

    const newItem: PricingItem = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      categoryName: catNameMap[newCategory],
      serviceName: newName.trim(),
      applicableModels: newModels.trim() || 'Canon, HP, Brother, Epson...',
      price: newPrice.trim() || 'Gọi hoặc nhắn Zalo 0938.386.326',
      warranty: newWarranty.trim(),
      description: newDescription.trim() || 'Kỹ thuật viên kiểm tra tận nơi miễn phí, báo giá trước khi làm.',
      popular: true,
      imageUrl: newImageUrl.trim() || undefined
    };

    onSavePricingList([newItem, ...pricingList]);
    setNewName('');
    setNewModels('');
    setNewDescription('');
    setNewImageUrl('');
    setActiveTab('services_list');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    const defaultPhone = STORE_INFO.phone.replace(/[\s.-]/g, '');
    const currentSavedPass = localStorage.getItem('anphat_admin_password') || defaultPhone;
    const cleanOld = oldPassword.trim();
    const normOld = cleanOld.replace(/[\s.-]/g, '');

    const isOldValid = cleanOld === currentSavedPass || normOld === defaultPhone || (currentSavedPass === defaultPhone && cleanOld === '0938.386.326');
    if (!isOldValid) {
      setPasswordError('Mật khẩu hiện tại không đúng. Mật khẩu mặc định là số điện thoại của bạn.');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError('Mật khẩu mới phải có ít nhất 4 ký tự!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không trùng khớp!');
      return;
    }

    localStorage.setItem('anphat_admin_password', newPassword);
    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-blue-600 rounded-xl shrink-0">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white truncate">Cài Đặt Giá & Dịch Vụ</h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-emerald-900/80 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-700">
                  <ShieldCheck className="w-3 h-3" />
                  Đã Đăng Nhập Quản Trị
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">Hệ thống quản lý dành riêng cho kỹ thuật trưởng Mr. Ân</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Đăng xuất khỏi hệ thống quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher - Scrollable on mobile */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 pt-2.5 gap-1.5 shrink-0 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('display_mode');
              setEditingItem(null);
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'display_mode'
                ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Chế Độ Giá
          </button>

          <button
            onClick={() => {
              setActiveTab('services_list');
              setEditingItem(null);
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'services_list'
                ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Danh Sách Dịch Vụ ({pricingList.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('add_service');
              setEditingItem(null);
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'add_service'
                ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            + Thêm Dịch Vụ
          </button>

          <button
            onClick={() => {
              setActiveTab('password');
              setEditingItem(null);
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 shrink-0 ${
              activeTab === 'password'
                ? 'bg-white border-blue-600 text-blue-700 shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Đổi Mật Khẩu
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-xs sm:text-sm">
          {/* TAB 1: DISPLAY MODE CONFIG */}
          {activeTab === 'display_mode' && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 leading-relaxed">
                <strong className="block font-bold mb-1">Cấu hình hiển thị giá dịch vụ & máy in:</strong>
                Bạn có thể chọn ẩn giá niêm yết bằng số để khách hàng bấm gọi Zalo hoặc nhắn tin Zalo trực tiếp với Mr. Ân ({STORE_INFO.displayPhone}) nhận báo giá chính xác theo tình trạng máy.
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setCurrentMode('zalo_contact')}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    currentMode === 'zalo_contact'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="priceMode"
                    checked={currentMode === 'zalo_contact'}
                    onChange={() => setCurrentMode('zalo_contact')}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <strong className="text-slate-900 block text-sm font-bold">
                      Chế độ "Gọi hoặc nhắn Zalo" (Khuyên dùng)
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">
                      Xóa mức giá số tiền hiển thị, thay bằng nhãn <strong>"Gọi hoặc nhắn Zalo 0938.386.326"</strong> kèm nút bấm nhắn Zalo ngay.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setCurrentMode('custom_price')}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    currentMode === 'custom_price'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="priceMode"
                    checked={currentMode === 'custom_price'}
                    onChange={() => setCurrentMode('custom_price')}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <strong className="text-slate-900 block text-sm font-bold">
                      Chế độ "Hiển thị giá số tiền công khai"
                    </strong>
                    <p className="text-xs text-slate-500 mt-1">
                      Hiển thị trực tiếp mức giá số tiền cụ thể của từng dịch vụ mà bạn đã cấu hình bên tab "Danh Sách Dịch Vụ".
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleSaveDisplayMode();
                    alert('Đã cập nhật chế độ hiển thị giá thành công!');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Áp Dụng Chế Độ Này</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES LIST & QUICK EDIT */}
          {activeTab === 'services_list' && (
            <div className="space-y-4">
              {editingItem ? (
                <form onSubmit={handleUpdateItem} className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                    <span className="font-bold text-blue-900 text-xs sm:text-sm">Chỉnh Sửa Dịch Vụ: {editingItem.serviceName}</span>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Hủy chỉnh sửa
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tên dịch vụ:</label>
                    <input
                      type="text"
                      required
                      value={editingItem.serviceName}
                      onChange={e => setEditingItem({ ...editingItem, serviceName: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Dòng máy áp dụng:</label>
                      <input
                        type="text"
                        value={editingItem.applicableModels}
                        onChange={e => setEditingItem({ ...editingItem, applicableModels: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Giá / Nội dung liên hệ:</label>
                      <input
                        type="text"
                        value={editingItem.price}
                        onChange={e => setEditingItem({ ...editingItem, price: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Chế độ bảo hành:</label>
                    <input
                      type="text"
                      value={editingItem.warranty}
                      onChange={e => setEditingItem({ ...editingItem, warranty: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hình ảnh minh họa dịch vụ / linh kiện (Tùy chọn):
                    </label>
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                      {editingItem.imageUrl ? (
                        <div className="relative w-16 h-16 rounded-lg border border-slate-300 overflow-hidden shrink-0 group">
                          <img src={editingItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEditingItem({ ...editingItem, imageUrl: undefined })}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Xóa ảnh"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0 bg-slate-50">
                          <ImageIcon className="w-5 h-5 mb-0.5 text-slate-300" />
                          <span className="text-[9px]">Chưa có ảnh</span>
                        </div>
                      )}

                      <div className="flex-1 space-y-1.5">
                        <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3 h-3" />
                          <span>Tải ảnh từ máy / ĐT</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, url => setEditingItem({ ...editingItem, imageUrl: url }));
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={editingItem.imageUrl || ''}
                          onChange={e => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                          placeholder="Hoặc dán URL ảnh (https://...)"
                          className="w-full border border-slate-300 rounded-lg px-2.5 py-1 text-xs bg-white text-slate-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-slate-200 text-slate-700"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg text-xs bg-blue-600 text-white font-bold"
                    >
                      Lưu Thay Đổi
                    </button>
                  </div>
                </form>
              ) : null}

              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">
                  Tổng cộng: <strong>{pricingList.length}</strong> dịch vụ đang có
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Khôi phục danh sách dịch vụ về trạng thái ban đầu?')) {
                      onResetDefaults();
                    }
                  }}
                  className="text-xs text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Khôi phục mặc định</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {pricingList.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.serviceName}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 shadow-2xs"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                          {item.categoryName}
                        </span>
                        <strong className="text-slate-900 truncate block font-bold">
                          {item.serviceName}
                        </strong>
                      </div>
                      <p className="text-slate-500 text-[11px] truncate">Áp dụng: {item.applicableModels}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-blue-700 font-bold">{item.price}</span>
                        <span className="text-emerald-700">• {item.warranty}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors border border-slate-200"
                        title="Chỉnh sửa dịch vụ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-colors border border-slate-200"
                        title="Xóa dịch vụ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW SERVICE */}
          {activeTab === 'add_service' && (
            <form onSubmit={handleAddNewService} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tên Dịch Vụ / Linh Kiện Mới *:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Ví dụ: Thay mực máy in phun Epson màu vàng, Sửa lỗi kẹt giấy Ricoh..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phân loại:</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white"
                  >
                    <option value="ink">Nạp Mực / Bơm Mực</option>
                    <option value="parts">Linh Kiện Thay Thế</option>
                    <option value="repair">Sửa Chữa Phần Cứng</option>
                    <option value="software">Driver Mạng & Phần Mềm</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dòng máy áp dụng:</label>
                  <input
                    type="text"
                    value={newModels}
                    onChange={e => setNewModels(e.target.value)}
                    placeholder="Canon, HP, Ricoh, Toshiba..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nội dung báo giá / Zalo:</label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    placeholder="Gọi hoặc nhắn Zalo 0938.386.326"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Chế độ bảo hành:</label>
                  <input
                    type="text"
                    value={newWarranty}
                    onChange={e => setNewWarranty(e.target.value)}
                    placeholder="Bảo hành tận nơi 3 - 6 tháng"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả dịch vụ:</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Mô tả công việc, linh kiện thay thế..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đính kèm hình ảnh minh họa (Tùy chọn):
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {newImageUrl ? (
                    <div className="relative w-20 h-20 rounded-xl border border-slate-300 overflow-hidden shrink-0 group shadow-xs">
                      <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewImageUrl('')}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-xs"
                        title="Xóa ảnh"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 shrink-0 bg-white">
                      <ImageIcon className="w-6 h-6 mb-1 text-slate-300" />
                      <span className="text-[10px]">Chưa có ảnh</span>
                    </div>
                  )}

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs cursor-pointer transition-colors shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy / điện thoại</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, setNewImageUrl);
                          }}
                        />
                      </label>
                      {newImageUrl && (
                        <span className="text-[11px] text-emerald-600 font-semibold">✓ Đã đính kèm ảnh</span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={e => setNewImageUrl(e.target.value)}
                      placeholder="Hoặc dán link ảnh trực tiếp (https://...)"
                      className="w-full border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu Dịch Vụ Vào Bảng Giá</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <div className="space-y-4 max-w-md mx-auto py-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <KeyRound className="w-4 h-4 text-blue-600" />
                  <span>Đổi Mật Khẩu Quản Trị Hệ Thống</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Thay đổi mật khẩu đăng nhập để đảm bảo chỉ có bạn mới có quyền chỉnh sửa bảng giá và dịch vụ của tiệm.
                </p>
              </div>

              {passwordSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã cập nhật mật khẩu quản trị mới thành công!</span>
                </div>
              )}

              {passwordError && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật khẩu hiện tại *:
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mật khẩu mới *:
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới (ít nhất 4 ký tự)..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Xác nhận mật khẩu mới *:
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Lưu Mật Khẩu Mới</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

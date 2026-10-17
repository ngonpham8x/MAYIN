import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Phone, User, Bot, Sparkles, Clock, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { STORE_INFO, COMMON_PRINTER_ISSUES } from '../../data';
import { ChatMessage } from '../../types';

interface Chat247SupportProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookingService?: (service: string) => void;
}

export const Chat247Support: React.FC<Chat247SupportProps> = ({
  isOpen,
  onClose,
  onSelectBookingService,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Xin chào quý khách! Tôi là Trợ Lý Kỹ Thuật 24/7 của ${STORE_INFO.companyName} (Phụ trách kỹ thuật: ${STORE_INFO.technicianName} - ${STORE_INFO.displayPhone}).

Thiết bị văn phòng (máy in, máy photocopy) của quý khách đang gặp sự cố gì, hoặc cần nạp mực / bảo trì / hóa đơn VAT? Hãy chọn nhanh bên dưới hoặc nhắn tin để được hỗ trợ tức thì!`,
      time: 'Vừa xong',
      actionButtons: [
        { label: '📄 Máy bị kẹt giấy', action: 'diagnose', payload: 'kẹt giấy' },
        { label: '⚫ Bản in sọc đen / mờ', action: 'diagnose', payload: 'sọc đen' },
        { label: '🔴 Nháy đèn đỏ / vàng', action: 'diagnose', payload: 'đèn đỏ' },
        { label: '💰 Báo giá nạp mực', action: 'pricing', payload: 'nạp mực' },
        { label: '🖨️ Tư vấn máy in cũ', action: 'product', payload: 'máy cũ' },
        { label: '📞 Gọi Mr. Ân', action: 'call_an', payload: STORE_INFO.phone }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  // Generate intelligent response based on query
  const generateResponse = (query: string): { text: string; actionButtons?: ChatMessage['actionButtons'] } => {
    const q = query.toLowerCase();

    if (q.includes('kẹt') || q.includes('jam') || q.includes('giấy')) {
      return {
        text: `🔍 **Chẩn đoán lỗi Kẹt giấy (Paper Jam):**
- **Nguyên nhân phổ biến:** 
  1. Rách hoặc chai khô mỡ cụm bao lụa sấy khiến giấy không cuộn qua được.
  2. Mòn bánh cao su quả đào kéo giấy khiến giấy vào xiên hoặc dừng giữa chừng.
  3. Dị vật rơi vào khe giấy (ghim bấm, kẹp giấy, thun, vụn giấy rách cũ).
- **Báo giá sửa chữa:** Gọi hoặc nhắn Zalo 0938.386.326 để Mr. Ân báo giá chính xác theo mã máy. (Kiểm tra tận nơi miễn phí, bảo hành chu đáo).
- **Khuyến cáo:** Không dùng kéo hoặc que sắt nhọn chọc vào máy kẻo làm xước trống và rách sấy.`,
        actionButtons: [
          { label: '📅 Gửi yêu cầu sửa tận nơi', action: 'book', payload: 'Sửa kẹt giấy' },
          { label: '📞 Gọi Mr. Ân (0938.386.326)', action: 'call_an' }
        ]
      };
    }

    if (q.includes('sọc') || q.includes('đen') || q.includes('vệt') || q.includes('lem')) {
      return {
        text: `🔍 **Chẩn đoán lỗi Bản in bị vệt đen dọc / ngang / lem nhem:**
- **Nguyên nhân:** 
  1. Trống in (Drum) bị xước hoặc mòn lớp quang dẫn (chiếm 80% trường hợp).
  2. Gạt mực thải bị mẻ hoặc tràn ngăn chứa mực thải.
  3. Trục từ hoặc trục cao su bị đọng mực bẩn.
- **Giải pháp:** Thay trống Drum Mitsu siêu bền hoặc thanh gạt mới.
- **Báo giá:** Gọi hoặc nhắn Zalo 0938.386.326 để Mr. Ân báo giá tận nơi theo loại hộp mực. Bản in sắc nét lại như mới!`,
        actionButtons: [
          { label: '📅 Yêu cầu thay trống / gạt', action: 'book', payload: 'Thay linh kiện' },
          { label: '💬 Nhắn Zalo gửi ảnh bản in', action: 'zalo' }
        ]
      };
    }

    if (q.includes('mờ') || q.includes('trắng') || q.includes('mất chữ')) {
      return {
        text: `🔍 **Chẩn đoán lỗi Bản in mờ / Giấy ra trắng tinh:**
- **Nguyên nhân:**
  1. Hết mực trong hộp cartridge.
  2. Gãy lò xo tiếp mass trục từ (rất hay gặp ở Canon 2900 / HP 1020).
  3. Mờ hộp quang laser do bụi bẩn ẩm mốc.
- **Khắc phục:** Nạp mực siêu mịn hoặc cân chỉnh lò xo tiếp xúc mass.
- **Báo giá nạp mực:** Gọi hoặc nhắn Zalo 0938.386.326 (Mr. Ân) - Vệ sinh hộp mực miễn phí tận nơi!`,
        actionButtons: [
          { label: '📅 Đặt nạp mực tận nơi', action: 'book', payload: 'Nạp Mực Tận Nơi' },
          { label: '📞 Gọi Mr. Ân: 0938.386.326', action: 'call_an' }
        ]
      };
    }

    if (q.includes('đèn') || q.includes('nháy') || q.includes('đỏ') || q.includes('vàng') || q.includes('lỗi')) {
      return {
        text: `🔍 **Chẩn đoán lỗi Nháy đèn đỏ / Đèn vàng:**
- **Nguyên nhân:**
  1. Cảm biến sensor giấy bị kẹt hoặc bẩn bụi giấy.
  2. Hết chip mực (với máy Brother, Pantum hoặc HP đời mới).
  3. Tràn bộ nhớ bộ đếm mực thải (Waste Ink Pad) ở máy in phun màu Epson/Canon.
- **Giải pháp:** Reset bộ đếm phần mềm hoặc vệ sinh sensor nhận giấy.
- **Báo giá:** Gọi hoặc nhắn Zalo 0938.386.326 để Mr. Ân hỗ trợ. Có thể hỗ trợ qua Ultraviewer nếu là lỗi phần mềm!`,
        actionButtons: [
          { label: '📞 Gọi Mr. Ân hỗ trợ trực tiếp', action: 'call_an' },
          { label: '📅 Gửi yêu cầu thợ đến tận nhà', action: 'book', payload: 'Sửa lỗi đèn đỏ' }
        ]
      };
    }

    if (q.includes('giá') || q.includes('mực') || q.includes('nạp') || q.includes('bơm')) {
      return {
        text: `💰 **Báo giá Nạp mực & Sửa máy in tận nơi tại Tây Ninh:**
- Quý khách vui lòng gọi hoặc nhắn Zalo để kỹ thuật trưởng **Mr. Ân (${STORE_INFO.displayPhone})** báo giá nhanh nhất theo đúng mã máy và tình trạng máy in.
- **Cam kết:** Kiểm tra tận nơi miễn phí, báo giá trước khi làm, 100% hài lòng mới thanh toán, có hóa đơn điện tử VAT đầy đủ!`,
        actionButtons: [
          { label: '💬 Nhắn Zalo Báo Giá', action: 'zalo' },
          { label: '📞 Gọi thợ: 0938.386.326', action: 'call_an' }
        ]
      };
    }

    if (q.includes('cũ') || q.includes('mua') || q.includes('mới') || q.includes('bán') || q.includes('2900')) {
      return {
        text: `🖨️ **Các mẫu Máy In Cũ & Mới Bán Chạy Nhất:**
1. **Canon LBP 2900 Cũ Zin 95%:** Siêu bền bỉ, linh kiện rẻ sẵn có, tặng kèm hộp mực mới 100%, bảo hành 6 tháng.
2. **Canon LBP 6030w Cũ Like New:** In Wifi điện thoại, nhỏ gọn tiện lợi.
3. **HP LaserJet 1020 Cũ Bền Bỉ:** Cơ khỏe kéo giấy dày, hộp mực 12A.
4. **Brother HL-L2321D Mới 100%:** In 2 mặt tự động tốc độ cao.
5. **Epson L3210 In Màu Đa Năng Mới 100%:** In, Scan, Photo, hệ thống mực liên tục.

*Liên hệ Zalo 0938.386.326 để nhận báo giá máy tốt nhất hôm nay!*`,
        actionButtons: [
          { label: '💬 Nhắn Zalo Hỏi Máy', action: 'zalo' },
          { label: '📞 Gọi Mr. Ân tư vấn', action: 'call_an' }
        ]
      };
    }

    if (q.includes('địa chỉ') || q.includes('ở đâu') || q.includes('tiệm') || q.includes('bản đồ')) {
      return {
        text: `📍 **Địa chỉ cửa hàng:**
- **Địa chỉ:** ${STORE_INFO.address}
- **Vị trí Google Maps:** ${STORE_INFO.mapsAppUrl}
- **Giờ mở cửa:** ${STORE_INFO.workingHours} (Thứ 2 - Chủ Nhật, Ngày Lễ).
- **Kỹ thuật viên phục vụ tận nhà:** Phục vụ tận nơi khắp TP. Tây Ninh, Hòa Thành, Gò Dầu, Trảng Bàng, Châu Thành...`,
        actionButtons: [
          { label: '🗺️ Mở Google Maps', action: 'maps' },
          { label: '📞 Gọi Mr. Ân: 0938.386.326', action: 'call_an' }
        ]
      };
    }

    // Default polite response
    return {
      text: `Dạ vâng! Về vấn đề "${query}", Kỹ thuật trưởng Mr. Ân (${STORE_INFO.displayPhone}) sẵn sàng hỗ trợ bạn ngay lập tức. 

Kỹ thuật viên có thể đến tận nơi để kiểm tra máy, hoặc bạn có thể gọi trực tiếp để được chỉ dẫn cách xử lý nhanh tại chỗ!`,
      actionButtons: [
        { label: '📞 Gọi Mr. Ân: 0938.386.326', action: 'call_an' },
        { label: '💬 Nhắn tin Zalo Mr. Ân', action: 'zalo' },
        { label: '📋 Bảng giá & dịch vụ', action: 'pricing', payload: query }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateResponse(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: resp.text,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        actionButtons: resp.actionButtons
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleActionButtonClick = (btn: { label: string; action: string; payload?: string }) => {
    if (btn.action === 'call_an') {
      window.location.href = `tel:${STORE_INFO.phone}`;
    } else if (btn.action === 'zalo') {
      window.open(STORE_INFO.zaloUrl, '_blank');
    } else if (btn.action === 'maps') {
      window.open(STORE_INFO.mapsAppUrl, '_blank');
    } else if (btn.action === 'book' || btn.action === 'pricing') {
      onClose();
      const el = document.getElementById('bang-gia');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      handleSendMessage(btn.payload || btn.label);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 flex items-end sm:items-auto justify-center sm:justify-end">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 w-full sm:w-96 max-h-[90vh] sm:h-[580px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
                ÂP
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute bottom-0 right-0"></span>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1 truncate">
                <span>Mr. Ân (Hỗ Trợ 24/7)</span>
              </h4>
              <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium truncate">
                Trực tuyến • Phản hồi tức thì
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs"
              title="Gọi ngay cho Mr. Ân"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed text-[11px] sm:text-xs">
                  {msg.text}
                </p>
                <span
                  className={`text-[9px] block mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {/* Action Suggestion Buttons */}
              {msg.actionButtons && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                  {msg.actionButtons.map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionButtonClick(btn)}
                      className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all shadow-2xs"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-slate-400 text-xs bg-white p-2.5 rounded-xl border border-slate-200 w-24">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Nhập tình trạng máy hoặc câu hỏi..."
            className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-blue-500 border border-transparent"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs shrink-0"
            disabled={!inputMessage.trim()}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

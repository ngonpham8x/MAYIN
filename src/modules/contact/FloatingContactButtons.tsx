import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  MessageSquare,
  X,
  Send,
  GripVertical,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from 'lucide-react';
import { STORE_INFO } from '../../config/store.config';

interface FloatingContactButtonsProps {
  onOpenChat: () => void;
  onQuickBookClick: () => void;
}

interface SavedPosition {
  side: 'left' | 'right';
  topPercent: number;
  topPx: number;
  isDocked?: boolean;
}

const STORAGE_KEY = 'anphat_floating_contact_pos';
const SAFE_EDGE_PADDING = 16;
const SAFE_TOP_PADDING = 75; // Avoid obscuring sticky header
const SAFE_BOTTOM_PADDING = 24;

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  onOpenChat,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDocked, setIsDocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedPosition = JSON.parse(saved);
        return Boolean(parsed.isDocked);
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Position state (coordinates in viewport px)
  const [position, setPosition] = useState<{ x: number; y: number; side: 'left' | 'right' }>(() => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 0, side: 'right' };
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedPosition = JSON.parse(saved);
        const y = Math.min(
          Math.max(SAFE_TOP_PADDING, (parsed.topPercent / 100) * window.innerHeight),
          window.innerHeight - 90
        );
        const x = parsed.side === 'left' ? SAFE_EDGE_PADDING : window.innerWidth - 280 - SAFE_EDGE_PADDING;
        return { x, y, side: parsed.side };
      }
    } catch {
      // ignore JSON parse errors
    }
    // Default fallback position: bottom-right
    return {
      x: Math.max(SAFE_EDGE_PADDING, window.innerWidth - 300),
      y: Math.max(SAFE_TOP_PADDING, window.innerHeight - 90),
      side: 'right',
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const posStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const ignoreNextClickRef = useRef<boolean>(false);

  // Save current position and docked state to localStorage
  const saveStateToStorage = useCallback((pos: { x: number; y: number; side: 'left' | 'right' }, docked: boolean) => {
    try {
      const payload: SavedPosition = {
        side: pos.side,
        topPercent: (pos.y / window.innerHeight) * 100,
        topPx: pos.y,
        isDocked: docked,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, []);

  // Keep widget inside viewport on window resize
  const clampAndSnapToEdge = useCallback((currentX: number, currentY: number, forceSide?: 'left' | 'right') => {
    if (typeof window === 'undefined') return { x: 0, y: 0, side: 'right' as const };
    
    const widgetWidth = containerRef.current?.offsetWidth || 280;
    const widgetHeight = containerRef.current?.offsetHeight || 50;
    
    const side = forceSide || (currentX + widgetWidth / 2 < window.innerWidth / 2 ? 'left' : 'right');
    const targetX = side === 'left' ? SAFE_EDGE_PADDING : window.innerWidth - widgetWidth - SAFE_EDGE_PADDING;
    
    const minY = SAFE_TOP_PADDING;
    const maxY = Math.max(minY, window.innerHeight - widgetHeight - SAFE_BOTTOM_PADDING);
    const targetY = Math.min(Math.max(minY, currentY), maxY);

    return { x: targetX, y: targetY, side };
  }, []);

  // Update position on mount to ensure exact element bounds match window
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => clampAndSnapToEdge(prev.x, prev.y, prev.side));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampAndSnapToEdge]);

  // Pointer Down handler
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button (left mouse click or touch)
    if (e.button !== 0) return;

    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    posStartRef.current = { x: position.x, y: position.y };
    hasMovedRef.current = false;

    // Capture pointer on the element so movements don't get lost when moving fast
    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture fails
    }
  };

  // Pointer Move handler
  const handlePointerMove = (e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (!target.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    if (!hasMovedRef.current && Math.hypot(dx, dy) > 6) {
      hasMovedRef.current = true;
      setIsDragging(true);
      setIsExpanded(false);
    }

    if (hasMovedRef.current) {
      const widgetWidth = containerRef.current?.offsetWidth || 280;
      const widgetHeight = containerRef.current?.offsetHeight || 50;

      const rawX = posStartRef.current.x + dx;
      const rawY = posStartRef.current.y + dy;

      // Allow free movement inside screen boundaries
      const clampedX = Math.min(Math.max(0, rawX), window.innerWidth - widgetWidth);
      const clampedY = Math.min(Math.max(SAFE_TOP_PADDING, rawY), window.innerHeight - widgetHeight - 12);

      const side = (clampedX + widgetWidth / 2 < window.innerWidth / 2) ? 'left' : 'right';

      setPosition({
        x: clampedX,
        y: clampedY,
        side,
      });
    }
  };

  // Pointer Up handler (handles swipe-to-edge docking and magnetic snap)
  const handlePointerUp = (e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      try {
        target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const timeDelta = Date.now() - pointerStartRef.current.time;

    if (hasMovedRef.current) {
      const snapped = clampAndSnapToEdge(position.x, position.y);
      setIsDragging(false);

      // Check if user swiped towards the side edge or dragged right up against it
      const isSwipingRight = dx > 25 && timeDelta < 450;
      const isSwipingLeft = dx < -25 && timeDelta < 450;
      const isNearRightEdge = position.x >= window.innerWidth - (containerRef.current?.offsetWidth || 280) - 15;
      const isNearLeftEdge = position.x <= 15;

      let shouldDock = false;
      if (snapped.side === 'right' && (isSwipingRight || (dx > 10 && isNearRightEdge))) {
        shouldDock = true;
      } else if (snapped.side === 'left' && (isSwipingLeft || (dx < -10 && isNearLeftEdge))) {
        shouldDock = true;
      }

      setPosition(snapped);
      if (shouldDock) {
        setIsDocked(true);
        saveStateToStorage(snapped, true);
      } else {
        saveStateToStorage(snapped, false);
      }

      // Suppress clicks on child links/buttons that would trigger right after dragging
      ignoreNextClickRef.current = true;
      setTimeout(() => {
        ignoreNextClickRef.current = false;
        hasMovedRef.current = false;
      }, 150);
    } else {
      setIsDragging(false);
      hasMovedRef.current = false;
    }
  };

  // Intercept click if drag just occurred
  const handleClickCapture = (e: React.MouseEvent) => {
    if (ignoreNextClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Toggle or force dock state
  const handleDockToggle = (dock: boolean) => {
    setIsDocked(dock);
    setIsExpanded(false);
    saveStateToStorage(position, dock);
  };

  // Reset to default bottom-right position
  const handleResetPosition = () => {
    if (typeof window === 'undefined') return;
    const widgetWidth = containerRef.current?.offsetWidth || 280;
    const targetX = window.innerWidth - widgetWidth - SAFE_EDGE_PADDING;
    const targetY = window.innerHeight - 90;
    const resetPos = { x: targetX, y: targetY, side: 'right' as const };
    setPosition(resetPos);
    setIsDocked(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // If dismissed completely via X
  if (isDismissed) {
    const isLeft = position.side === 'left';
    return (
      <div
        className="fixed z-40 transition-all duration-300 ease-out"
        style={{
          top: `${position.y}px`,
          left: isLeft ? `${SAFE_EDGE_PADDING}px` : undefined,
          right: !isLeft ? `${SAFE_EDGE_PADDING}px` : undefined,
        }}
      >
        <button
          onClick={() => {
            setIsDismissed(false);
            setIsDocked(false);
          }}
          className="group flex items-center gap-2 p-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-full shadow-xl text-xs transition-all backdrop-blur-md border border-slate-700/60 hover:scale-105 active:scale-95"
          title="Nhấn để mở thanh liên hệ kỹ thuật"
          aria-label="Mở thanh liên hệ"
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <Phone className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="hidden sm:inline font-semibold text-[11px] pr-1">Hỗ trợ kỹ thuật</span>
        </button>
      </div>
    );
  }

  const isLeft = position.side === 'left';
  const isTopHalf = position.y < 320; // If near top of screen, open card downwards

  // RENDER DOCKED STATE: Pinned and tucked smoothly into screen edge with a sleek peeking tab
  if (isDocked) {
    return (
      <aside
        aria-label="Nút liên hệ nhanh đã ẩn vào mép màn hình"
        className="fixed z-40 transition-all duration-300 ease-out select-none"
        style={{
          top: `${position.y}px`,
          left: isLeft ? '0px' : undefined,
          right: !isLeft ? '0px' : undefined,
        }}
      >
        <div
          onClick={() => handleDockToggle(false)}
          className={`group flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-2xl backdrop-blur-md active:scale-95 ${
            isLeft
              ? 'rounded-r-2xl border-y border-r border-emerald-400/50 bg-gradient-to-r from-emerald-700 to-emerald-600 pl-2 pr-3 py-2 text-white hover:translate-x-1.5'
              : 'rounded-l-2xl border-y border-l border-emerald-400/50 bg-gradient-to-r from-emerald-600 to-emerald-700 pl-3 pr-2 py-2 text-white hover:-translate-x-1.5'
          }`}
          title="Bấm hoặc kéo để mở lại thanh liên hệ"
        >
          {isLeft ? (
            <>
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-1 rounded-full bg-emerald-300/40 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold tracking-tight leading-tight">Gọi Mr. Ân</span>
                <span className="text-[9px] text-emerald-100 flex items-center gap-0.5">
                  Mở lại <ChevronsRight className="w-3 h-3 inline animate-pulse" />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-bold tracking-tight leading-tight">Gọi Mr. Ân</span>
                <span className="text-[9px] text-emerald-100 flex items-center justify-end gap-0.5">
                  <ChevronsLeft className="w-3 h-3 inline animate-pulse" /> Mở lại
                </span>
              </div>
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-1 rounded-full bg-emerald-300/40 animate-ping" />
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    );
  }

  // RENDER ACTIVE DRAGGABLE FLOATING BAR
  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: 'none',
      }}
      className={`fixed top-0 left-0 z-40 flex flex-col pointer-events-auto ${
        isLeft ? 'items-start' : 'items-end'
      } ${
        isDragging
          ? 'cursor-grabbing select-none transition-none shadow-2xl scale-105 opacity-95'
          : 'transition-transform duration-300 ease-out'
      }`}
    >
      {/* Quick Contact Card (Expands above or below depending on vertical position) */}
      {isExpanded && !isDragging && (
        <div
          className={`bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 w-76 max-w-[calc(100vw-32px)] text-slate-800 animate-in fade-in zoom-in-95 duration-150 ${
            isTopHalf ? 'mt-2 order-last' : 'mb-2 order-first'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-900">Kỹ Thuật Trưởng Mr. Ân</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetPosition}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                title="Đặt lại vị trí mặc định"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                aria-label="Đóng popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
            Hỗ trợ kỹ thuật tận nơi tại Tây Ninh. Báo giá công khai, không sửa không mất phí.
          </p>

          <div className="space-y-2">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2.5 rounded-xl text-xs transition-colors min-h-[44px] shadow-xs active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>Gọi: {STORE_INFO.displayPhone}</span>
              </span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-semibold">24/7</span>
            </a>

            <a
              href={STORE_INFO.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-2.5 rounded-xl text-xs transition-colors border border-blue-200 min-h-[44px] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Nhắn tin Zalo</span>
              </span>
              <span className="text-[10px] text-blue-600 font-semibold">Trực tiếp</span>
            </a>

            <button
              onClick={() => {
                setIsExpanded(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold px-3 py-2.5 rounded-xl text-xs transition-colors border border-slate-200 min-h-[44px] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chat bắt bệnh tự động</span>
              </span>
              <span className="text-[10px] text-slate-500">Miễn phí</span>
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>TP. Tây Ninh & Huyện lân cận</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDockToggle(true)}
                className="hover:text-emerald-700 font-medium py-1 px-1.5 flex items-center gap-0.5"
                title="Gấp gọn vào mép màn hình"
              >
                Ẩn vào mép
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setIsDismissed(true);
                }}
                className="hover:text-slate-600 underline py-1 px-1.5"
              >
                Tắt nút
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Draggable Floating Bar */}
      <div
        className={`flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-xl p-1 transition-shadow ${
          isDragging ? 'shadow-2xl ring-2 ring-emerald-500/40' : 'hover:shadow-2xl'
        }`}
      >
        {/* If on Left side: Show Tuck-to-edge Button on the left */}
        {isLeft && (
          <button
            onClick={() => handleDockToggle(true)}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Vuốt sang trái hoặc bấm để ẩn vào mép màn hình"
            aria-label="Ẩn vào mép trái"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-600" />
          </button>
        )}

        {/* Visual Drag Handle Grip */}
        <div
          className="flex items-center justify-center px-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing select-none"
          title="Giữ và kéo di chuyển tự do. Vuốt sang mép để ẩn vào cạnh"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Call Button */}
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-full transition-colors shadow-xs min-h-[40px] active:scale-95"
          title="Gọi Mr. Ân ngay"
        >
          <Phone className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">{STORE_INFO.displayPhone}</span>
          <span className="sm:hidden">Gọi thợ</span>
        </a>

        {/* Expand / Quick Support Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full transition-colors text-xs font-semibold flex items-center gap-1 min-h-[40px] min-w-[40px] justify-center ${
            isExpanded
              ? 'bg-slate-100 text-slate-800'
              : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
          }`}
          title="Hỗ trợ & Liên hệ"
        >
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span className="hidden md:inline pr-1 text-slate-700 font-medium text-xs">Tư vấn</span>
        </button>

        {/* If on Right side: Show Tuck-to-edge Button on the right */}
        {!isLeft && (
          <button
            onClick={() => handleDockToggle(true)}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Vuốt sang phải hoặc bấm để ẩn vào mép màn hình"
            aria-label="Ẩn vào mép phải"
          >
            <ChevronRight className="w-4 h-4 text-emerald-600" />
          </button>
        )}

        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
          title="Thu gọn"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

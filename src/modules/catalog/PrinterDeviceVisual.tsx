import React, { useState } from 'react';
import { PrinterProduct } from '../../types';

interface PrinterDeviceVisualProps {
  product: PrinterProduct;
  className?: string;
  showBadge?: boolean;
}

export const PrinterDeviceVisual: React.FC<PrinterDeviceVisualProps> = ({
  product,
  className = 'w-full h-full',
  showBadge = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Helper to identify model family
  const id = product.id;
  const name = product.name.toLowerCase();

  // If a real photo is supplied and hasn't errored out, attempt to render it with no-referrer
  // If errored or placeholder Unsplash, render the accurate vector device schematic
  const isGenericUnsplash = product.imageUrl && product.imageUrl.includes('unsplash.com');

  if (product.imageUrl && !imgError && !isGenericUnsplash) {
    return (
      <img
        src={product.imageUrl}
        alt={product.name}
        className={`${className} object-cover`}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
      />
    );
  }

  // Accurate SVG Device Renderer for each specific printer model
  const renderDeviceSvg = () => {
    // 1. Canon LBP 2900 (used or new)
    if (id === 'prod-used-1' || id === 'prod-new-1' || name.includes('2900')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canon2900_body" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="canon2900_tray" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="canon2900_smoke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="160" cy="180" rx="125" ry="14" fill="#0F172A" fillOpacity="0.12" />

          {/* Main Printer Body (Curved desktop shape) */}
          <rect x="45" y="60" width="230" height="110" rx="16" fill="url(#canon2900_body)" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Top Paper Output Bay */}
          <path d="M70 60 H250 V82 C250 86 246 90 242 90 H78 C74 90 70 86 70 82 Z" fill="#334155" />
          
          {/* Top Cover Flap (Semi-translucent smoke blue lid) */}
          <rect x="75" y="44" width="170" height="20" rx="4" fill="url(#canon2900_smoke)" stroke="#38BDF8" strokeWidth="1" />
          
          {/* Paper Output Sheet */}
          <path d="M100 70 L115 45 H205 L220 70 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <line x1="125" y1="53" x2="195" y2="53" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="60" x2="200" y2="60" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

          {/* Front Fold-out Lower Paper Input Tray */}
          <rect x="65" y="125" width="190" height="40" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          <rect x="90" y="132" width="140" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          {/* Paper stack */}
          <rect x="98" y="140" width="124" height="15" rx="2" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Paper edge lines */}
          <line x1="105" y1="145" x2="215" y2="145" stroke="#E2E8F0" strokeWidth="1" />

          {/* Canon Brand & 2900 Badge */}
          <text x="75" y="112" fill="#DC2626" fontSize="12" fontWeight="900" letterSpacing="0.5">Canon</text>
          <text x="122" y="112" fill="#475569" fontSize="9" fontWeight="700">LBP 2900</text>

          {/* LED Indicators & Power Button */}
          <circle cx="240" cy="110" r="3.5" fill="#22C55E" />
          <circle cx="250" cy="110" r="3" fill="#EF4444" fillOpacity="0.4" />
          <rect x="235" y="138" width="16" height="14" rx="3" fill="#64748B" />

          {/* Feature Badge overlay */}
          <rect x="180" y="20" width="105" height="18" rx="4" fill="#1E293B" />
          <text x="232" y="32" fill="#38BDF8" fontSize="8" fontWeight="800" textAnchor="middle">HỘP MỰC 12A / 303</text>
        </svg>
      );
    }

    // 2. Canon LBP 6030w (Wireless compact)
    if (id === 'prod-used-2' || name.includes('6030')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="canon6030_grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="178" rx="115" ry="12" fill="#0F172A" fillOpacity="0.1" />

          {/* Compact Modern Cube Body */}
          <rect x="55" y="65" width="210" height="100" rx="14" fill="url(#canon6030_grad)" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Recessed Top Output Slot */}
          <path d="M80 65 H240 V82 C240 85 237 88 234 88 H86 C83 88 80 85 80 82 Z" fill="#1E293B" />

          {/* White Paper exit */}
          <path d="M105 72 L115 50 H205 L215 72 Z" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="125" y1="58" x2="195" y2="58" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />

          {/* Front Lower Input Bay */}
          <rect x="75" y="125" width="170" height="35" rx="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="95" y="132" width="130" height="22" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />

          {/* Canon Logo */}
          <text x="80" y="108" fill="#DC2626" fontSize="11" fontWeight="900">Canon</text>
          <text x="122" y="108" fill="#64748B" fontSize="8" fontWeight="700">LBP 6030w</text>

          {/* Wifi Glow Indicator */}
          <circle cx="235" cy="104" r="5" fill="#0284C7" />
          <path d="M232 101 A 4 4 0 0 1 238 101" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <path d="M233.5 103 A 2 2 0 0 1 236.5 103" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          <text x="235" y="117" fill="#0284C7" fontSize="7" fontWeight="800" textAnchor="middle">WIFI</text>

          {/* Top Badge */}
          <rect x="185" y="24" width="95" height="18" rx="4" fill="#0284C7" />
          <text x="232" y="36" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">KẾT NỐI KHÔNG DÂY</text>
        </svg>
      );
    }

    // 3. HP LaserJet 1020 (used)
    if (id === 'prod-used-3' || name.includes('1020')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hp1020_silver" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="hp1020_dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="180" rx="120" ry="13" fill="#0F172A" fillOpacity="0.12" />

          {/* Main Curved Body */}
          <rect x="50" y="62" width="220" height="108" rx="18" fill="url(#hp1020_silver)" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Top Paper Eject Bay */}
          <path d="M75 62 H245 V84 C245 88 241 92 237 92 H83 C79 92 75 88 75 84 Z" fill="url(#hp1020_dark)" />
          
          {/* Curved Front Fold-down Paper Guide */}
          <path d="M68 120 C68 120 72 165 85 168 H235 C248 165 252 120 252 120 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          <rect x="95" y="132" width="130" height="28" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />

          {/* Iconic HP Round Blue Logo */}
          <circle cx="85" cy="106" r="12" fill="#0096D6" />
          <text x="85" y="111" fill="#FFFFFF" fontSize="11" fontWeight="900" fontStyle="italic" textAnchor="middle">hp</text>

          {/* Model Name */}
          <text x="105" y="105" fill="#0F172A" fontSize="10" fontWeight="800">LaserJet 1020</text>
          <text x="105" y="115" fill="#64748B" fontSize="7" fontWeight="600">Nồi Đồng Cối Đá • Mực 12A</text>

          {/* Status LEDs */}
          <circle cx="236" cy="103" r="3.5" fill="#22C55E" />
          <circle cx="246" cy="103" r="3" fill="#F59E0B" />

          {/* Top Badge */}
          <rect x="175" y="24" width="105" height="18" rx="4" fill="#0F172A" />
          <text x="227" y="36" fill="#38BDF8" fontSize="8" fontWeight="800" textAnchor="middle">BỀN BỈ • TIẾT KIỆM</text>
        </svg>
      );
    }

    // 4 & 7. Brother HL-L2366DW / Brother HL-L2321D (2-side duplex)
    if (id === 'prod-used-4' || id === 'prod-new-2' || name.includes('brother')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brother_cube" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="brother_tray" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="180" rx="120" ry="12" fill="#0F172A" fillOpacity="0.18" />

          {/* Brother Dark Charcoal Cube Chassis */}
          <rect x="50" y="55" width="220" height="118" rx="10" fill="url(#brother_cube)" stroke="#475569" strokeWidth="1.5" />

          {/* Top Output Tray */}
          <path d="M72 55 H248 V85 C248 89 244 93 240 93 H80 C76 93 72 89 72 85 Z" fill="#020617" />

          {/* Paper Sheet in Output */}
          <path d="M100 68 L110 42 H210 L220 68 Z" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="120" y1="52" x2="200" y2="52" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="58" x2="200" y2="58" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />

          {/* Lower Enclosed 250-Sheet Paper Drawer */}
          <rect x="62" y="132" width="196" height="34" rx="4" fill="url(#brother_tray)" stroke="#334155" strokeWidth="1" />
          {/* Paper Level Window */}
          <rect x="150" y="145" width="20" height="7" rx="2" fill="#0EA5E9" fillOpacity="0.8" />

          {/* Brother Brand */}
          <text x="72" y="112" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="0.8">brother</text>
          <text x="72" y="123" fill="#94A3B8" fontSize="7" fontWeight="600">
            {id === 'prod-new-2' ? 'HL-L2321D (Duplex 2 Mặt)' : 'HL-L2366DW (Wifi + LAN)'}
          </text>

          {/* LCD Single-Line Display with Green Backlight */}
          <rect x="195" y="103" width="55" height="14" rx="2" fill="#065F46" stroke="#10B981" strokeWidth="0.8" />
          <text x="222" y="113" fill="#A7F3D0" fontSize="7" fontWeight="700" textAnchor="middle">READY / 2-SIDED</text>

          {/* Auto Duplex 2-Sided Badge */}
          <rect x="175" y="22" width="105" height="18" rx="4" fill="#0284C7" />
          <text x="227" y="34" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">IN 2 MẶT TỰ ĐỘNG</text>
        </svg>
      );
    }

    // 5. Epson L805 (6-color photo printer with continuous ink tanks on side)
    if (id === 'prod-used-5' || name.includes('805')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="epson_black" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="180" rx="125" ry="12" fill="#0F172A" fillOpacity="0.15" />

          {/* Main Printer Body */}
          <rect x="35" y="65" width="200" height="105" rx="12" fill="url(#epson_black)" stroke="#334155" strokeWidth="1.5" />

          {/* Top Rear Paper Feeder (Epson style) */}
          <path d="M55 65 L65 35 H185 L195 65 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
          {/* Photo Paper Stack */}
          <rect x="75" y="42" width="100" height="25" rx="2" fill="#FFFFFF" stroke="#E2E8F0" />
          <text x="125" y="56" fill="#0284C7" fontSize="7" fontWeight="800" textAnchor="middle">EPSON PHOTO PAPER</text>

          {/* Front Photo Print Output with colorful photo preview */}
          <rect x="50" y="125" width="165" height="38" rx="4" fill="#020617" />
          <rect x="70" y="132" width="100" height="26" rx="2" fill="#FEF08A" stroke="#FDE047" />
          <circle cx="85" cy="145" r="6" fill="#EC4899" />
          <polygon points="120,135 135,152 105,152" fill="#10B981" />
          <polygon points="145,138 158,152 132,152" fill="#3B82F6" />

          {/* Epson Brand */}
          <text x="50" y="92" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="0.5">EPSON</text>
          <text x="50" y="104" fill="#38BDF8" fontSize="8" fontWeight="700">L805 • 6 MÀU MỰC</text>

          {/* EXTERNAL 6-COLOR CONTINUOUS INK TANK MODULE (Crucial feature) */}
          <g transform="translate(240, 75)">
            {/* Tank Bracket */}
            <rect x="0" y="0" width="55" height="90" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="27" y="14" fill="#38BDF8" fontSize="7" fontWeight="800" textAnchor="middle">ECOTANK</text>

            {/* 6 Ink Columns: Black, Cyan, Magenta, Yellow, Light Cyan, Light Magenta */}
            {/* Black */}
            <rect x="5" y="20" width="6" height="55" rx="2" fill="#020617" stroke="#334155" strokeWidth="0.5" />
            <rect x="5" y="30" width="6" height="45" rx="1" fill="#1E293B" />
            {/* Cyan */}
            <rect x="13" y="20" width="6" height="55" rx="2" fill="#0284C7" />
            {/* Magenta */}
            <rect x="21" y="20" width="6" height="55" rx="2" fill="#EC4899" />
            {/* Yellow */}
            <rect x="29" y="20" width="6" height="55" rx="2" fill="#EAB308" />
            {/* Light Cyan */}
            <rect x="37" y="20" width="6" height="55" rx="2" fill="#7DD3FC" />
            {/* Light Magenta */}
            <rect x="45" y="20" width="6" height="55" rx="2" fill="#F472B6" />

            <text x="27" y="83" fill="#94A3B8" fontSize="6" fontWeight="700" textAnchor="middle">6 MÀU RIÊNG</text>
          </g>

          {/* Top Badge */}
          <rect x="180" y="16" width="105" height="18" rx="4" fill="#EC4899" />
          <text x="232" y="28" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">IN ẢNH CHUYÊN NGHIỆP</text>
        </svg>
      );
    }

    // 8. HP LaserJet M107w (compact modern white)
    if (id === 'prod-new-3' || name.includes('m107w')) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hp_m107_white" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="178" rx="115" ry="12" fill="#0F172A" fillOpacity="0.1" />

          {/* Compact White Body */}
          <rect x="55" y="65" width="210" height="100" rx="12" fill="url(#hp_m107_white)" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Contrasting Black Top Panel */}
          <rect x="55" y="65" width="210" height="24" rx="12" fill="#1E293B" />
          {/* Top Output Opening */}
          <path d="M80 75 H240 V92 C240 95 236 98 232 98 H88 C84 98 80 95 80 92 Z" fill="#0F172A" />

          {/* HP Round Logo */}
          <circle cx="85" cy="116" r="10" fill="#0096D6" />
          <text x="85" y="120" fill="#FFFFFF" fontSize="9" fontWeight="900" fontStyle="italic" textAnchor="middle">hp</text>

          {/* Model Name */}
          <text x="103" y="116" fill="#0F172A" fontSize="10" fontWeight="800">LaserJet M107w</text>
          <text x="103" y="126" fill="#64748B" fontSize="7" fontWeight="600">Wifi Không Dây • Laser Siêu Nhỏ</text>

          {/* Wifi LED indicator */}
          <circle cx="238" cy="116" r="4" fill="#0284C7" />
          <text x="238" y="128" fill="#0284C7" fontSize="7" fontWeight="800" textAnchor="middle">WIFI</text>

          {/* Lower Input Drawer */}
          <rect x="75" y="138" width="170" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />

          {/* Top Badge */}
          <rect x="180" y="24" width="100" height="18" rx="4" fill="#0096D6" />
          <text x="230" y="36" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">MỚI 100% CHÍNH HÃNG</text>
        </svg>
      );
    }

    // HP LaserJet Pro M404dn (Enterprise duplex office laser)
    if (id === 'prod-new-4' || name.includes('m404') || (name.includes('hp') && name.includes('m404'))) {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hp_m404_white" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="hp_m404_dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="180" rx="122" ry="12" fill="#0F172A" fillOpacity="0.14" />

          {/* Sturdy Office Laser Chassis */}
          <rect x="45" y="55" width="230" height="118" rx="14" fill="url(#hp_m404_white)" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Deep Recessed Output Bay */}
          <path d="M70 55 H250 V88 C250 92 246 96 242 96 H78 C74 96 70 92 70 88 Z" fill="url(#hp_m404_dark)" />

          {/* Paper in exit */}
          <path d="M95 72 L105 45 H215 L225 72 Z" fill="#FFFFFF" stroke="#E2E8F0" />
          <line x1="115" y1="54" x2="205" y2="54" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="115" y1="60" x2="205" y2="60" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />

          {/* Round HP Logo */}
          <circle cx="75" cy="115" r="12" fill="#0096D6" />
          <text x="75" y="120" fill="#FFFFFF" fontSize="11" fontWeight="900" fontStyle="italic" textAnchor="middle">hp</text>

          {/* Model info */}
          <text x="95" y="114" fill="#0F172A" fontSize="11" fontWeight="900">LaserJet Pro M404dn</text>
          <text x="95" y="125" fill="#64748B" fontSize="8" fontWeight="600">38 trang/phút • In 2 Mặt • Cổng LAN Gigabit</text>

          {/* LCD Panel & Navigation Keypad */}
          <rect x="205" y="105" width="48" height="16" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          <text x="229" y="116" fill="#38BDF8" fontSize="7" fontWeight="700" textAnchor="middle">READY / LAN</text>
          <circle cx="212" cy="128" r="2.5" fill="#22C55E" />
          <circle cx="220" cy="128" r="2.5" fill="#64748B" />
          <circle cx="228" cy="128" r="2.5" fill="#64748B" />

          {/* Lower Heavy-duty 250-Sheet Paper Drawer */}
          <rect x="58" y="136" width="204" height="30" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="110" y1="151" x2="210" y2="151" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Top Badge */}
          <rect x="175" y="22" width="105" height="18" rx="4" fill="#1E293B" />
          <text x="227" y="34" fill="#38BDF8" fontSize="8" fontWeight="800" textAnchor="middle">DOANH NGHIỆP • 38 PPM</text>
        </svg>
      );
    }

    // 9. Epson EcoTank L3210 (All-in-One: Print + Scan + Copy + Integrated EcoTank)
    return (
      <svg viewBox="0 0 320 200" className="w-full h-full max-h-52 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="epson_l3210_grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="180" rx="120" ry="12" fill="#0F172A" fillOpacity="0.15" />

        {/* Main Body */}
        <rect x="45" y="60" width="230" height="110" rx="10" fill="url(#epson_l3210_grad)" stroke="#475569" strokeWidth="1.5" />

        {/* Top Flatbed Scanner Lid */}
        <rect x="45" y="55" width="230" height="22" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
        <rect x="135" y="58" width="50" height="4" rx="2" fill="#94A3B8" />

        {/* Brand Header */}
        <text x="65" y="96" fill="#FFFFFF" fontSize="12" fontWeight="900" letterSpacing="0.5">EPSON</text>
        <text x="115" y="96" fill="#38BDF8" fontSize="8" fontWeight="700">EcoTank L3210</text>
        <text x="65" y="106" fill="#94A3B8" fontSize="7" fontWeight="600">Đa Năng: In • Scan • Photo</text>

        {/* Scanner Glass Bed line */}
        <line x1="48" y1="76" x2="272" y2="76" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.4" />

        {/* Front Output Paper Tray */}
        <rect x="65" y="125" width="130" height="35" rx="4" fill="#020617" />
        <rect x="75" y="132" width="110" height="22" rx="2" fill="#FFFFFF" />
        <line x1="85" y1="138" x2="175" y2="138" stroke="#CBD5E1" strokeWidth="1" />
        <line x1="85" y1="144" x2="165" y2="144" stroke="#CBD5E1" strokeWidth="1" />

        {/* INTEGRATED FRONT ECOTANK WINDOWS (4 Inks: Black, Cyan, Magenta, Yellow) */}
        <g transform="translate(205, 115)">
          <rect x="0" y="0" width="60" height="45" rx="5" fill="#020617" stroke="#38BDF8" strokeWidth="1" />
          {/* Black */}
          <rect x="5" y="10" width="10" height="28" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="0.5" />
          <rect x="5" y="18" width="10" height="20" rx="1" fill="#334155" />
          {/* Cyan */}
          <rect x="18" y="10" width="10" height="28" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="0.5" />
          <rect x="18" y="16" width="10" height="22" rx="1" fill="#0284C7" />
          {/* Magenta */}
          <rect x="31" y="10" width="10" height="28" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="0.5" />
          <rect x="31" y="20" width="10" height="18" rx="1" fill="#EC4899" />
          {/* Yellow */}
          <rect x="44" y="10" width="10" height="28" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="0.5" />
          <rect x="44" y="14" width="10" height="24" rx="1" fill="#EAB308" />

          <text x="30" y="42" fill="#38BDF8" fontSize="6" fontWeight="700" textAnchor="middle">ECOTANK</text>
        </g>

        {/* Top Badge */}
        <rect x="175" y="22" width="105" height="18" rx="4" fill="#059669" />
        <text x="227" y="34" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">ĐA NĂNG 3 TRONG 1</text>
      </svg>
    );
  };

  return (
    <div className={`relative ${className} bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-3 select-none overflow-hidden`}>
      {/* Background technical grid pattern for authentic device blueprint feeling */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Render the exact printer vector illustration */}
      {renderDeviceSvg()}

      {/* Real device tag on bottom left */}
      {showBadge && (
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded shadow-xs border border-slate-200 backdrop-blur-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{product.brand}</span>
          </span>
        </div>
      )}
    </div>
  );
};

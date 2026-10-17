import React from 'react';

interface BDLogoProps {
  className?: string;
  size?: number;
}

export const BDLogo: React.FC<BDLogoProps> = ({ className = 'w-10 h-10', size = 40 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-white shadow-xs border border-slate-200 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-0.5"
      >
        {/* Outer dark ring */}
        <circle cx="50" cy="50" r="44" stroke="#0F172A" strokeWidth="4.5" fill="#FFFFFF" />
        
        {/* Wing Left */}
        <path
          d="M18 50 L34 41 L34 49 L20 50 Z"
          fill="#0284C7"
        />
        <path
          d="M22 53 L34 51 L34 57 Z"
          fill="#0369A1"
        />

        {/* Wing Right */}
        <path
          d="M82 50 L66 41 L66 49 L80 50 Z"
          fill="#0284C7"
        />
        <path
          d="M78 53 L66 51 L66 57 Z"
          fill="#0369A1"
        />

        {/* Center Oval / Badge Frame */}
        <ellipse cx="50" cy="50" rx="22" ry="17" stroke="#0F172A" strokeWidth="3" fill="#FFFFFF" />

        {/* Letters BD */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="20"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#0284C7"
          letterSpacing="1"
        >
          BD
        </text>
      </svg>
    </div>
  );
};

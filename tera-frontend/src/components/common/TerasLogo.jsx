/**
 * TerasLogo - Clean, Refined Architectural & Botanical Brand Emblem
 * 
 * Clean, balanced insignia for TerasTani.
 * Combines an iconic botanical sprout rooted in terrace strata ("Teras")
 * with elegant editorial typography.
 */
import { memo } from 'react';

/**
 * Clean, Balanced Vector Seal
 */
export function TerasMark({ size = 38, variant = 'default', className = '' }) {
  const isDark = variant === 'dark';
  const bgFill = isDark ? '#122B1E' : '#0B1912';
  const frameStroke = isDark ? '#FCD34D' : '#171715';
  const terraceBase = isDark ? '#FCD34D' : '#F59E0B';
  const terraceSub = isDark ? '#68BA88' : '#2F6C4C';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* 2D Tactile Physical Drop Shadow */}
      <rect
        x="4.5"
        y="4.5"
        width="32"
        height="32"
        rx="8"
        fill="#171715"
        opacity={isDark ? "0.5" : "1"}
      />

      {/* Main Botanical Deep Tile */}
      <rect
        x="2.5"
        y="2.5"
        width="32"
        height="32"
        rx="8"
        fill={bgFill}
        stroke={frameStroke}
        strokeWidth="1.75"
      />

      {/* Terasering Foundation Strata */}
      <path
        d="M10 27.5H27"
        stroke={terraceBase}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M13.5 30.5H23.5"
        stroke={terraceSub}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Growth Axis Stem */}
      <path
        d="M18.5 27.5V18"
        stroke={terraceBase}
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Left Golden Harvest Leaf */}
      <path
        d="M18.5 22C14.5 22 11.5 18 12.5 14C15.5 14 18.5 17 18.5 21Z"
        fill="#FBBF24"
        stroke="#171715"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Right Living Chlorophyll Leaf */}
      <path
        d="M18.5 19C18.5 14 22.5 10 26.5 11C26.5 15 23.5 19 18.5 19Z"
        fill={isDark ? "#4ADE80" : "#22C55E"}
        stroke="#171715"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Central Germination Node */}
      <circle
        cx="18.5"
        cy="22"
        r="1.25"
        fill="#FAF9F6"
      />
    </svg>
  );
}

/**
 * Full Clean Typographic Brand Lockup
 */
function TerasLogoComponent({
  size = 'md', // 'sm' | 'md' | 'lg'
  variant = 'default', // 'default' | 'dark'
  showTagline = true,
  tagline = 'Agrikultur Presisi Komunal',
  className = '',
}) {
  const markSizeMap = {
    sm: 30,
    md: 36,
    lg: 42,
  };

  const titleSizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const markSize = markSizeMap[size] || 36;
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Insignia */}
      <TerasMark
        size={markSize}
        variant={isDark ? 'dark' : 'default'}
      />

      {/* Wordmark */}
      <div className="flex flex-col justify-center">
        <div className={`font-display font-bold tracking-tight leading-none ${isDark ? 'text-paper' : 'text-ink'} ${titleSizeMap[size]}`}>
          Teras<span className={`font-editorial-italic font-normal ${isDark ? 'text-ochre-300' : 'text-moss-700'}`}>Tani</span>
        </div>

        {showTagline && (
          <span className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 hidden sm:block ${
            isDark ? 'text-paper/60' : 'text-graphite'
          }`}>
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
}

export const TerasLogo = memo(TerasLogoComponent);
export default TerasLogo;

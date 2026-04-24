export default function P2PHeroIcon() {
  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B2540" />
          <stop offset="100%" stopColor="#0A1022" />
        </linearGradient>
        <linearGradient id="phoneScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101832" />
          <stop offset="100%" stopColor="#070B18" />
        </linearGradient>
        <linearGradient id="phoneEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2E3A55" />
          <stop offset="50%" stopColor="#4A5878" />
          <stop offset="100%" stopColor="#2E3A55" />
        </linearGradient>
        <linearGradient id="cyanArrow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4FE8FF" />
          <stop offset="100%" stopColor="#0093FF" />
        </linearGradient>
        <linearGradient id="purpleEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A5CFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8A5CFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="coinGrad" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0%" stopColor="#F0F4FF" />
          <stop offset="55%" stopColor="#A3ADC2" />
          <stop offset="100%" stopColor="#5A6380" />
        </radialGradient>
        <radialGradient id="baseShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" result="b" />
          <feMerge>
            <feMergeNode in="b" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient background glow */}
      <ellipse cx="200" cy="210" rx="170" ry="140" fill="#00C2FF" opacity="0.18" filter="url(#softGlow)" />
      <ellipse cx="260" cy="250" rx="120" ry="100" fill="#8A5CFF" opacity="0.18" filter="url(#softGlow)" />

      {/* base plate */}
      <ellipse cx="200" cy="340" rx="160" ry="22" fill="url(#baseShadow)" />
      <g>
        <path
          d="M70 310 L330 310 L310 350 L90 350 Z"
          fill="#0D1428"
          stroke="#1F2A44"
          strokeWidth="1"
        />
        <path d="M70 310 L330 310 L325 315 L75 315 Z" fill="#141D37" />
      </g>

      {/* Left phone (tilted) */}
      <g transform="translate(80 90) rotate(-14)">
        <rect x="0" y="0" width="120" height="200" rx="22" fill="url(#phoneBody)" stroke="#2A3654" strokeWidth="1.5" />
        <rect x="6" y="6" width="108" height="188" rx="17" fill="url(#phoneScreen)" />
        <rect x="-2" y="40" width="4" height="24" rx="2" fill="#2E3A55" />
        <rect x="-2" y="72" width="4" height="40" rx="2" fill="#2E3A55" />
        <circle cx="60" cy="20" r="3" fill="#1A2440" />
        {/* purple edge glow */}
        <rect x="116" y="0" width="6" height="200" rx="3" fill="url(#purpleEdge)" opacity="0.6" />
      </g>

      {/* Right phone (tilted opposite) */}
      <g transform="translate(200 110) rotate(12)">
        <rect x="0" y="0" width="120" height="200" rx="22" fill="url(#phoneBody)" stroke="#2A3654" strokeWidth="1.5" />
        <rect x="6" y="6" width="108" height="188" rx="17" fill="url(#phoneScreen)" />
        <rect x="118" y="40" width="4" height="24" rx="2" fill="#2E3A55" />
        <rect x="118" y="72" width="4" height="40" rx="2" fill="#2E3A55" />
        <circle cx="60" cy="20" r="3" fill="#1A2440" />
        {/* cyan edge glow */}
        <rect x="-2" y="0" width="6" height="200" rx="3" fill="#00C2FF" opacity="0.35" filter="url(#softGlow)" />
      </g>

      {/* Upper curved cyan arrow */}
      <g filter="url(#glow)">
        <path
          d="M130 150 Q200 90 270 150"
          stroke="url(#cyanArrow)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="258,138 290,150 268,170" fill="#0093FF" />
      </g>

      {/* Lower curved cyan arrow */}
      <g filter="url(#glow)">
        <path
          d="M270 260 Q200 320 130 260"
          stroke="url(#cyanArrow)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="142,272 110,260 132,240" fill="#0093FF" />
      </g>

      {/* Silver coin */}
      <g filter="url(#glow)">
        <circle cx="200" cy="205" r="46" fill="url(#coinGrad)" stroke="#2A3654" strokeWidth="1.5" />
        <circle cx="200" cy="205" r="38" fill="none" stroke="#6B7590" strokeWidth="1" opacity="0.5" />
        <text
          x="200"
          y="224"
          fontSize="52"
          fontFamily="Georgia, serif"
          fontWeight="700"
          textAnchor="middle"
          fill="#3B4360"
        >
          ₣
        </text>
      </g>
    </svg>
  );
}

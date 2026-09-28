export default function BrandLogo({ size = 38, className = "" }) {
  return (
    <svg
      className={`brand-logo-svg ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Background gradient: Luxury Deep Emerald / Jade */}
        <linearGradient id="vk-bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#115e59" />
          <stop offset="60%" stopColor="#0d4e48" />
          <stop offset="100%" stopColor="#093834" />
        </linearGradient>

        {/* Gold Accent Rim */}
        <linearGradient id="vk-gold-rim" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f0c979" />
          <stop offset="50%" stopColor="#c9974e" />
          <stop offset="100%" stopColor="#9a7032" />
        </linearGradient>

        {/* Center Shield Gradient */}
        <radialGradient id="vk-center-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a7870" />
          <stop offset="100%" stopColor="#0a322f" />
        </radialGradient>
      </defs>

      {/* Rounded Squircle Container */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill="url(#vk-bg-grad)"
        stroke="url(#vk-gold-rim)"
        strokeWidth="1.2"
      />

      {/* Radial Circuit Traces & Nodes */}
      {/* Top Branches */}
      <path d="M 16 13 L 13 8 M 13 8 L 10 8 M 13 8 L 13 5" stroke="#f0c979" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <circle cx="10" cy="8" r="1.3" fill="#f0c979" />
      <circle cx="13" cy="5" r="1.3" fill="#f0c979" />

      <path d="M 24 13 L 27 8 M 27 8 L 30 8 M 27 8 L 27 5" stroke="#f0c979" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <circle cx="30" cy="8" r="1.3" fill="#f0c979" />
      <circle cx="27" cy="5" r="1.3" fill="#f0c979" />

      {/* Bottom Branches */}
      <path d="M 16 27 L 13 32 M 13 32 L 10 32 M 13 32 L 13 35" stroke="#f0c979" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <circle cx="10" cy="32" r="1.3" fill="#f0c979" />
      <circle cx="13" cy="35" r="1.3" fill="#f0c979" />

      <path d="M 24 27 L 27 32 M 27 32 L 30 32 M 27 32 L 27 35" stroke="#f0c979" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <circle cx="30" cy="32" r="1.3" fill="#f0c979" />
      <circle cx="27" cy="35" r="1.3" fill="#f0c979" />

      {/* Left & Right Connectors */}
      <path d="M 12 20 L 6 20 M 6 17 L 6 23" stroke="#2dd4bf" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      <circle cx="6" cy="17" r="1.2" fill="#2dd4bf" />
      <circle cx="6" cy="23" r="1.2" fill="#2dd4bf" />

      <path d="M 28 20 L 34 20 M 34 17 L 34 23" stroke="#2dd4bf" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      <circle cx="34" cy="17" r="1.2" fill="#2dd4bf" />
      <circle cx="34" cy="23" r="1.2" fill="#2dd4bf" />

      {/* Center Circle Hub */}
      <circle
        cx="20"
        cy="20"
        r="8.5"
        fill="url(#vk-center-grad)"
        stroke="url(#vk-gold-rim)"
        strokeWidth="1.3"
      />

      {/* Stylized 'V' Monogram */}
      <path
        d="M 16.2 16.8 L 20 23.6 L 23.8 16.8"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

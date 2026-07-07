interface OrbitProps {
  width?: number;
  height?: number;
  className?: string;
}

const Orbit = ({ width = 230, height = 64, className = "" }: OrbitProps) => {
  return (
    <div
      className={`
        absolute
        pointer-events-none
        ${className}
      `}
    >
      <svg width={width} height={height} viewBox="0 0 230 64" fill="none">
        <defs>
          {/* Glow */}
          <filter id="orbitGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Floor Glow */}
          <radialGradient id="floorGlow">
            <stop offset="0%" stopColor="#4aa8ff" stopOpacity=".45" />
            <stop offset="100%" stopColor="#4aa8ff" stopOpacity="0" />
          </radialGradient>

          {/* Orbit Gradient */}
          <linearGradient id="orbitGradient" x1="0" y1="0" x2="230" y2="0">
            <stop offset="0%" stopColor="#006ce1" stopOpacity=".08" />
            <stop offset="50%" stopColor="#67c2ff" stopOpacity=".95" />
            <stop offset="100%" stopColor="#006ce1" stopOpacity=".08" />
          </linearGradient>
        </defs>

        {/* Floor Glow */}

        <ellipse
          cx="115"
          cy="33"
          rx="95"
          ry="18"
          fill="url(#floorGlow)"
          opacity=".35"
        />

        {/* Back Orbit */}

        <ellipse
          cx="115"
          cy="32"
          rx="88"
          ry="18"
          stroke="rgba(0,108,225,.14)"
          strokeWidth="1"
        />

        {/* Main Orbit */}

        <ellipse
          cx="115"
          cy="32"
          rx="92"
          ry="19"
          stroke="url(#orbitGradient)"
          strokeWidth="1.8"
        />

        {/* Hidden Path */}

        <path
          id="orbitPath"
          d="
            M23 32
            a92 19 0 1 0 184 0
            a92 19 0 1 0 -184 0
          "
          fill="none"
        />

        {/* Main Light */}

        <circle r="5" fill="#66c7ff" filter="url(#orbitGlow)">
          <animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#orbitPath" />
          </animateMotion>
        </circle>

        {/* Small Light */}

        <circle r="2.3" fill="white" opacity=".9">
          <animateMotion
            dur="3.2s"
            begin="-0.25s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#orbitPath" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
};

export default Orbit;

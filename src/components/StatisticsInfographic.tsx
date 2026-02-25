export function StatisticsInfographic() {
  return (
    <svg
      width="450"
      height="450"
      viewBox="0 0 450 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <style>
        {`
          @keyframes barGrow1 {
            0%, 100% { transform: translateY(3px) scaleY(0.95); }
            50% { transform: translateY(0) scaleY(1); }
          }
          
          @keyframes barGrow2 {
            0%, 100% { transform: translateY(0) scaleY(1); }
            50% { transform: translateY(3px) scaleY(0.95); }
          }
          
          @keyframes lineFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          
          @keyframes pointPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes floatReverse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes blink {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          
          @keyframes dash {
            to { stroke-dashoffset: -20; }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          @keyframes wave {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-2px); }
          }
          
          @keyframes ledBlink {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.3; }
          }
          
          @keyframes circleExpand {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.15; }
          }
          @keyframes moveBetweenBalls {
            0% {
              transform: translate(240px, 220px);
            }
            25% {
              transform: translate(60px, 80px);
            }
            50% {
              transform: translate(320px, 60px);
            }
            75% {
              transform: translate(360px, 320px);
            }
            100% {
              transform: translate(240px, 220px);
            }
          }

          .person {
            animation: moveBetweenBalls 14s ease-in-out infinite;
          }
          
          .bar1 { animation: barGrow1 2s ease-in-out infinite; transform-origin: bottom; }
          .bar2 { animation: barGrow2 2.2s ease-in-out infinite; transform-origin: bottom; }
          .bar3 { animation: barGrow1 2.4s ease-in-out infinite; transform-origin: bottom; }
          .bar4 { animation: barGrow2 2.6s ease-in-out infinite; transform-origin: bottom; }
          .bar5 { animation: barGrow1 2.8s ease-in-out infinite; transform-origin: bottom; }
          
          .line-chart { animation: lineFloat 3s ease-in-out infinite; }
          .point { animation: pointPulse 2s ease-in-out infinite; }
          .point1 { animation-delay: 0s; }
          .point2 { animation-delay: 0.2s; }
          .point3 { animation-delay: 0.4s; }
          .point4 { animation-delay: 0.6s; }
          .point5 { animation-delay: 0.8s; }
          
          .float-icon1 { animation: float 3s ease-in-out infinite; }
          .float-icon2 { animation: floatReverse 3.5s ease-in-out infinite; }
          .float-icon3 { animation: float 4s ease-in-out infinite; }
          .float-icon4 { animation: floatReverse 3.2s ease-in-out infinite; }
          
          .data-point { animation: blink 2s ease-in-out infinite; }
          .data-point1 { animation-delay: 0s; }
          .data-point2 { animation-delay: 0.3s; }
          .data-point3 { animation-delay: 0.6s; }
          .data-point4 { animation-delay: 0.9s; }
          .data-point5 { animation-delay: 1.2s; }
          .data-point6 { animation-delay: 1.5s; }
          
          .dash-line { 
            animation: dash 3s linear infinite;
            stroke-dasharray: 8 4;
          }
          

          .arm-wave { animation: wave 2s ease-in-out infinite; transform-origin: top; }
          
          .led { animation: ledBlink 2s ease-in-out infinite; }
          
          .bg-circle { animation: circleExpand 4s ease-in-out infinite; }
          .bg-circle1 { animation-delay: 0s; }
          .bg-circle2 { animation-delay: 1s; }
          .bg-circle3 { animation-delay: 2s; }
          .bg-circle4 { animation-delay: 3s; }
        `}
      </style>

      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <linearGradient id="personGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="screenBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
        </filter>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Elements */}
      <circle
        cx="320"
        cy="80"
        r="65"
        fill="#dbeafe"
        opacity="0.3"
        className="bg-circle bg-circle1"
      />
      <circle
        cx="80"
        cy="320"
        r="55"
        fill="#bfdbfe"
        opacity="0.3"
        className="bg-circle bg-circle2"
      />
      <circle
        cx="370"
        cy="280"
        r="45"
        fill="#93c5fd"
        opacity="0.25"
        className="bg-circle bg-circle3"
      />
      <circle
        cx="90"
        cy="100"
        r="40"
        fill="#dbeafe"
        opacity="0.2"
        className="bg-circle bg-circle4"
      />

      {/* Monitor/Screen - Larger */}
      <g transform="translate(100, 100)" filter="url(#shadow)">
        {/* Monitor Shadow */}
        <ellipse
          cx="100"
          cy="185"
          rx="70"
          ry="8"
          fill="#1e3a8a"
          opacity="0.2"
        />

        {/* Monitor Frame */}
        <rect
          x="0"
          y="0"
          width="200"
          height="140"
          rx="8"
          fill="url(#screenGradient)"
        />
        <rect
          x="8"
          y="8"
          width="184"
          height="105"
          rx="4"
          fill="url(#screenBg)"
        />

        {/* Screen Inner Bezel */}
        <rect x="15" y="15" width="170" height="91" rx="3" fill="#0f172a" />

        {/* Chart Grid Lines */}
        <g opacity="0.2">
          <line
            x1="20"
            y1="40"
            x2="180"
            y2="40"
            stroke="#60a5fa"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1="60"
            x2="180"
            y2="60"
            stroke="#60a5fa"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1="80"
            x2="180"
            y2="80"
            stroke="#60a5fa"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1="100"
            x2="180"
            y2="100"
            stroke="#60a5fa"
            strokeWidth="0.5"
          />
        </g>

        {/* Chart Bars with Gradient */}
        <g opacity="0.95" filter="url(#glow)">
          <rect
            x="30"
            y="65"
            width="18"
            height="35"
            rx="3"
            fill="url(#chartGradient)"
            className="bar1"
          />
          <rect
            x="58"
            y="58"
            width="18"
            height="42"
            rx="3"
            fill="url(#chartGradient)"
            className="bar2"
          />
          <rect
            x="86"
            y="52"
            width="18"
            height="48"
            rx="3"
            fill="url(#chartGradient)"
            className="bar3"
          />
          <rect
            x="114"
            y="40"
            width="18"
            height="60"
            rx="3"
            fill="url(#chartGradient2)"
            className="bar4"
          />
          <rect
            x="142"
            y="48"
            width="18"
            height="52"
            rx="3"
            fill="url(#chartGradient)"
            className="bar5"
          />
        </g>

        {/* Chart Line with Points */}
        <g filter="url(#glow)">
          <path
            d="M 35 70 L 63 63 L 91 57 L 119 45 L 147 53"
            stroke="#fbbf24"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="line-chart"
          />

          {/* Line Points */}
          <circle
            cx="35"
            cy="70"
            r="4"
            fill="#fbbf24"
            className="point point1"
          />
          <circle
            cx="63"
            cy="63"
            r="4"
            fill="#fbbf24"
            className="point point2"
          />
          <circle
            cx="91"
            cy="57"
            r="4"
            fill="#fbbf24"
            className="point point3"
          />
          <circle
            cx="119"
            cy="45"
            r="4"
            fill="#fef3c7"
            className="point point4"
          />
          <circle
            cx="147"
            cy="53"
            r="4"
            fill="#fbbf24"
            className="point point5"
          />

          {/* Inner glow on highlight point */}
          <circle cx="119" cy="45" r="7" fill="#fbbf24" opacity="0.3" />
        </g>

        {/* Chart Labels/Indicators */}
        <g opacity="0.6">
          <text x="35" y="112" fill="#60a5fa" fontSize="6" textAnchor="middle">
            Jan
          </text>
          <text x="63" y="112" fill="#60a5fa" fontSize="6" textAnchor="middle">
            Feb
          </text>
          <text x="91" y="112" fill="#60a5fa" fontSize="6" textAnchor="middle">
            Mar
          </text>
          <text x="119" y="112" fill="#60a5fa" fontSize="6" textAnchor="middle">
            Apr
          </text>
          <text x="147" y="112" fill="#60a5fa" fontSize="6" textAnchor="middle">
            Mei
          </text>
        </g>

        {/* Monitor Stand */}
        <rect x="85" y="140" width="30" height="14" rx="2" fill="#1e3a8a" />
        <path d="M 75 154 L 125 154 L 120 160 L 80 160 Z" fill="#1e40af" />

        {/* Monitor Power LED */}
        <circle
          cx="100"
          cy="147"
          r="2"
          fill="#10b981"
          opacity="0.8"
          className="led"
        />
      </g>

      {/* Person Character - Larger and More Detailed */}
      <g className="person">
        {/* Shadow */}
        <ellipse
          cx="40"
          cy="135"
          rx="35"
          ry="10"
          fill="#1e40af"
          opacity="0.2"
        />

        {/* Legs */}
        <path
          d="M 25 80 L 25 108 L 15 138"
          stroke="url(#personGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 55 80 L 55 108 L 65 138"
          stroke="url(#personGradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Shoes */}
        <ellipse cx="15" cy="138" rx="6" ry="3" fill="#1e3a8a" />
        <ellipse cx="65" cy="138" rx="6" ry="3" fill="#1e3a8a" />

        {/* Body/Torso */}
        <rect
          x="25"
          y="42"
          width="30"
          height="45"
          rx="5"
          fill="url(#personGradient)"
        />

        {/* Left Arm */}
        <path
          d="M 25 50 L 10 68 L 8 75"
          stroke="url(#personGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Arm with Tablet */}
        <path
          d="M 55 50 L 68 62 L 75 60"
          stroke="url(#personGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arm-wave"
        />

        {/* Tablet/Document in hand */}
        <g filter="url(#shadow)">
          <rect x="60" y="50" width="25" height="18" rx="2" fill="#fbbf24" />
          <rect x="62" y="52" width="21" height="14" rx="1" fill="#fef3c7" />
          {/* Screen content */}
          <line
            x1="65"
            y1="55"
            x2="80"
            y2="55"
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="65"
            y1="58"
            x2="78"
            y2="58"
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="65"
            y1="61"
            x2="75"
            y2="61"
            stroke="#fbbf24"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>

        {/* Neck */}
        <rect x="35" y="35" width="10" height="8" rx="2" fill="#fbbf24" />

        {/* Head */}
        <circle cx="40" cy="24" r="16" fill="#fbbf24" />

        {/* Hair */}
        <path
          d="M 26 22 Q 28 14 40 12 Q 52 14 54 22 L 54 26 Q 52 20 40 19 Q 28 20 26 26 Z"
          fill="#1e3a8a"
        />

        {/* Ears */}
        <ellipse cx="26" cy="24" rx="3" ry="4" fill="#fbbf24" />
        <ellipse cx="54" cy="24" rx="3" ry="4" fill="#fbbf24" />

        {/* Eyes */}
        <circle cx="33" cy="24" r="2.5" fill="#1e3a8a" />
        <circle cx="47" cy="24" r="2.5" fill="#1e3a8a" />
        <circle cx="33.5" cy="23.5" r="1" fill="white" />
        <circle cx="47.5" cy="23.5" r="1" fill="white" />

        {/* Eyebrows */}
        <path
          d="M 30 20 Q 33 19 36 20"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 44 20 Q 47 19 50 20"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Smile */}
        <path
          d="M 32 30 Q 40 34 48 30"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Floating Icons - Larger */}
      <g opacity="0.8" filter="url(#shadow)">
        {/* Dollar Sign */}
        <circle cx="380" cy="150" r="26" fill="#3b82f6" opacity="0.2" />
        <circle
          cx="380"
          cy="150"
          r="22"
          fill="#3b82f6"
          className="float-icon1"
        />
        <text
          x="380"
          y="162"
          fill="white"
          fontSize="28"
          fontWeight="bold"
          textAnchor="middle"
        >
          $
        </text>

        {/* Star */}
        <circle cx="70" cy="120" r="24" fill="#60a5fa" opacity="0.2" />
        <circle
          cx="70"
          cy="120"
          r="20"
          fill="#60a5fa"
          className="float-icon2"
        />
        <text x="70" y="129" fill="white" fontSize="24" textAnchor="middle">
          ★
        </text>

        {/* Check Mark */}
        <circle cx="360" cy="380" r="24" fill="#10b981" opacity="0.2" />
        <circle
          cx="360"
          cy="380"
          r="20"
          fill="#10b981"
          className="float-icon3"
        />
        <path
          d="M 352 380 L 357 385 L 368 374"
          stroke="white"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Plus/Add */}
        <circle cx="80" cy="380" r="24" fill="#8b5cf6" opacity="0.2" />
        <circle
          cx="80"
          cy="380"
          r="20"
          fill="#8b5cf6"
          className="float-icon4"
        />
        <path
          d="M 80 372 L 80 388 M 72 380 L 88 380"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Decorative Lines */}
      <g opacity="0.2">
        <line
          x1="70"
          y1="200"
          x2="95"
          y2="200"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="215"
          x2="105"
          y2="215"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="230"
          x2="90"
          y2="230"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Floating Data Points */}
      <g opacity="0.6">
        <circle
          cx="100"
          cy="70"
          r="4"
          fill="#3b82f6"
          className="data-point data-point1"
        />
        <circle
          cx="380"
          cy="340"
          r="4"
          fill="#3b82f6"
          className="data-point data-point2"
        />
        <circle
          cx="300"
          cy="50"
          r="4"
          fill="#60a5fa"
          className="data-point data-point3"
        />
        <circle
          cx="50"
          cy="380"
          r="4"
          fill="#60a5fa"
          className="data-point data-point4"
        />
        <circle
          cx="200"
          cy="420"
          r="4"
          fill="#3b82f6"
          className="data-point data-point5"
        />
        <circle
          cx="420"
          cy="200"
          r="4"
          fill="#60a5fa"
          className="data-point data-point6"
        />
      </g>

      {/* Connecting Dots Animation Effect */}
      <g opacity="0.15">
        <line
          x1="100"
          y1="70"
          x2="300"
          y2="50"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="dash-line"
        />
        <line
          x1="380"
          y1="340"
          x2="360"
          y2="380"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="dash-line"
        />
      </g>
    </svg>
  );
}

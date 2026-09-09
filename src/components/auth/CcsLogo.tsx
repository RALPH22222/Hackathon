import React from 'react';

interface CcsLogoProps {
  className?: string;
  size?: number;
}

export const CcsLogo: React.FC<CcsLogoProps> = ({
  className = '',
  size = 110,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Text Paths */}
          {/* Top Arc for "COLLEGE OF COMPUTING STUDIES" */}
          <path
            id="topArc"
            d="M 55,200 A 145,145 0 1,1 345,200"
            fill="none"
          />

          {/* Bottom Arc for "WMSU" */}
          <path
            id="bottomArc"
            d="M 320,220 A 138,138 0 0,1 80,220"
            fill="none"
          />
        </defs>

        {/* Outer Ring */}
        <circle
          cx="200"
          cy="200"
          r="190"
          stroke="#355935"
          strokeWidth="18"
        />

        {/* Inner Ring Fill */}
        <circle
          cx="200"
          cy="200"
          r="178"
          fill="#355935"
        />

        {/* Inner White Center Disk */}
        <circle
          cx="200"
          cy="200"
          r="126"
          fill="#ffffff"
          stroke="#355935"
          strokeWidth="3.5"
        />

        {/* --- CURVED TEXT --- */}
        {/* Top Text: COLLEGE OF COMPUTING STUDIES */}
        <text
          fill="#ffffff"
          fontSize="22"
          fontWeight="800"
          letterSpacing="4"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
        >
          <textPath
            href="#topArc"
            startOffset="50%"
            textAnchor="middle"
            className="select-none"
          >
            COLLEGE OF COMPUTING STUDIES
          </textPath>
        </text>

        {/* Bottom Text: WMSU */}
        <text
          fill="#ffffff"
          fontSize="28"
          fontWeight="900"
          letterSpacing="8"
          fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
        >
          <textPath
            href="#bottomArc"
            startOffset="50%"
            textAnchor="middle"
            className="select-none"
          >
            • WMSU •
          </textPath>
        </text>

        {/* Dots separating top & bottom */}
        <circle cx="56" cy="200" r="4.5" fill="#ffffff" />
        <circle cx="344" cy="200" r="4.5" fill="#ffffff" />

        {/* Year "2016" */}
        <text
          x="200"
          y="302"
          textAnchor="middle"
          fill="#355935"
          fontSize="17"
          fontWeight="700"
          letterSpacing="2.5"
          fontFamily="'Fira Code', monospace"
        >
          2016
        </text>

        {/* --- CENTER: CIRCUIT BRAIN & CPU --- */}
        <g id="circuit-brain" transform="translate(200, 185) scale(0.82) translate(-200, -185)">
          {/* Circuit Traces forming Brain Hemisphere Contours */}
          <g stroke="#355935" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Hemisphere */}
            <path d="M 160 185 H 125 V 160 H 105 V 140 H 130 V 120 H 155" />
            <path d="M 160 170 H 135 V 145 H 150 V 130" />
            <path d="M 160 200 H 120 V 225 H 100 V 240 H 135 V 255 H 155" />
            <path d="M 160 215 H 135 V 235 H 150 V 250" />
            <path d="M 125 160 H 95 V 175 H 85 V 195 H 105" />
            <path d="M 120 225 H 90 V 210 H 80 V 195" />
            <path d="M 155 120 V 105 H 175 V 145" />
            <path d="M 155 255 V 270 H 175 V 230" />
            <path d="M 130 120 H 115 V 105 H 140" />
            <path d="M 135 255 H 115 V 270 H 140" />

            {/* Right Hemisphere */}
            <path d="M 240 185 H 275 V 160 H 295 V 140 H 270 V 120 H 245" />
            <path d="M 240 170 H 265 V 145 H 250 V 130" />
            <path d="M 240 200 H 280 V 225 H 300 V 240 H 265 V 255 H 245" />
            <path d="M 240 215 H 265 V 235 H 250 V 250" />
            <path d="M 275 160 H 305 V 175 H 315 V 195 H 295" />
            <path d="M 280 225 H 310 V 210 H 320 V 195" />
            <path d="M 245 120 V 105 H 225 V 145" />
            <path d="M 245 255 V 270 H 225 V 230" />
            <path d="M 270 120 H 285 V 105 H 260" />
            <path d="M 265 255 H 285 V 270 H 260" />

            {/* Connectors */}
            <path d="M 175 105 H 190 V 125 H 210 V 105 H 225" />
            <path d="M 175 270 H 190 V 255 H 210 V 270 H 225" />
          </g>

          {/* Circuit Nodes */}
          <g fill="#355935">
            <circle cx="85" cy="195" r="3.5" />
            <circle cx="95" cy="175" r="3" />
            <circle cx="90" cy="210" r="3" />
            <circle cx="105" cy="140" r="3.5" />
            <circle cx="100" cy="240" r="3.5" />
            <circle cx="115" cy="105" r="3" />
            <circle cx="115" cy="270" r="3" />
            <circle cx="140" cy="105" r="3.5" />
            <circle cx="140" cy="270" r="3.5" />
            <circle cx="150" cy="130" r="3" />
            <circle cx="150" cy="250" r="3" />

            <circle cx="315" cy="195" r="3.5" />
            <circle cx="305" cy="175" r="3" />
            <circle cx="310" cy="210" r="3" />
            <circle cx="295" cy="140" r="3.5" />
            <circle cx="300" cy="240" r="3.5" />
            <circle cx="285" cy="105" r="3" />
            <circle cx="285" cy="270" r="3" />
            <circle cx="260" cy="105" r="3.5" />
            <circle cx="260" cy="270" r="3.5" />
            <circle cx="250" cy="130" r="3" />
            <circle cx="250" cy="250" r="3" />

            <circle cx="200" cy="125" r="3" />
            <circle cx="200" cy="255" r="3" />
          </g>

          {/* Central Microchip */}
          <g id="cpu-chip">
            <rect
              x="160"
              y="152"
              width="80"
              height="66"
              rx="4"
              fill="#355935"
              stroke="#5d8c55"
              strokeWidth="1.5"
            />

            {/* Pins */}
            <path d="M 172 152 V 146 M 184 152 V 146 M 196 152 V 146 M 208 152 V 146 M 220 152 V 146 M 228 152 V 146" stroke="#355935" strokeWidth="2" strokeLinecap="round" />
            <path d="M 172 218 V 224 M 184 218 V 224 M 196 218 V 224 M 208 218 V 224 M 220 218 V 224 M 228 218 V 224" stroke="#355935" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160 162 H 154 M 160 174 H 154 M 160 185 H 154 M 160 196 H 154 M 160 208 H 154" stroke="#355935" strokeWidth="2" strokeLinecap="round" />
            <path d="M 240 162 H 246 M 240 174 H 246 M 240 185 H 246 M 240 196 H 246 M 240 208 H 246" stroke="#355935" strokeWidth="2" strokeLinecap="round" />

            {/* Binary Code */}
            <text
              x="200"
              y="170"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="'Fira Code', monospace"
              letterSpacing="1"
            >
              01100011
            </text>
            <text
              x="200"
              y="189"
              textAnchor="middle"
              fill="#e2efe2"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="'Fira Code', monospace"
              letterSpacing="1"
            >
              01100011
            </text>
            <text
              x="200"
              y="208"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="'Fira Code', monospace"
              letterSpacing="1"
            >
              01110011
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

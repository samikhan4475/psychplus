import React from 'react'

const BookingCancelIcon = () => {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1235_28687)">
        <g filter="url(#filter0_d_1235_28687)">
          <rect
            x="13"
            y="13"
            width="62"
            height="62"
            rx="31"
            stroke="#DDDDE3"
            strokeWidth="2"
          />
          <path
            d="M44.0012 41.6442L52.2507 33.3945L54.6077 35.7515L46.3582 44.0012L54.6077 52.2507L52.2507 54.6077L44.0012 46.3582L35.7515 54.6077L33.3945 52.2507L41.6442 44.0012L33.3945 35.7515L35.7515 33.3945L44.0012 41.6442Z"
            fill="#60646C"
          />
        </g>
      </g>
      <rect
        x="1"
        y="1"
        width="86"
        height="86"
        rx="43"
        stroke="#EDEDF2"
        strokeWidth="2"
      />
      <defs>
        <filter
          id="filter0_d_1235_28687"
          x="-8"
          y="8"
          width="104"
          height="104"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="12"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_1235_28687"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="16" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.109804 0 0 0 0 0.12549 0 0 0 0 0.141176 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1235_28687"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1235_28687"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1235_28687">
          <rect width="88" height="88" rx="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { BookingCancelIcon }

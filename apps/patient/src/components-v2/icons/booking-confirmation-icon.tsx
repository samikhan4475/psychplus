import React from 'react'

const BookingConfirmationIcon = () => {
  return (
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1235_28565)">
        <g filter="url(#filter0_d_1235_28565)">
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
            d="M35.5652 47.3883C35.1787 48.4275 34.8505 49.3888 34.557 50.3595C36.1557 49.1985 38.0591 48.4615 40.2532 48.1872C44.442 47.6637 48.1627 44.8978 50.0465 41.423L47.6202 38.9985L49.9747 36.6406C50.5308 36.0837 51.0868 35.5272 51.643 34.9711C52.3585 34.2555 53.1667 32.9311 54.0215 31.0251C44.6995 32.47 38.9914 38.1778 35.5652 47.3883ZM52.3333 38.996L54 40.6615C52.3333 45.6615 47.3333 50.6615 40.6667 51.4948C36.2191 52.0507 33.4404 55.1063 32.3304 60.6615H29C30.6667 50.6615 34 27.3281 59 27.3281C57.3348 32.3237 55.6697 35.6555 54.0045 37.3237C53.4437 37.8845 52.8885 38.44 52.3333 38.996Z"
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
          id="filter0_d_1235_28565"
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
            result="effect1_dropShadow_1235_28565"
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
            result="effect1_dropShadow_1235_28565"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1235_28565"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_1235_28565">
          <rect width="88" height="88" rx="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { BookingConfirmationIcon }

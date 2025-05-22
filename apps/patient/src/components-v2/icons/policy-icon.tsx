import React from 'react'

const PolicyIcon = () => {
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
          <g transform="translate(29, 24)">
            <path
              d="M1.30512 3.70736L15 0.664062L28.6948 3.70736C29.4575 3.87683 30 4.55318 30 5.33435V21.9789C30 25.3224 28.329 28.4447 25.547 30.2994L15 37.3307L4.453 30.2994C1.67102 28.4447 0 25.3224 0 21.9789V5.33435C0 4.55318 0.54255 3.87683 1.30512 3.70736ZM15 17.3307C17.3012 17.3307 19.1667 15.4652 19.1667 13.1641C19.1667 10.8629 17.3012 8.9974 15 8.9974C12.6988 8.9974 10.8333 10.8629 10.8333 13.1641C10.8333 15.4652 12.6988 17.3307 15 17.3307ZM7.54577 25.6641H22.4542C22.0397 21.9141 18.8605 18.9974 15 18.9974C11.1395 18.9974 7.96032 21.9141 7.54577 25.6641Z"
              fill="#60646C"
            />
          </g>
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

export { PolicyIcon }

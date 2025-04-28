import React from 'react'

const StarIcon = () => {
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
          <g transform="translate(29, 29)">
            <path
              d="M15.9981 0.666016L21.6328 8.91058L31.2151 11.7217L25.1152 19.6283L25.4027 29.6103L15.9981 26.2523L6.59359 29.6103L6.88109 19.6283L0.78125 11.7217L10.3635 8.91058L15.9981 0.666016ZM15.9981 5.39135L12.0279 11.2014L5.27416 13.182L9.57407 18.7533L9.37016 25.786L15.9981 23.4207L22.6248 25.786L22.4223 18.7533L26.7208 13.182L19.9684 11.2014L15.9981 5.39135ZM13.3315 15.9993C13.3315 17.4721 14.5253 18.666 15.9981 18.666C17.4709 18.666 18.6648 17.4721 18.6648 15.9993H21.3315C21.3315 18.9448 18.9437 21.3327 15.9981 21.3327C13.0526 21.3327 10.6648 18.9448 10.6648 15.9993H13.3315Z"
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

export { StarIcon }

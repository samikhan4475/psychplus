import { IconProps } from '@/types'

const TickIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.59961"
        y="1.59998"
        width="12.8"
        height="12.8"
        rx="3"
        className="fill-green-9"
      />
      <g filter="url(#filter0_d_13110_14085)">
        <rect
          x="2.80078"
          y="2.79993"
          width="10.4"
          height="10.4"
          rx="1.8"
          className="fill-green-9"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6235 6.21852L7.19926 10.6428L4.375 7.81852L5.22353 6.97L7.19926 8.94573L10.775 5.37L11.6235 6.21852Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_13110_14085"
          x="0.800781"
          y="1.79993"
          width="14.4004"
          height="14.4"
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
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.109804 0 0 0 0 0.12549 0 0 0 0 0.141176 0 0 0 0.03 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_13110_14085"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_13110_14085"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export { TickIcon }

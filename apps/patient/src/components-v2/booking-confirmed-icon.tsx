const BookingConfirmedIcon = ({className}: {className?: string}) => (
  <svg
    width="88"
    height="88"
    viewBox="0 0 88 88"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="84"
      height="84"
      rx="42"
      stroke="#30A46C"
      strokeWidth="4"
    />
    <g filter="url(#filter0_d_7093_4459)">
      <path
        d="M12 44C12 26.3269 26.3269 12 44 12C61.6731 12 76 26.3269 76 44C76 61.6731 61.6731 76 44 76C26.3269 76 12 61.6731 12 44Z"
        fill="#30A46C"
      />
      <path
        d="M60.3197 35.8496L39.9215 56.2234L27.6797 43.998L31.7593 39.9238L39.9215 48.075L56.24 31.7754L60.3197 35.8496Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_7093_4459"
        x="8"
        y="12"
        width="72"
        height="72"
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
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.12 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7093_4459"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7093_4459"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export { BookingConfirmedIcon }

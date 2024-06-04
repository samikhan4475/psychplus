const MasterCardIcon = () => (
  <svg
    width="52"
    height="40"
    viewBox="0 0 52 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_5799_29871)">
      <rect x="2" y="1" width="48" height="36" rx="4.5" fill="white" />
      <rect
        x="2.375"
        y="1.375"
        width="47.25"
        height="35.25"
        rx="4.125"
        stroke="#DDDDE3"
      />
      <circle cx="20.75" cy="19" r="7.875" fill="#E80B26" />
      <circle cx="31.25" cy="19" r="7.875" fill="#F59D31" />
      <path
        d="M26 24.8723C27.6111 23.4303 28.625 21.3349 28.625 19.0025C28.625 16.6702 27.6111 14.5748 26 13.1328C24.3889 14.5748 23.375 16.6702 23.375 19.0025C23.375 21.3349 24.3889 23.4303 26 24.8723Z"
        fill="#FC6020"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_5799_29871"
        x="0.5"
        y="0.25"
        width="51"
        height="39"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.75" />
        <feGaussianBlur stdDeviation="0.75" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.12549 0 0 0 0 0.141176 0 0 0 0.03 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_5799_29871"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_5799_29871"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export { MasterCardIcon }

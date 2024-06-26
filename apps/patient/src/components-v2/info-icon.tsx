interface IconProps {
  width?: string | number
  height?: string | number
}

const InfoIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    width={props.width ?? 18}
    height={props.height ?? 18}
    className="text-accent-12"
  >
    <g fill="none" stroke="currentColor">
      <path d="M24.5,12.5 C24.5,19.127 19.127,24.5 12.5,24.5 C5.873,24.5 0.5,19.127 0.5,12.5 C0.5,5.873 5.873,0.5 12.5,0.5 C19.127,0.5 24.5,5.873 24.5,12.5 Z"></path>
      <polyline points="10.917 9.917 12.417 9.917 12.417 17.417"></polyline>
      <path d="M12.5625 6.5208C12.5625 6.7968 12.3385 7.0208 12.0625 7.0208 11.7865 7.0208 11.5625 6.7968 11.5625 6.5208 11.5625 6.2448 11.7865 6.0208 12.0625 6.0208 12.3385 6.0208 12.5625 6.2448 12.5625 6.5208zM9.9167 17.9167L14.9167 17.9167"></path>
    </g>
  </svg>
)

export { InfoIcon }

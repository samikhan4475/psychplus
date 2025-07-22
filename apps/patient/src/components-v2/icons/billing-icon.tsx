import React from 'react'

const BillingIcon = ({
  fill = '#8B8D98',
  height = '16',
  width = '16',
}: {
  fill?: string
  height?: string
  width?: string
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.26882 1.40015L13.8685 2.34295L14.8113 8.94261L8.68302 15.0709C8.42268 15.3312 8.00062 15.3312 7.74022 15.0709L1.14058 8.47121C0.880224 8.21088 0.880224 7.78875 1.14058 7.52841L7.26882 1.40015ZM9.15448 7.05701C9.67515 7.57768 10.5194 7.57768 11.0401 7.05701C11.5608 6.5363 11.5608 5.69208 11.0401 5.17138C10.5194 4.65068 9.67515 4.65068 9.15448 5.17138C8.63375 5.69208 8.63375 6.5363 9.15448 7.05701Z"
        fill={fill}
      />
    </svg>
  )
}

export { BillingIcon }

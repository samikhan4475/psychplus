import React from 'react'
import { IconProps } from '@/types'

const PendingIcon = ({ width, height, ...rest }: IconProps) => {
  return (
    <svg
      width={width ?? 16}
      height={height ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M2.6665 1.3335H13.3332V4.30679L9.02424 8.00016L13.3332 11.6936V14.6668H2.6665V11.6936L6.97544 8.00016L2.6665 4.30679V1.3335ZM7.99984 7.1221L11.9998 3.69354V2.66683H3.99984V3.69354L7.99984 7.1221ZM7.99984 8.87823L3.99984 12.3068V13.3335H11.9998V12.3068L7.99984 8.87823Z"
        className="fill-pp-warning-text"
      />
      <path
        d="M8 7.12226L12 3.69371V2.66699H4V3.69371L8 7.12226ZM8 8.87839L4 12.3069V13.3337H12V12.3069L8 8.87839Z"
        className="fill-pp-warning-bg"
      />
    </svg>
  )
}

export { PendingIcon }

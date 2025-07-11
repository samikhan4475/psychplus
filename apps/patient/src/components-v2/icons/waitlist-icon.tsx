import React from 'react'

const WaitlistIcon = ({ color }: { color?: string }) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.335938 0.667969H13.6693V4.38459L8.2831 9.0013L13.6693 13.6181V17.3346H0.335938V13.6181L5.7221 9.0013L0.335938 4.38459V0.667969ZM10.5832 4.83464L12.0026 3.61803V2.33464H2.0026V3.61803L3.42199 4.83464H10.5832ZM7.0026 10.0989L2.0026 14.3846V15.668H2.83594L7.0026 13.168L11.1693 15.668H12.0026V14.3846L7.0026 10.0989Z"
        fill={color ?? 'white'}
      />
    </svg>
  )
}

export { WaitlistIcon }

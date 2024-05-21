import { useState } from 'react'

const CheckboxElement = ({ label }: { label: string }) => {
  const [checked, setChecked] = useState(false)
  return (
    <label
      className={`ralative w-fit cursor-pointer rounded-[2px] border px-2 py-[2px] text-[12px] font-[400] leading-[16px] ${
        checked
          ? 'border-[#D9E2FC] bg-[#D9E2FC] font-[700] text-[#1C2024]'
          : 'border-[#666666] text-[#666666]'
      }`}
    >
      <input
        type="checkbox"
        className="absolute opacity-0"
        onChange={() => setChecked(!checked)}
      />{' '}
      {label}
    </label>
  )
}

export { CheckboxElement }

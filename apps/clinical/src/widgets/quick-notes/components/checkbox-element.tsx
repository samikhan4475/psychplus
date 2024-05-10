import { useState } from "react"

const CheckboxElement = ({label}:{label:string}) => {
   const [checked, setChecked] =useState(false)
    return (
        <label className={`ralative cursor-pointer font-[400] text-[12px] px-2 py-[2px] leading-[16px] border rounded-[2px] w-fit ${checked ? 'bg-[#D9E2FC] border-[#D9E2FC] font-[700] text-[#1C2024]': 'border-[#666666] text-[#666666]'}`}>
            <input type="checkbox" className="absolute opacity-0" onChange={() => setChecked(!checked)} /> {label}
        </label>
    )
}

export {CheckboxElement}
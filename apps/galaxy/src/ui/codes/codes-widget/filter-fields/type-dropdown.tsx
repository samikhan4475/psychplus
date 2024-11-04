'use client'

import { SelectInput } from '@/components'
import { NEXT_OPTIONS } from '../../constant'


const TypeDropdown = ({ onChange }: any) => {
  return (
    <SelectInput
      defaultValue="Outpatient Office Visit"
      placeholder="Select"
      options={NEXT_OPTIONS}
      buttonClassName="w-full h-6"
      className="w-[180px]"
      onValueChange={onChange}
    />
  )
}

export { TypeDropdown }

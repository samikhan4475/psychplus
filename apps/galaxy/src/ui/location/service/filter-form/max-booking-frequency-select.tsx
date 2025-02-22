'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { transformInOptions } from '../transform'

const MaxBookingFrequencySelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Max Booking Frequency</FormFieldLabel>
      <SelectInput
        options={transformInOptions(options)}
        field="maxBookingFrequency"
        size="1"
        buttonClassName="w-[120px]"
      />
    </FormFieldContainer>
  )
}

const options: SelectOptionType[] = [...Array(11)].map((_, i) => ({
  value: String(i),
  label: String(i),
}))
export { MaxBookingFrequencySelect }

'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { NEXT_OPTIONS } from '../constants'
import { useStore } from '../store'

const NextDropdown = () => {
  const isFollowupDenied = useStore(state => state.isFollowupDenied)
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Next</FormFieldLabel>
      <SelectInput
        field="next"
        defaultValue="4week"
        placeholder="Select"
        disabled={isFollowupDenied}
        options={NEXT_OPTIONS}
        buttonClassName="w-full h-6"
        className="w-[90px]"
      />
    </FormFieldContainer>
  )
}

export { NextDropdown }

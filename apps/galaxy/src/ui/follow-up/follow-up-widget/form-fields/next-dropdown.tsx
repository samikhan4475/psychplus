'use client'

import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { Appointment } from '@/types'
import { NEXT_OPTIONS, NEXT_OPTIONS_UNTIMED } from '../constants'
import { useStore } from '../store'

const NextDropdown = ({ appointment }: { appointment?: Appointment }) => {
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Next</FormFieldLabel>
      <SelectInput
        field="next"
        defaultValue={appointment?.isServiceTimeDependent ? '4 week' : '2 day'}
        placeholder="Select"
        disabled={isFollowupDenied}
        options={
          appointment?.isServiceTimeDependent
            ? NEXT_OPTIONS
            : NEXT_OPTIONS_UNTIMED
        }
        buttonClassName="w-full h-6"
        className="w-[90px]"
      />
    </FormFieldContainer>
  )
}

export { NextDropdown }

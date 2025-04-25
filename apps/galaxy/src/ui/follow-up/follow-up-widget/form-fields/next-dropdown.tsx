'use client'

import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { Appointment } from '@/types'
import { NEXT_OPTIONS, NEXT_OPTIONS_UNTIMED } from '../constants'
import { SchemaType } from '../schema'
import { useStore } from '../store'

const NextDropdown = ({ appointment }: { appointment?: Appointment }) => {
  const form = useFormContext<SchemaType>()
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Next</FormFieldLabel>
      <SelectInput
        field="next"
        placeholder="Select"
        disabled={isFollowupDenied}
        options={
          appointment?.isServiceTimeDependent
            ? NEXT_OPTIONS
            : NEXT_OPTIONS_UNTIMED
        }
        buttonClassName="w-full h-6"
        className="w-[90px]"
        onValueChange={(value) => {
          if (value) form.setValue('next', value)
        }}
      />
    </FormFieldContainer>
  )
}

export { NextDropdown }

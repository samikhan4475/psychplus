'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { Appointment } from '@/types'
import { searchLocationOptionsAction } from '@/ui/schedule/client-actions'
import { SchemaType } from '../schema'
import { useStore } from '../store'

const LocationDropdown = ({
  disabled,
  appointment,
}: {
  disabled: boolean
  appointment?: Appointment
}) => {
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)
  const form = useFormContext<SchemaType>()

  const fetchLocationOptions = useCallback(() => {
    return searchLocationOptionsAction({ stateCode: appointment?.stateCode })
  }, [appointment?.stateCode])

  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <AsyncSelect
        field="location"
        placeholder="Select Location"
        fetchOptions={fetchLocationOptions}
        buttonClassName="w-full h-6"
        className="w-[150px]"
        disabled={disabled || isFollowupDenied}
        onValueChange={(value) => {
          if (value === '') return
          form.setValue('location', value)
          form.setValue('providerId', undefined)
        }}
      />
      <FormFieldError name="location" className="self-center" />
    </FormFieldContainer>
  )
}

export { LocationDropdown }

'use client'

import React from 'react'
import { AppointmentType } from '@psychplus-v2/constants'
import { getAppointmentTypeLabel } from '@psychplus-v2/utils'
import { FormField } from '@/components-v2'
import { SelectInput } from '@/components-v2/select-input'

const AppointmentTypeSelect = () => {
  return (
    <FormField
      containerClassName="flex-1"
      name="requestedMedium"
      label="Appointment Type"
    >
      <SelectInput
        field="requestedMedium"
        placeholder="Select"
        buttonClassName="font-[400] h-[38px] text-gray-12  text-2 w-full [&_span]:bg-red-500 bg-[white] outline outline-1 outline-gray-7"
        variant="soft"
        size="1"
        options={[
          {
            value: AppointmentType.Virtual,
            label: getAppointmentTypeLabel(AppointmentType.Virtual),
          },
          {
            value: AppointmentType.InPerson,
            label: getAppointmentTypeLabel(AppointmentType.InPerson),
          },
        ]}
      />
    </FormField>
  )
}

export { AppointmentTypeSelect }

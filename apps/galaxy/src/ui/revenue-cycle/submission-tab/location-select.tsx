'use client'
import React from 'react'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getClinicsOptionsAction } from '@/actions'

const LocationSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel >
        Location
      </FormFieldLabel>
      <AsyncSelect
        fetchOptions={getClinicsOptionsAction}
        field="locationId"
        buttonClassName="w-[102px]"
      />
    </FormFieldContainer>
  )
}
export { LocationSelect }

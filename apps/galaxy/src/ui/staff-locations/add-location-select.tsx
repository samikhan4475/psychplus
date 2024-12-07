import React from 'react'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AsyncRowSelect } from '@/components/async-row-select'
import { getPatientsOptionsAction } from '../revenue-cycle/actions'

const AddLocationSelect = () => {
  return (
    <FormFieldContainer className="flex-row gap-x-2">
      <FormFieldLabel>Select & Add Location</FormFieldLabel>
      <AsyncRowSelect
        size="1"
        className="w-[280px]"
        allowMultiple
        label="Select Location"
        onRowClick={(row) => {
          // TODO: whatever we want with the row
        }}
        fetchOptions={getPatientsOptionsAction}
      />
    </FormFieldContainer>
  )
}

export { AddLocationSelect }

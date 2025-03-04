'use client'

import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const StaffSelect = () => {
  const { options, loading } = useStore((state) => ({
    options: state.staffOptions,
    loading: state.staffLoading,
  }))

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Staff Name</FormFieldLabel>
      <SelectInput
        size="1"
        field="forwardingId"
        options={options}
        loading={loading}
        buttonClassName="w-[120px] h-6"
      />
    </FormFieldContainer>
  )
}

export { StaffSelect }

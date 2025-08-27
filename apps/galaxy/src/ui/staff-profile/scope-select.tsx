'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from './schema'

const ScopeSelect = () => {
  const form = useFormContext<SchemaType>()
  const staffScope = form.watch('staffScope')
  
  const options = staffScope ? [{ label: staffScope, value: staffScope }] : []

  return (
    <FormFieldContainer>
      <FormFieldLabel>Scope</FormFieldLabel>
      <SelectInput
        options={options}
        value={staffScope}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        disabled
      />
    </FormFieldContainer>
  )
}

export { ScopeSelect } 
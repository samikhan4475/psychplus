import React from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from './staff-filter-form'

const VirtualWaitRoomField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Virtual Wait Room</FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none] "
        {...form.register('virtualRoomLink')}
        placeholder="Search"
      />
    </FormFieldContainer>
  )
}

export { VirtualWaitRoomField }

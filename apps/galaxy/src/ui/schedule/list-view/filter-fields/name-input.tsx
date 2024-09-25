'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { type ListViewSchema } from '../list-view-schema'

const NameInput = () => {
  const form = useFormContext<ListViewSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Name</FormFieldLabel>
      <TextField.Root
        placeholder="Search by Name"
        size="1"
        {...form.register('name')}
      />
    </FormFieldContainer>
  )
}

export { NameInput }

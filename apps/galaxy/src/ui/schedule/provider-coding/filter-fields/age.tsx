'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const Age = () => {
  const form = useFormContext<ProviderCodingSchema>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Age</FormFieldLabel>
      <TextField.Root
        placeholder="Add Age"
        className='flex-1'
        size="1"
        type="number"
        {...form.register('age', {
          setValueAs: (val) => val || undefined,
        })}
      />
    </FormFieldContainer>
  )
}

export { Age }

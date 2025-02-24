'use client'

import { TextField } from '@radix-ui/themes'
import { Path, useFormContext } from 'react-hook-form'
import { useStore } from '@/ui/assigning-authorities/store'
import { cn } from '@/utils'
import { SchemaType } from '../code-schema'

const EditableCell = ({
  defaultValue,
  autoFocus = false,
  field,
}: {
  defaultValue?: string
  autoFocus?: boolean
  field: Path<SchemaType>
}) => {
  const form = useFormContext<SchemaType>()
  const fieldParts = field.split('.') as [
    keyof SchemaType,
    Path<SchemaType[keyof SchemaType]>,
  ]
  const hasFieldError = form.formState.errors[fieldParts[0]]?.[fieldParts[1]]

  const { saving } = useStore()

  return (
    <TextField.Root
      defaultValue={defaultValue}
      {...form.register(field)}
      disabled={saving}
      autoFocus={autoFocus}
      className={cn(
        'h-full w-full',
        hasFieldError &&
          'border border-tomato-11 outline-1 outline-tomato-11 focus:border-tomato-11',
      )}
    />
  )
}

export { EditableCell }

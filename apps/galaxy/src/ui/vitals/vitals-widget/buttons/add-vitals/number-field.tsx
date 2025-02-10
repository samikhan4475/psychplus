import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { cn } from '@/utils'
import { SchemaType } from './add-vitals-form'

const NumberField = ({
  field,
  unit,
  className,
  disabled,
}: {
  field: SchemaType
  unit?: string
  className?: string
  disabled?: boolean
}) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="h-5 flex-row gap-1">
      <TextField.Root
        size="1"
        type="number"
        step="0.01"
        {...form.register(field as string)}
        className={cn('h-full', className)}
        disabled={disabled}
      />
      {unit && <FormFieldLabel>{unit}</FormFieldLabel>}
    </FormFieldContainer>
  )
}

export { NumberField }

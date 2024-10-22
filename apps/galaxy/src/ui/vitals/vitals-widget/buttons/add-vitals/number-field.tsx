import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { cn } from '@/utils'
import { SchemaType } from './add-vitals-form'

const NumberField = ({
  field,
  unit,
  className,
}: {
  field: SchemaType
  unit?: string
  className?: string
}) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="h-5 flex-row gap-1">
      <TextField.Root
        size="1"
        type="number"
        min="0"
        {...form.register(field as string)}
        className={cn('h-full', className)}
      />
      {unit && <FormFieldLabel>{unit}</FormFieldLabel>}
    </FormFieldContainer>
  )
}

export { NumberField }

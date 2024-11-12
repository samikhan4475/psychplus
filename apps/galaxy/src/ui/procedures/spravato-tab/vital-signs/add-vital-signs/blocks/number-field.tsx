import { FormFieldContainer, FormFieldLabel, NumberInput } from '@/components'
import { cn } from '@/utils'

const NumberField = ({
  field,
  unit,
  className,
}: {
  field: string
  unit?: string
  className?: string
}) => {
  return (
    <FormFieldContainer className="h-4 flex-row gap-1">
      <NumberInput
        field={field}
        format="###"
        className={cn('h-full', className)}
        placeholder=""
      />
      {unit && <FormFieldLabel>{unit}</FormFieldLabel>}
    </FormFieldContainer>
  )
}

export { NumberField }

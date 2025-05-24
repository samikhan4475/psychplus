import { Checkbox } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { AddTemplateSchemaType } from '../schema'

interface FieldRequiredCellProps {
  rowIndex: number
}

const FieldRequiredCell = ({ rowIndex }: FieldRequiredCellProps) => {
  const { watch, setValue, control } = useFormContext<AddTemplateSchemaType>()
  const isRequired = watch(`parameters.${rowIndex}.isRequired`) || false
  const { fields } = useFieldArray({
    control,
    name: 'parameters',
  })
  const dateFilterExists = fields.find(
    (field) => field.parameterCode === 'DateFilterType',
  )
  const parameterCode = watch(`parameters.${rowIndex}.parameterCode`)
  const isDisabled =
    ((['StartDate', 'EndDate'].includes(parameterCode) && dateFilterExists) ||
      parameterCode === 'DateFilterType') &&
    isRequired

  return (
    <Checkbox
      size="1"
      disabled={!!isDisabled}
      checked={isRequired}
      onCheckedChange={(checked: boolean) => {
        setValue(`parameters.${rowIndex}.isRequired`, checked)
      }}
      highContrast
    />
  )
}

export { FieldRequiredCell }

import { useFormContext } from 'react-hook-form'
import { SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { useStore } from '../../store'
import { getFieldType } from '../../utils'
import { AddTemplateSchemaType } from '../schema'

const FieldCodeCell = ({
  rowIndex,
  filteredOptions,
  disabled,
}: {
  rowIndex: number
  filteredOptions?: SelectOptionType[]
  disabled?: boolean
}) => {
  const { watch, setValue } = useFormContext<AddTemplateSchemaType>()
  const { templateFilters } = useStore()
  const parameters = templateFilters?.codes

  return (
    <SelectCell
      value={watch(`parameters.${rowIndex}.parameterCode`)}
      options={filteredOptions || []}
      disabled={disabled}
      onValueChange={(value) => {
        setValue(`parameters.${rowIndex}.parameterCode`, value)
        setValue(
          `parameters.${rowIndex}.displayName`,
          getFieldType(parameters || [], value),
        )
      }}
    />
  )
}

export { FieldCodeCell }

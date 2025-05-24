import { useFieldArray, useFormContext } from 'react-hook-form'
import { SelectCell } from '@/components'
import { SelectOptionType } from '@/types'
import { useStore } from '../../store'
import { STATUS, TemplateParameter } from '../../types'
import { getFieldType } from '../../utils'
import { AddTemplateSchemaType, TemplateSchemaType } from '../schema'

const FieldCodeCell = ({
  rowIndex,
  filteredOptions,
  disabled,
  addRow,
}: {
  rowIndex: number
  filteredOptions?: SelectOptionType[]
  disabled?: boolean
  addRow: (parameter?: TemplateParameter) => void
}) => {
  const { watch, setValue, control } = useFormContext<TemplateSchemaType>()

  const { fields } = useFieldArray({
    control,
    name: 'parameters',
  })
  const { templateFilters } = useStore()
  const parameters = templateFilters?.codes

  const onValueChange = (value: string) => {
    const displayName = getFieldType(parameters || [], value)

    setValue(`parameters.${rowIndex}.parameterCode`, value)
    setValue(`parameters.${rowIndex}.displayName`, displayName)
    setValue(`parameters.${rowIndex}.isRequired`, true)

    if (value === 'DateFilterType') {
      const hasParam = (code: string) =>
        fields?.some((field) => field.parameterCode === code)

      const addDateParam = (code: string) => {
        if (!hasParam(code)) {
          const param = parameters?.find((p) => p.code === code)
          if (param) {
            addRow({
              parameterCode: param.code,
              displayName: param.displayName,
              isRequired: true,
              resourceStatus: STATUS.ACTIVE,
              displayOrder: fields.length,
            })
          }
        }
      }

      addDateParam('StartDate')
      addDateParam('EndDate')
    }
  }

  const isDateFilterExists =
    fields.some((field) => field.parameterCode === 'DateFilterType') &&
    (fields[rowIndex].parameterCode === 'StartDate' ||
      fields[rowIndex].parameterCode === 'EndDate')

  return (
    <SelectCell
      value={watch(`parameters.${rowIndex}.parameterCode`)}
      options={filteredOptions || []}
      disabled={disabled || isDateFilterExists}
      onValueChange={onValueChange}
    />
  )
}

export { FieldCodeCell }

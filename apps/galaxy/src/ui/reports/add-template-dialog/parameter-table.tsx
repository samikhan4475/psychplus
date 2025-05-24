import { useFieldArray, useFormContext } from 'react-hook-form'
import { DataTable, FormFieldError } from '@/components'
import { useStore } from '../store'
import { STATUS, TemplateParameter } from '../types'
import { AddRowButton } from './add-row-button'
import { createColumns } from './parameter-table-columns'
import { TemplateSchemaType } from './schema'

const ParametersTable = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TemplateSchemaType>()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'parameters',
  })
  const templateID = watch('id')
  const addRow = (templateParameter?: TemplateParameter) => {
    if (!templateParameter) {
      append({
        parameterCode: '',
        displayName: '',
        isRequired: false,
        resourceStatus: STATUS.ACTIVE,
        displayOrder: fields.length,
      })
    } else {
      append(templateParameter)
    }
  }

  const { templateFilters } = useStore()

  const selectedFieldCodes = fields.map((field) => field.parameterCode)

  const parameters = templateFilters?.codes

  const reportParametersOptions = parameters?.map((parameter) => ({
    label: parameter.code,
    value: parameter.code,
  }))

  const getFilteredOptionsForRow = (rowIndex: number) => {
    const selectedCodesForRow = selectedFieldCodes.filter(
      (code, index) => index !== rowIndex,
    )

    return (
      reportParametersOptions?.filter(
        (option) => !selectedCodesForRow.includes(option.value),
      ) || []
    )
  }

  const isRowDisabled = (rowIndex: number) => {
    return (
      selectedFieldCodes[rowIndex] !== undefined &&
      selectedFieldCodes[rowIndex] !== '' &&
      rowIndex !== fields.length - 1
    )
  }

  fields.forEach((field, index) => {
    if (field.reportTemplateId) {
      setValue(`parameters.${index}.reportTemplateId`, field.reportTemplateId)
    } else if (field.id && templateID) {
      setValue(`parameters.${index}.reportTemplateId`, templateID)
    } else if (field.id) {
      setValue(`parameters.${index}.reportTemplateId`, field.id)
    }
    setValue(`parameters.${index}.displayOrder`, index)
  })
  const parameterErrors = errors.parameters || {}
  const firstErrorKey = Object.keys(parameterErrors).find((key) => {
    const numericKey = Number(key)
    return parameterErrors[numericKey]?.parameterCode
  })

  const isAddDisabled =
    fields.length > 0 && !watch(`parameters.${fields.length - 1}.parameterCode`)

  return (
    <>
      <AddRowButton onAddRow={() => addRow()} disabled={isAddDisabled} />
      <DataTable
        columns={createColumns(
          move,
          remove,
          fields.length,
          getFilteredOptionsForRow,
          isRowDisabled,
          addRow,
        )}
        data={fields}
      />
      {firstErrorKey && (
        <FormFieldError name={`parameters.${firstErrorKey}.parameterCode`} />
      )}
    </>
  )
}

export { ParametersTable }

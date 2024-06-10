import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form'
import { FormTableSelect } from '@psychplus/form'
import { TableCellInput, TableCellText } from '@psychplus/ui/table-cell'
import { CircleArrowDown, CircleArrowUp, DeleteIcon } from '@/components/icons'
import { useStore } from '@psychplus/reports/store'
import { Parameter } from '@psychplus/reports'

const columnHeaderClasses = 'text-[#000000] text-[12px] font-[500] pl-[3px]'
const columnCellClasses = 'text-[#000000] h-5 text-[12px]'

const Columns = (
  move: UseFieldArrayMove,
  remove: UseFieldArrayRemove,
  totalFields: number,
) => {
  const { register, watch } = useFormContext()
  const parameters = useStore((state) => state.parameterCodeSets)
  const options = parameters.map((parameter) => ({
    label: parameter.code,
    value: parameter.code,
  }))

  const getFieldType = (code: string) => {
    const fieldType = parameters.find((parameter) => parameter.code === code)?.displayName
    return fieldType ?? ''
  }

  const templateColumns: ColumnDef<Parameter>[] = [
    {
      id: 'serial-number',
      header: () => <TableCellText text="#" className={columnHeaderClasses} />,
      cell: ({ row }) => (
        <TableCellText
          text={`${row.index + 1}`}
          className={columnCellClasses}
        />
      ),
    },
    {
      id: 'move-action',
      header: () => (
        <TableCellText text="Move" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <Flex>
          <CircleArrowUp
            className={
              row.index
                ? 'cursor-pointer text-[#60646C]'
                : 'cursor-pointer text-[#B9BBC6]'
            }
            onClick={() => {
              if (row.index === 0) return
              move(row.index, row.index - 1)
            }}
          />
          <CircleArrowDown
            className="cursor-pointer text-[#60646C]"
            onClick={() => {
              if (row.index === totalFields - 1) return
              move(row.index, row.index + 1)
            }}
          />
        </Flex>
      ),
    },
    {
      id: 'field-code',
      accessorKey: 'reportParameterCode',
      header: () => (
        <TableCellText text="Field Code" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <FormTableSelect
          placeholder="Select field type"
          buttonClassName='h-5 pl-0 [box-shadow:none] w-full'
          {...register(`reportTemplateParameters.${row.index}.reportParameterCode`)}
          options={options}
        />
      ),
    },
    {
      id: 'field-type',
      accessorKey: 'reportParameterCode',
      header: () => (
        <TableCellText text="Field Type" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={getFieldType(watch(`reportTemplateParameters.${row.index}.reportParameterCode`))}
          className={columnCellClasses}
        />
      ),
    },
    {
      id: 'field-description',
      accessorKey: 'displayName',
      header: () => (
        <TableCellText text="Field Label" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <TableCellInput
          className={columnCellClasses}
          placeholder="Add field label"
          {...register(`reportTemplateParameters.${row.index}.displayName`)}
        />
      ),
    },
    {
      id: 'action',
      accessorKey: 'action',
      header: () => (
        <TableCellText text="Actions" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <Flex justify="center" align="center">
          <DeleteIcon
            className="cursor-pointer"
            onClick={() => remove(row.index)}
          />
        </Flex>
      ),
    },
  ]
  return templateColumns
}

export { Columns }

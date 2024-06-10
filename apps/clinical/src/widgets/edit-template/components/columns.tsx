import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  UseFieldArrayMove,
  UseFieldArrayRemove,
  useFormContext,
} from 'react-hook-form'
import { FormTableSelect } from '@psychplus/form'
import { type Parameter } from '@psychplus/reports'
import { useStore } from '@psychplus/reports/store'
import { TableCellText } from '@psychplus/ui/table-cell'
import { CircleArrowDown, CircleArrowUp, DeleteIcon } from '@/components/icons'
import { CellInput } from './table-cell-input'

const columnHeaderClasses = 'text-[#000000] text-[12px] font-[500] pl-1'
const columnCellClasses = 'text-[#000000] h-5 text-[12px]'

const Columns = (
  move: UseFieldArrayMove,
  remove: UseFieldArrayRemove,
  totalFields: number,
) => {
  const { register, watch, getValues, setValue } = useFormContext()
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
      enableHiding: false,
    },
    {
      id: 'resourceStatus',
      accessorKey: 'resourceStatus',
      header: () => <TableCellText text="Status" className={columnHeaderClasses} />,
      cell: ({ row }) => (
        <TableCellText
          text={row.original.resourceStatus}
          className={columnCellClasses}
        />
      ),
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
      enableHiding: true,
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
            className={
              row.index === totalFields - 1
                ? 'cursor-pointer text-[#B9BBC6]'
                : 'cursor-pointer text-[#60646C]'
            }
            onClick={() => {
              if (row.index === totalFields - 1) return
              move(row.index, row.index + 1)
            }}
          />
        </Flex>
      ),
      enableHiding: false,
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
          options={options}
          buttonClassName='h-5 pl-0 [box-shadow:none] w-full'
          {...register(
            `reportTemplateParameters.${row.index}.reportParameterCode`,
          )}
        />
      ),
      enableHiding: false,
    },
    {
      id: 'field-type',
      accessorKey: 'reportParameterCode',
      header: () => (
        <TableCellText text="Field Type" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <TableCellText
          text={getFieldType(
            watch(`reportTemplateParameters.${row.index}.reportParameterCode`),
          )}
          className={columnCellClasses}
        />
      ),
      enableHiding: false,
    },
    {
      id: 'field-description',
      accessorKey: 'displayName',
      header: () => (
        <TableCellText text="Field Label" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <CellInput
          name={`reportTemplateParameters.${row.index}.displayName`}
          placeholder={'Add Field label'}
          className={`${columnCellClasses} outline-none`}
        />
      ),
      enableHiding: false,
    },
    {
      id: 'action',
      accessorKey: 'action',
      header: () => (
        <TableCellText text="Action" className={columnHeaderClasses} />
      ),
      cell: ({ row }) => (
        <Flex justify="center" align="center">
          <DeleteIcon
            className="cursor-pointer"
            onClick={() => {
              if (getValues(`reportTemplateParameters.${row.index}.id`)) {
                setValue(`reportTemplateParameters.${row.index}.id`, 'Deleted')
              }
              remove(row.index)
            }}
          />
        </Flex>
      ),
      enableHiding: false,
    },
  ]
  return templateColumns
}

export { Columns }

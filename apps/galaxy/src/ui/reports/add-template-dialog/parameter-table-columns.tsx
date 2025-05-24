import { ColumnDef } from '@tanstack/react-table'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayMove,
  UseFieldArrayRemove,
} from 'react-hook-form'
import { ColumnHeader, TextCell } from '@/components'
import { SelectOptionType } from '@/types'
import { TemplateParameter } from '../types'
import {
  DeleteActionCell,
  FieldCodeCell,
  FieldLabelCell,
  FieldRequiredCell,
  FieldTypeCell,
  MoveActionCell,
  SerialNumberCell,
} from './cells'
import { TemplateSchemaType } from './schema'

const createColumns = (
  move: UseFieldArrayMove,
  remove: UseFieldArrayRemove,
  totalFields: number,
  getFilteredOptionsForRow: (rowIndex: number) => SelectOptionType[],
  isRowDisabled: (rowIndex: number) => boolean,
  addRow: (parameter?: TemplateParameter) => void,
): ColumnDef<
  FieldArrayWithId<TemplateSchemaType, 'parameters', 'id'>,
  unknown
>[] => {
  return [
    {
      id: 'serial-number',
      header: () => <ColumnHeader label="#" />,
      cell: ({ row }) => <SerialNumberCell index={row.index} />,
    },
    {
      id: 'move-action',
      header: () => <ColumnHeader label="Move" />,
      cell: ({ row }) => (
        <MoveActionCell
          index={row.index}
          move={move}
          totalFields={totalFields}
        />
      ),
    },
    {
      id: 'field-code',
      accessorKey: 'parameterCode',
      header: () => <ColumnHeader label="Field Code" />,
      cell: ({ row }) => (
        <FieldCodeCell
          rowIndex={row.index}
          addRow={addRow}
          filteredOptions={getFilteredOptionsForRow(row.index)}
          disabled={isRowDisabled(row.index)}
        />
      ),
    },
    {
      id: 'field-type',
      header: () => <ColumnHeader label="Field Type" />,
      cell: ({ row }) => <FieldTypeCell rowIndex={row.index} />,
    },
    {
      id: 'displayName',
      header: () => <ColumnHeader label="Field Label" />,
      cell: ({ row }) => <FieldLabelCell rowIndex={row.index} />,
    },
    {
      id: 'defaultValue',
      header: () => <ColumnHeader label="Default Value (optional)" />,
      cell: () => <TextCell>Default Values</TextCell>,
    },
    {
      id: 'isRequired',
      header: () => <ColumnHeader label="Required" />,
      cell: ({ row }) => <FieldRequiredCell rowIndex={row.index} />,
    },
    {
      id: 'action',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <DeleteActionCell index={row.index} remove={remove} />,
    },
  ]
}

export { createColumns }

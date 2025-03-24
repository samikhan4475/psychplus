import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { ProfessionalClaimServiceLine } from '@/types'
import { ActionCellDropdown } from './action-cell'
import { DOSFromCell } from './dos-from-cell'
import { DOSToCell } from './dos-to-cell'
import { ModifierCellSelect } from './modifiers-cell'
import { ProcedureCell } from './procedure-cell'
import { UnitsCell } from './units-cell'

const columns = (
  claimServiceLines: ProfessionalClaimServiceLine[],
): ColumnDef<ProfessionalClaimServiceLine>[] => {
  return [
    {
      id: 'dateOfServiceFrom',
      accessorKey: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOS From"
        />
      ),
      cell: ({ row }) => <DOSFromCell rowIndex={row.index} />,
      enableHiding: true,
    },
    {
      id: 'dateOfServiceTo',
      accessorKey: 'dateOfServiceTo',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOS To"
        />
      ),
      cell: ({ row }) => <DOSToCell rowIndex={row.index} />,
      enableHiding: true,
    },
    {
      id: 'cptCode',
      accessorKey: 'cptCode',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Procedure"
        />
      ),
      cell: ({ row }) => <ProcedureCell rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'modifiers',
      accessorKey: 'modifiers',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Modifiers"
        />
      ),
      cell: ({ row }) => <ModifierCellSelect rowIndex={row.index} />,

      enableHiding: true,
    },

    {
      id: 'units',
      accessorKey: 'units',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Units"
        />
      ),
      cell: ({ row }) => <UnitsCell rowIndex={row.index} />,

      enableHiding: true,
    },

    {
      id: 'actions-column',
      accessorKey: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => <ActionCellDropdown rowIndex={row.index} />,
      enableHiding: false,
    },
  ]
}

export { columns }

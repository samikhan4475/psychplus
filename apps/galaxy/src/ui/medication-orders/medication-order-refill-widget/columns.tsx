import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DateTimeCell,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { ActionsCell } from './cells/actions-cell'
import { CollapseCell } from './cells/collaps-cell'
import EffectiveDateCell from './cells/effective-date-cell'
import LastRefillDateCell from './cells/last-refill-date-cell'
import MedicineDaysSupplyCell from './cells/medicine-days-supply-cell'
import MedicineDosageCell from './cells/medicine-dosage-cell'
import MedicineNameCell from './cells/medicine-name-cell'
import MedicineQtyCell from './cells/medicine-qty-cell'
import NotesNameCell from './cells/notes-cell'
import PatientNameCell from './cells/patient-name-cell'
import RefillCell from './cells/refills-cell'
import SigCell from './cells/sig-cell'
import SubstitutionCell from './cells/substitution-cell'
import { MedicationRefill } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<MedicationRefill>[] => {
  return [
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      header: ({ column }) => <ColumnHeader column={column} label="Hx" />,
      cell: CollapseCell,
    },
    {
      id: 'notificationDateTime',
      accessorKey: 'notificationDateTime',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Requested Date"
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell>
          {formatDate(`${row.original.notificationDateTime}`, 'MM/dd/yyyy')}
        </DateTimeCell>
      ),
    },
    {
      id: 'patientFirstName',
      accessorKey: 'patientFirstName',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Patient Name"
        />
      ),
      cell: ({ row }) => <PatientNameCell row={row} />,
    },
    {
      id: 'providerName',
      accessorKey: 'proviproviderNamedername',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Prescribing Provider"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.staff?.legalName?.firstName}{' '}
          {row.original.staff?.legalName?.lastName}
          {row.original.staff?.legalName?.title}
        </TextCell>
      ),
    },
    {
      id: 'pharmacyName',
      accessorKey: 'pharmacyName',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Pharmacy Name"
        />
      ),
      cell: ({ row }) => (
        <LongTextCell className="w-[150px]">
          {row.original?.pharmacyName}
        </LongTextCell>
      ),
    },
    {
      id: 'drugDescription',
      accessorKey: 'drugDescription',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Medicine Name"
        />
      ),
      cell: ({ row }) => <MedicineNameCell row={row} />,
    },
    {
      id: 'quantityValue',
      accessorKey: 'quantityValue',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Qty"
        />
      ),
      cell: ({ row }) => <MedicineQtyCell row={row} />,
    },
    {
      id: 'quantityUnitOfMeasureCode',
      accessorKey: 'quantityUnitOfMeasureCode',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Dosage"
        />
      ),
      cell: ({ row }) => <MedicineDosageCell row={row} />,
    },

    {
      id: 'daysSupply',
      accessorKey: 'daysSupply',
      header: ({ column }) => (
        <ColumnHeader
          label="Days Supply"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <MedicineDaysSupplyCell row={row} />,
    },
    {
      id: 'isSubstitutionsAllowed',
      accessorKey: 'isSubstitutionsAllowed',
      header: ({ column }) => (
        <ColumnHeader
          label="Substitution"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <SubstitutionCell row={row} />,
    },
    {
      id: 'signatureText',
      accessorKey: 'signatureText',
      header: ({ column }) => (
        <ColumnHeader
          label="Sig"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <SigCell row={row} />,
    },
    {
      id: 'refills',
      accessorKey: 'refills',
      header: ({ column }) => (
        <ColumnHeader
          label="Refills"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RefillCell row={row} />,
    },
    {
      id: 'lastFillDate',
      accessorKey: 'lastFillDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Last Refill Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <LastRefillDateCell row={row} />,
    },
    {
      id: 'startDateTime',
      accessorKey: 'startDateTime',
      header: ({ column }) => (
        <ColumnHeader
          label="Effective Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <EffectiveDateCell row={row} />,
    },
    {
      id: 'notes',
      header: ({ column }) => (
        <ColumnHeader
          label="Notes/Comments"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <NotesNameCell row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader className="w-[150px]" label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }

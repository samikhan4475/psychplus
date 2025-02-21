import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DateTimeCell,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort, type Claim } from '@/types'
import { getSortDir } from '@/utils'
import { formatDate } from '@/utils/date'
import { formatAmount, getInsurancePayerName } from '../utils'
import { ActionsCell } from './actions-cell'
import { CellCPTCodes } from './cell-cpt-codes'
import { ClaimNumberCell } from './table-row-claim-number-cell'
import { NoteSignedStatusCell } from './table-row-note-signed-status-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Claim>[] => {
  return [
    {
      id: 'claimNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Claim #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ClaimNumberCell,
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          label="DOS"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.dateOfServiceFrom && (
            <DateTimeCell>
              {formatDate(`${row.original.dateOfServiceFrom}`, 'MM/dd/yyyy')}
            </DateTimeCell>
          )
        )
      },
    },
    {
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
    },
    {
      id: 'patientStatusCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientStatusCode}</TextCell>,
    },
    {
      id: 'patientDateOfBirth',
      header: ({ column }) => (
        <ColumnHeader
          label="DOB"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="w-[80px]">
          {formatDate(`${row.original.patientDateOfBirth}`, 'MM/dd/yyyy')}
        </DateTimeCell>
      ),
    },
    {
      id: 'patientAge',
      header: ({ column }) => (
        <ColumnHeader
          label="Age"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientAge}</TextCell>,
    },
    {
      id: 'patientGender',
      header: ({ column }) => (
        <ColumnHeader
          label="Sex"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientGender}</TextCell>,
    },
    {
      id: 'patientAccountNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="MRN #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.patientAccountNumber}</TextCell>
      ),
    },
    {
      id: 'serviceType',
      header: ({ column }) => (
        <ColumnHeader
          label="Service Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.serviceType}</TextCell>,
    },

    {
      id: 'visitTypeCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="w-[150px]">{row.original.visitTypeCode}</TextCell>
      ),
    },

    {
      id: 'visitStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Sequence"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.visitStatus}</TextCell>,
    },

    {
      id: 'visitMediumTypeCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Medium"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.visitMediumTypeCode}</TextCell>
      ),
    },
    {
      id: 'primaryPatientInsurancePlan',
      header: ({ column }) => (
        <ColumnHeader
          label="Primary Ins."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {getInsurancePayerName(
            'Primary',
            row.original.claimInsurancePolicies ?? [],
          )}
        </TextCell>
      ),
    },
    {
      id: 'secondaryPatientInsurancePlan',
      header: ({ column }) => (
        <ColumnHeader
          label="Secondary Ins."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <LongTextCell>
          {getInsurancePayerName(
            'Secondary',
            row.original.claimInsurancePolicies ?? [],
          )}
        </LongTextCell>
      ),
    },
    {
      id: 'providerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Provider"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="w-[100px]">{row.original.providerName}</TextCell>
      ),
    },
    {
      id: 'cosignerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Cosigner"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.cosignerName}</TextCell>,
    },
    {
      id: 'diagnosisCodes',
      header: ({ column }) => (
        <ColumnHeader
          label="Diagnosis"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="w-[300px]">{row.original.diagnosisCodes}</TextCell>
      ),
    },
    {
      id: 'cptCodes',
      header: ({ column }) => (
        <ColumnHeader
          label="CPT"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <CellCPTCodes row={row} />,
    },
    {
      id: 'cmdId',
      header: ({ column }) => (
        <ColumnHeader
          label="CMD"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.cmdId}</TextCell>,
    },
    {
      id: 'visitStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.visitStatus}</TextCell>,
    },
    {
      id: 'verificationIdentificationStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="VIS"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.verificationIdentificationStatus}</TextCell>
      ),
    },
    {
      id: 'billingStatusCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Billing Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.billingStatusCode}</TextCell>,
    },
    {
      id: 'copay',
      header: ({ column }) => <ColumnHeader column={column} label="Co-Pay" />,
      columns: [
        {
          id: 'copayDue',
          size: 50,
          header: ({ column }) => (
            <ColumnHeader
              label="Due"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => <TextCell>${row.original.copayDue ?? 0}</TextCell>,
        },
        {
          id: 'copayPaid',
          header: ({ column }) => (
            <ColumnHeader
              label="Paid"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>${row.original.copayPaid ?? 0}</TextCell>
          ),
        },
      ],
    },
    {
      id: 'coins',
      header: ({ column }) => <ColumnHeader column={column} label="Co-Ins" />,
      columns: [
        {
          id: 'coinsDue',
          header: ({ column }) => (
            <ColumnHeader
              label="Due"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => <TextCell>${row.original.coinsDue ?? 0}</TextCell>,
        },
        {
          id: 'coinsPaid',
          header: ({ column }) => (
            <ColumnHeader
              label="Paid"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>${row.original.coinsPaid ?? 0}</TextCell>
          ),
        },
      ],
    },
    {
      id: 'balance',
      header: ({ column }) => <ColumnHeader column={column} label="Balance" />,
      columns: [
        {
          id: 'balanceDue',
          header: ({ column }) => (
            <ColumnHeader
              label="Due"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>${row.original.balanceDue ?? 0}</TextCell>
          ),
        },
        {
          id: 'balancePaid',
          header: ({ column }) => (
            <ColumnHeader
              label="Paid"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => (
            <TextCell>${row.original.balancePaid ?? 0}</TextCell>
          ),
        },
      ],
    },
    {
      id: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatAmount(row.original.totalAmount)}</TextCell>
      ),
    },
    {
      id: 'amountDue',
      header: ({ column }) => (
        <ColumnHeader
          label="Due Balance"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatAmount(row.original.amountDue)}</TextCell>
      ),
    },
    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Created On"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell>
          {formatDate(`${row.original.metadata?.createdOn}`, 'MM/dd/yyyy')}
        </DateTimeCell>
      ),
    },
    {
      id: 'submittedDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Submitted On"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          row.original.submittedDate && (
            <DateTimeCell>
              {formatDate(`${row.original.submittedDate}`, 'MM/dd/yyyy')}
            </DateTimeCell>
          )
        )
      },
    },
    {
      id: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Note Signed Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <NoteSignedStatusCell row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }

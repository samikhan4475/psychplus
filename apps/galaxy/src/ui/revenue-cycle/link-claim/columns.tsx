import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Claim, PatientAppointments, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { CellCPTCodes } from './cpt-code-cell'
import { DiagnosisCodesCell } from './diagnosis-codes-cell'
import { NoteSignedStatusCell } from './note-status-cell'
import { VisitNumberCell } from './visit-number-cell'

const columns = (
  handleCloseModal: () => void,
  sort?: Sort,
  onSort?: (column: string) => void,
  claimData?: Claim,
): ColumnDef<PatientAppointments>[] => {
  return [
    {
      id: 'appointmentId',
      header: ({ column }) => (
        <ColumnHeader
          label="Visit Number"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <VisitNumberCell
          row={row}
          claimData={claimData}
          handleCloseModal={handleCloseModal}
        />
      ),
    },
    {
      id: 'locationName',
      header: () => <ColumnHeader label="Location" />,
      cell: ({ row }) => (
        <TextCell className="w-[200px]">{row.original.locationName}</TextCell>
      ),
    },
    {
      id: 'service',
      header: () => <ColumnHeader label="Service Type" />,
      cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
    },
    {
      id: 'visitType',
      header: () => <ColumnHeader label="Visit Type" />,
      cell: ({ row }) => (
        <TextCell className="w-[200px]">{row.original.visitType}</TextCell>
      ),
    },
    {
      id: 'visitSequence',
      header: () => <ColumnHeader label="Visit Sequence" />,
      cell: ({ row }) => <TextCell>{row.original.visitSequence}</TextCell>,
    },
    {
      id: 'providerId',
      header: () => <ColumnHeader label="Provider" />,
      cell: ({ row }) => (
        <TextCell className="w-[200px]">{row.original.providerName}</TextCell>
      ),
    },
    {
      id: 'cosigner',
      header: () => <ColumnHeader label="Cosigner" />,
      cell: () => <TextCell>{''}</TextCell>,
    },

    {
      id: 'diagnosisCodes',
      header: () => <ColumnHeader label="Diagnosis" />,
      cell: ({ row }) => <DiagnosisCodesCell row={row} />,
    },
    {
      id: 'cptCodes',
      header: () => <ColumnHeader label="CPT" />,
      cell: ({ row }) => <CellCPTCodes row={row} />,
    },

    {
      id: 'status',
      header: () => <ColumnHeader label="Visit Status" />,
      cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
    },

    {
      id: 'submittedDate',
      header: () => <ColumnHeader label="Submitted On" />,
      cell: () => <TextCell>{''}</TextCell>,
    },
    {
      id: 'recordStatus',
      header: () => <ColumnHeader label="Note Signed Status" />,
      cell: ({ row }) => <NoteSignedStatusCell row={row} />,
    },
  ]
}

export { columns }

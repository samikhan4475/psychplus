import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { State } from '@/types'
import { Staff } from '@/ui/staff-management/types'
import {
  getLicensesAction,
  getPrescriberSettings,
  getStaffAction,
} from '../actions'
import { LicenseType, PrescriberDataResponse } from '../types'
import { StatusSelectCell } from './cells'
import { ActionsCell } from './cells/actions-cell'
import { transformIn } from './data'

const columns = (
  getPrescriberData: () => Promise<void>,
  userId = '',
): ColumnDef<PrescriberDataResponse>[] => [
  {
    accessorKey: 'stateName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="States" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.stateName}</TextCell>
    ),
  },
  {
    accessorKey: 'Prescriber',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Prescriber" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Prescriber"
      />
    ),
  },
  {
    accessorKey: 'New',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="New" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="New"
      />
    ),
  },
  {
    accessorKey: 'Refill',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Refill" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Refill"
      />
    ),
  },
  {
    accessorKey: 'Change',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Change" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Change"
      />
    ),
  },
  {
    accessorKey: 'Cancel',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Cancel" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Cancel"
      />
    ),
  },
  {
    accessorKey: 'PharmacyRXRequest',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="PharmacyRXRequest" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="PharmacyRXRequest"
      />
    ),
  },
  {
    accessorKey: 'PharmacyRXResponseDenied',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="PharmacyRXResponseDenied"
      />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="PharmacyRXResponseDenied"
      />
    ),
  },
  {
    accessorKey: 'Controls',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Controls" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="Controls"
        disabled
      />
    ),
  },
  {
    accessorKey: 'C2',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="C2" />
    ),
    cell: ({ row }) => (
      <StatusSelectCell
        getPrescriberData={getPrescriberData}
        userId={userId}
        row={row}
        value="C2"
        disabled
      />
    ),
  },
  {
    id: 'actions',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ActionsCell,
  },
]
interface PrescriberTableProps {
  states: State[]
}
const PrescriberTable = ({ states }: PrescriberTableProps) => {
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const [loading, setLoading] = useState(true)
  const [prescriberData, setPrescriberData] = useState<
    PrescriberDataResponse[]
  >([])
  const [staff, setStaff] = useState<Staff>()
  const { id } = useParams() as { id: string }

  const getPrescriberData = async () => {
    setLoading(true)

    let staffData = staff
    if (!staffData) {
      const staffRes = await getStaffAction(id)
      if (staffRes.state === 'error') {
        toast.error(staffRes.error)
        return
      }
      staffData = staffRes.data
      setStaff(staffData)
    }

    const result = await getPrescriberSettings({ userId: +staffData.userId })
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    const licenseRes = await getLicensesAction({
      licenseTypes: [LicenseType.DEA, LicenseType.CDS],
      providerStaffIds: [+id],
      recordStatuses: ['Active'],
    })
    if (licenseRes.state === 'error') {
      toast.error(licenseRes.error)
      return
    }

    setPrescriberData(
      transformIn(result.data, states, stateCodes, licenseRes.data, staffData),
    )
    setLoading(false)
  }

  useEffect(() => {
    getPrescriberData()
  }, [])

  if (loading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  return (
    <DataTable
      columns={columns(getPrescriberData, staff?.userId)}
      data={prescriberData}
      theadClass="z-10"
      tdClass="!p-0 first:bg-white"
      isRowSpan
      sticky
      disablePagination
      tableRowClass="border-b border-red-200"
    />
  )
}

export { PrescriberTable }

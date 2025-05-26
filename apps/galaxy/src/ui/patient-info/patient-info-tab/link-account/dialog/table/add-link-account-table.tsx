import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Patient } from '@/ui/patient-lookup/types'
import { formatDateTime, getMaskedPhoneNumber } from '@/utils'
import { useStore } from '../../store'
import { ActionCell } from './action-cell'
import { CreditCardCell } from './credit-card-cell'
import { StatusCell } from './status-cell'
import { StatusIcon } from './status-icon-cell'

interface AddLinkAccountTableProps {
  patientId: string
}

const columns = (patientId: string): ColumnDef<Patient>[] => {
  return [
    {
      id: 'name',
      header: () => <ColumnHeader label="Name" />,
      cell: ({ row }) => <TextCell>{row.original?.name}</TextCell>,
      size: 50,
    },
    {
      id: 'age',
      header: () => <ColumnHeader label="Age" />,
      cell: ({ row }) => <TextCell>{row.original?.age}</TextCell>,
      size: 100,
    },
    {
      id: 'patient-gender',
      header: () => <ColumnHeader label="Gender" />,
      cell: ({ row }) => <TextCell>{row.original?.gender}</TextCell>,
    },

    {
      id: 'patient-status',
      header: () => <ColumnHeader label="User Status" />,
      cell: ({ row }) => <StatusCell row={row} />,
    },
    {
      id: 'p-&-c',
      header: () => <ColumnHeader label="P&C" />,
      cell: ({ row }) => <StatusIcon status={row?.original?.patientConsent} />,
    },
    {
      id: 'cc',
      header: () => <ColumnHeader label="CC" />,
      cell: CreditCardCell,
    },
    {
      id: 'mrn',
      header: () => <ColumnHeader label="MRN" />,
      cell: ({ row }) => <TextCell>{row.original?.mrn}</TextCell>,
    },
    {
      id: 'dob',
      header: () => <ColumnHeader label="DOB" />,
      cell: ({ row }) => <TextCell>{row.original?.dob}</TextCell>,
    },
    {
      id: 'phone',
      header: () => <ColumnHeader label="Phone" />,
      cell: ({ row }) => (
        <TextCell className="truncate">
          {getMaskedPhoneNumber(row?.original?.phoneNumber ?? '')}
        </TextCell>
      ),
    },
    {
      id: 'email',
      header: () => <ColumnHeader label="Email" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.contactDetails?.email}</TextCell>
      ),
    },
    {
      id: 'city',
      header: () => <ColumnHeader label="City" />,
      cell: ({ row }) => <TextCell>{row.original?.city}</TextCell>,
    },
    {
      id: 'zip',
      header: () => <ColumnHeader label="Zip" />,
      cell: ({ row }) => <TextCell>{row.original?.zip}</TextCell>,
    },
    {
      id: 'areaCode',
      header: () => <ColumnHeader label="Area Code" />,
      cell: ({ row }) => <TextCell>{row.original?.zipLast4 ?? ''}</TextCell>,
    },
    {
      id: 'insurance',
      header: () => <ColumnHeader label="Insurance (primary)" />,
      cell: ({ row }) => <TextCell>{row.original?.insurance}</TextCell>,
    },
    {
      id: 'created-by',
      header: () => <ColumnHeader label="User Created" />,
      cell: ({ row }) => <TextCell>{row.original?.userCreated}</TextCell>,
    },
    {
      id: 'last-sign-in',
      header: () => <ColumnHeader label="Last Sign-In" />,
      cell: ({ row }) => (
        <TextCell>
          {row.original?.patientLastLoginDateTime
            ? formatDateTime(row.original?.patientLastLoginDateTime, false)
            : 'NA'}
        </TextCell>
      ),
    },
    {
      id: 'next-visit',
      header: () => <ColumnHeader label="Next Visit" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.upcomingAppointmentDate}</TextCell>
      ),
    },
    {
      id: 'link-account-actions',
      header: () => <ColumnHeader label="Action" />,
      cell: ({ row }) => <ActionCell row={row} patientId={patientId} />,
    },
  ]
}

const AddLinkAccountTable = ({ patientId }: AddLinkAccountTableProps) => {
  const { data, loading, search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    search: state.search,
  }))

  useEffect(() => {
    search({})
  }, [])
  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable
        data={data?.patients ?? []}
        columns={columns(patientId)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { AddLinkAccountTable }

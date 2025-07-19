'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { PatientReferral } from '@/types'
import { formatDateTime } from '@/utils'
import { getPatientReferralsHistoryAction } from '../referrals/patient-referrals-widget/actions'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'metadata?.updatedByFullName',
    header: () => <ColumnHeader label="Name" />,
    cell: ({ row: { original } }) => {
      return (
        <LongTextCell className="min-w-20">
          {original?.metadata?.createdByFullName}
        </LongTextCell>
      )
    },
  },
  {
    id: 'contactStatus',
    header: () => <ColumnHeader label="Contact Initiated Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">{original.contactStatus}</TextCell>
    ),
  },
  {
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Created On" />
    ),
    cell: ({ row: { original: referral } }) => (
      <TextCell className="truncate">
        {referral?.metadata?.createdOn
          ? formatDateTime(referral?.metadata?.createdOn)
          : 'N/A'}
      </TextCell>
    ),
  },
]

interface ReferralsHistoryTableProps {
  referralId: string
}

const IntReferralsHistoryContactStatusCellTable = ({
  referralId,
}: ReferralsHistoryTableProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PatientReferral[]>([])

  useEffect(() => {
    setLoading(true)
    getPatientReferralsHistoryAction({ referralId }).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        let prev: string | undefined
        const compiedData = response?.data?.filter((item) => {
          if (item?.contactStatus !== prev) {
            prev = item?.contactStatus
            return true
          }
          return false
        })
        setData(compiedData ?? [])
      }

      setLoading(false)
    })
  }, [referralId])

  if (loading) {
    return <LoadingPlaceholder className="h-20" />
  }

  return (
    <ScrollArea className="max-h-44 p-2">
      <DataTable
        columns={columns}
        data={data}
        sticky
        theadClass="z-[1]"
        disablePagination
      />
    </ScrollArea>
  )
}

export { IntReferralsHistoryContactStatusCellTable }

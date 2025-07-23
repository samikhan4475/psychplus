'use client'

import { useEffect, useState } from 'react'
import { Button, Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { PreferredPartnerUser } from '@/types'
import { CreditCardCell } from '@/ui/patient-info/patient-info-tab/link-account/dialog/table/credit-card-cell'
import { StatusCell } from '@/ui/patient-info/patient-info-tab/link-account/dialog/table/status-cell'
import { StatusIcon } from '@/ui/patient-info/patient-info-tab/link-account/dialog/table/status-icon-cell'
import { Patient } from '@/ui/patient-lookup/types'
import { formatDateTime, getMaskedPhoneNumber } from '@/utils'
import { usePreferredPartnerStore } from '../store'
import { useLinkAccountStore } from './link-account-dialog/store'

interface PreferredPartnerLinkTableProps {
  preferredPartnerUser: PreferredPartnerUser
  onCloseModal?: () => void
  context?: 'active' | 'worklist'
}

const InlineActionCell = ({
  row,
  preferredPartnerUser,
  onCloseModal,
  context = 'active',
}: {
  row: { original: Patient }
  preferredPartnerUser: PreferredPartnerUser
  onCloseModal?: () => void
  context?: 'active' | 'worklist'
}) => {
  const [loading, setLoading] = useState(false)
  const { linkUser } = usePreferredPartnerStore((state) => ({
    linkUser: state.linkUser,
  }))

  const handleLinkPatient = async () => {
    setLoading(true)
    try {
      await linkUser(
        preferredPartnerUser.partnerId,
        preferredPartnerUser.id,
        row.original.id.toString(),
        context,
      )

      toast.success('Preferred partner user linked successfully')
      onCloseModal?.()
    } catch {
      toast.error('Failed to link preferred partner user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      size="1"
      highContrast
      onClick={handleLinkPatient}
      disabled={loading}
      className="font-semibold min-w-[100px]"
    >
      {loading ? 'Linking...' : 'Link User'}
    </Button>
  )
}

const columns = (
  preferredPartnerUser: PreferredPartnerUser,
  onCloseModal?: () => void,
  context?: 'active' | 'worklist',
): ColumnDef<Patient>[] => {
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
      id: 'postalPlus4Code',
      header: () => <ColumnHeader label="Postal+4" />,
      cell: ({ row }) => (
        <TextCell>{row.original?.postalPlus4Code ?? ''}</TextCell>
      ),
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
      cell: ({ row }) => (
        <InlineActionCell
          row={row}
          preferredPartnerUser={preferredPartnerUser}
          onCloseModal={onCloseModal}
          context={context}
        />
      ),
      size: 150,
      minSize: 120,
    },
  ]
}

const PreferredPartnerLinkTable = ({
  preferredPartnerUser,
  onCloseModal,
  context = 'active',
}: PreferredPartnerLinkTableProps) => {
  const { data, loading, search } = useLinkAccountStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  useEffect(() => {
    search({})
  }, [search])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" p="8">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea scrollbars="vertical" className="max-h-96 p-2">
      <DataTable
        data={data?.patients ?? []}
        columns={columns(preferredPartnerUser, onCloseModal, context)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PreferredPartnerLinkTable }

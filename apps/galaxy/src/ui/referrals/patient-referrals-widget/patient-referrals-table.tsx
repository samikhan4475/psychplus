'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useStore as zustandUseStore } from 'zustand'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  LongTextCell,
  SelectCell,
  TextCell,
} from '@/components'
import { ActionsCell, ReferralStatusCell } from './cells'
import { useStore } from './store'
import type { PatientReferral } from './types'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'referral-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => {
      return <DateTimeCell>{row.original.dateTime}</DateTimeCell>
    },
  },
  {
    id: 'referral-service',
    header: () => <ColumnHeader label="Service" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.serviceName}</TextCell>
    },
  },
  {
    id: 'referral-service-status',
    header: () => <ColumnHeader label="Service Status" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.serviceStatus}</TextCell>
    },
  },
  {
    id: 'referral-initiated-by',
    header: () => <ColumnHeader label="Initiated By" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.initiatedBy}</TextCell>
    },
  },
  {
    id: 'referral-referring-provider',
    header: () => <ColumnHeader label="Referring Provider" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.referringProvider}</TextCell>
    },
  },
  {
    id: 'referral-contact-status',
    header: () => <ColumnHeader label="Contact" />,
    cell: ({ row }) => {
      return (
        <SelectCell
          value={row.original.contactStatus}
          options={[
            { label: 'Pending', value: 'Pending' },
            { label: '1st Attempt', value: '1st Attempt' },
            { label: 'Refused', value: 'Refused' },
            { label: 'Auth in Process', value: 'Auth in Process' },
            { label: 'Scheduled', value: 'Scheduled', disabled: true },
            { label: 'Cancelled', value: 'Cancelled', disabled: true },
            { label: 'Admitted', value: 'Admitted' },
            { label: 'Error', value: 'Error' },
            { label: '2nd Attempt', value: '2nd Attempt' },
            { label: '3rd Attempt', value: '3rd Attempt' },
            { label: 'Not Contacted', value: 'Not Contacted' },
          ]}
        />
      )
    },
  },
  {
    id: 'referral-visit-date',
    header: () => <ColumnHeader label="Visit Date" />,
    cell: ({ row }) => {
      return (
        <TextCell empty={row.original.visitDate === undefined}>
          {row.original.visitDate ?? 'N/A'}
        </TextCell>
      )
    },
  },
  {
    id: 'referral-status',
    header: () => <ColumnHeader label="Referral Status" />,
    cell: ReferralStatusCell,
  },
  {
    id: 'referral-comments',
    header: () => <ColumnHeader label="Comments" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.comments}</LongTextCell>
    },
  },
  {
    id: 'referral-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => {
      return <ActionsCell row={row} />
    },
  },
]

const PatientReferralsTable = () => {
  const store = useStore()

  const { data, fetch, loading } = zustandUseStore(store, (state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.referrals ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientReferralsTable }

'use client'

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
import { useLinkAccountStore } from '../store'

const columns = (): ColumnDef<Patient>[] => {
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
  ]
}

const AddLinkAccountTable = () => {
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
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
      <DataTable
        data={data?.patients ?? []}
        columns={columns()}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { AddLinkAccountTable }

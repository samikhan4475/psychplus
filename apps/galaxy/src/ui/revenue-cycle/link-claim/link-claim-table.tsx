'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Claim } from '@/types'
import { columns } from './columns'
import { useStore } from './store'

interface LinkClaimTableProps {
  claimData: Claim
  handleCloseModal: () => void
}
const LinkClaimTable = ({
  claimData,
  handleCloseModal,
}: LinkClaimTableProps) => {
  const { patientId } = claimData

  const { loading, fetchAppointments, data, sort, sortData } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      fetchAppointments: state.fetchAppointments,
      sort: state.sort,
      sortData: state.sortData,
    }),
  )
  useEffect(() => {
    fetchAppointments({
      appointmentStatuses: ['CheckedOut'],
      patientIds: [patientId],
    })
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea className="max-h-52 p-2">
      <DataTable
        data={data ?? []}
        columns={columns(handleCloseModal, sort, sortData, claimData)}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { LinkClaimTable }

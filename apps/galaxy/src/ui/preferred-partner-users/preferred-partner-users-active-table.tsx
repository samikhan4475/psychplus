'use client'

import React, { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { columns } from './preferred-partner-users-columns'
import { usePreferredPartnerStore } from './store'
import { getCodesetOptions, getInitialValues } from './utils'

const PREFERRED_PARTNER_PAGE_SIZE = 25

interface PreferredPartnerUsersActiveTableProps {
  ppid: string
}

const PreferredPartnerUsersActiveTable = ({
  ppid,
}: PreferredPartnerUsersActiveTableProps) => {
  const { 
    activeUsersData, 
    activeUsersLoading, 
    activeUsersPage,
    activeUsersTotal,
    searchActiveUsers, 
    editMode, 
    setEditMode,
    formValues 
  } = usePreferredPartnerStore((state) => ({
    activeUsersData: state.activeUsersData,
    activeUsersLoading: state.activeUsersLoading,
    activeUsersPage: state.activeUsersPage,
    activeUsersTotal: state.activeUsersTotal,
    searchActiveUsers: state.searchActiveUsers,
    editMode: state.editMode,
    setEditMode: state.setEditMode,
    formValues: state.formValues,
  }))

  useEffect(() => {
    searchActiveUsers(ppid, getInitialValues(), 1, true)
  }, [])

  const userTypeOptionsCodeset = useCodesetOptions(
    CODESETS.PreferredPartnerUserType,
  )
  const userStatusOptionsCodesets = useCodesetOptions(
    CODESETS.PreferredPartnerUserStatus,
  )
  const userTypeOptions = getCodesetOptions(userTypeOptionsCodeset)
  const userStatusOptions = getCodesetOptions(userStatusOptionsCodesets)

  if (activeUsersLoading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  const isRowDisabled = (row: Row<(typeof activeUsersData)[0]>) => {
    return row.original.recordStatus === 'Deleted'
  }

  const handleNextPage = () => {
    searchActiveUsers(ppid, formValues, activeUsersPage + 1)
  }

  const handlePrevPage = () => {
    if (activeUsersPage > 1) {
      searchActiveUsers(ppid, formValues, activeUsersPage - 1)
    }
  }

  const handleJumpToPage = (page: number) => {
    searchActiveUsers(ppid, formValues, page)
  }

  return (
    <Flex className="bg-white w-full" direction="column">
      <Box 
        className="w-full overflow-hidden hover:overflow-hidden [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <DataTable
          data={activeUsersData}
          columns={columns(
            editMode,
            setEditMode,
            userTypeOptions,
            userStatusOptions,
          )}
          tableClass="min-w-full [&::-webkit-scrollbar]:hidden [&_*::-webkit-scrollbar]:hidden overflow-hidden hover:overflow-hidden"
          tableRowClass="relative"
          theadClass="z-[1]"
          disablePagination
          isRowSpan
          sticky
          isRowDisabled={isRowDisabled}
        />
      </Box>
      <DataTablePagination
        className="border-t border-gray-6"
        total={activeUsersTotal}
        pageSize={PREFERRED_PARTNER_PAGE_SIZE}
        loading={activeUsersLoading ?? false}
        page={activeUsersPage}
        next={handleNextPage}
        prev={handlePrevPage}
        jumpToPage={handleJumpToPage}
      />
    </Flex>
  )
}

export { PreferredPartnerUsersActiveTable }

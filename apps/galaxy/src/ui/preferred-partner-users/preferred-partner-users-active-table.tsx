'use client'

import React, { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { columns } from './preferred-partner-users-columns'
import { usePreferredPartnerStore } from './store'
import { getInitialValues } from './utils'

const PREFERRED_PARTNER_PAGE_SIZE = 25

interface PreferredPartnerUsersActiveTableProps {
  ppid: string
  googleApiKey: string
}

const PreferredPartnerUsersActiveTable = ({
  ppid,
  googleApiKey,
}: PreferredPartnerUsersActiveTableProps) => {
  const { 
    activeUsersData, 
    activeUsersLoading, 
    activeUsersPage,
    activeUsersTotal,
    searchActiveUsers, 
    formValues 
  } = usePreferredPartnerStore((state) => ({
    activeUsersData: state.activeUsersData,
    activeUsersLoading: state.activeUsersLoading,
    activeUsersPage: state.activeUsersPage,
    activeUsersTotal: state.activeUsersTotal,
    searchActiveUsers: state.searchActiveUsers,
    formValues: state.formValues,
  }))

  useEffect(() => {
    searchActiveUsers(ppid, getInitialValues(), 1, true)
  }, [])

  const userTypeOptions = useCodesetOptions(
    CODESETS.PreferredPartnerUserType,
  )
  const userStatusOptions = useCodesetOptions(
    CODESETS.PreferredPartnerUserStatus,
  )

  if (activeUsersLoading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  const isRowDisabled = (row: Row<(typeof activeUsersData)[0]>) => {
    return row.original.recordStatus === 'Deleted'
  }

  const isRowHighlightedRed = (row: Row<(typeof activeUsersData)[0]>) => {
    return row.original.matchStatus === 'Reconcile'
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
      <ScrollArea
        className="bg-white max-w-[calc(100vw-188px)]"
        scrollbars="both"
      >
        <DataTable
          data={activeUsersData}
          columns={columns(
            userTypeOptions,
            userStatusOptions,
            googleApiKey,
          )}
          tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
          tableRowClass="relative"
          theadClass="z-[1]"
          disablePagination
          isRowSpan
          sticky
          isRowDisabled={isRowDisabled}
          isRowHighlightedRed={isRowHighlightedRed}
        />
      </ScrollArea>
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

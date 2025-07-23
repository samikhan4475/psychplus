'use client'

import React, { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { worklistColumns } from './preferred-partner-users-worklist-columns'
import { usePreferredPartnerStore } from './store'
import { getWorklistInitialValues } from './utils'

interface PreferredPartnerUsersWorklistTableProps {
  ppid: string
  googleApiKey: string
}

const PreferredPartnerUsersWorklistTable = ({
  ppid,
  googleApiKey,
}: PreferredPartnerUsersWorklistTableProps) => {
  const {
    worklistData,
    worklistLoading,
    searchWorklist,
    worklistPage,
    worklistFormValues,
    worklistTotal,
  } = usePreferredPartnerStore((state) => ({
    worklistData: state.worklistData,
    worklistLoading: state.worklistLoading,
    searchWorklist: state.searchWorklist,
    worklistPage: state.worklistPage,
    worklistFormValues: state.worklistFormValues,
    worklistTotal: state.worklistTotal,
  }))

  useEffect(() => {
    searchWorklist(ppid, getWorklistInitialValues(), 1, true)
  }, [])

  const userTypeOptions = useCodesetOptions(
    CODESETS.PreferredPartnerUserType,
  )
  const userStatusOptions = useCodesetOptions(
    CODESETS.PreferredPartnerUserStatus,
  )
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)

  if (worklistLoading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  const isRowDisabled = (row: Row<(typeof worklistData)[0]>) => {
    return row.original.recordStatus === 'Deleted'
  }

  const isRowHighlightedRed = (row: Row<(typeof worklistData)[0]>) => {
    return row.original.matchStatus === 'Reconcile'
  }

  const handleNextPage = () => {
    searchWorklist(ppid, worklistFormValues, worklistPage + 1)
  }

  const handlePrevPage = () => {
    if (worklistPage > 1) {
      searchWorklist(ppid, worklistFormValues, worklistPage - 1)
    }
  }

  const handleJumpToPage = (newPage: number) => {
    searchWorklist(ppid, worklistFormValues, newPage)
  }

  return (
    <Flex className="bg-white w-full" direction="column">
      <ScrollArea
        className="bg-white max-w-[calc(100vw-188px)]"
        scrollbars="both"
      >
        <DataTable
          data={worklistData}
          columns={worklistColumns(
            userTypeOptions,
            userStatusOptions,
            statusOptions,
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
        total={worklistTotal}
        pageSize={25}
        loading={worklistLoading ?? false}
        page={worklistPage}
        next={handleNextPage}
        prev={handlePrevPage}
        jumpToPage={handleJumpToPage}
      />
    </Flex>
  )
}

export { PreferredPartnerUsersWorklistTable }

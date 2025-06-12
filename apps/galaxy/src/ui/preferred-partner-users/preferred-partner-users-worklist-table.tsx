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

interface PreferredPartnerUsersWorklistTableProps {
  ppid: string
}

const PreferredPartnerUsersWorklistTable = ({
  ppid,
}: PreferredPartnerUsersWorklistTableProps) => {
  const { 
    worklistData, 
    worklistLoading, 
    searchWorklist, 
    editMode, 
    setEditMode, 
    worklistPage,
    worklistFormValues,
    worklistTotal 
  } = usePreferredPartnerStore((state) => ({
    worklistData: state.worklistData,
    worklistLoading: state.worklistLoading,
    searchWorklist: state.searchWorklist,
    editMode: state.editMode,
    setEditMode: state.setEditMode,
    worklistPage: state.worklistPage,
    worklistFormValues: state.worklistFormValues,
    worklistTotal: state.worklistTotal,
  }))

  useEffect(() => {
    searchWorklist(ppid, getInitialValues(), 1, true)
  }, [])

  const userTypeOptionsCodeset = useCodesetOptions(
    CODESETS.PreferredPartnerUserType,
  )
  const userStatusOptionsCodesets = useCodesetOptions(
    CODESETS.PreferredPartnerUserStatus,
  )
  const userTypeOptions = getCodesetOptions(userTypeOptionsCodeset)
  const userStatusOptions = getCodesetOptions(userStatusOptionsCodesets)

  if (worklistLoading) {
    return <LoadingPlaceholder className="bg-white min-h-40 h-full" />
  }

  const isRowDisabled = (row: Row<(typeof worklistData)[0]>) => {
    return row.original.recordStatus === 'Deleted'
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
      <Box 
        className="w-full overflow-hidden hover:overflow-hidden [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <DataTable
          data={worklistData}
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

'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '../store'
import { RevenueCycleTab } from '../types'
import { columns } from './columns'
import { useStore } from './store'

const ClaimListTable = () => {
  const { activeTab } = useRootStore((state) => state)
  const {
    claimsListData,
    claimsListSearch,
    claimsListLoading,
    sort,
    sortData,
  } = useStore((state) => ({
    claimsListData: state.claimsListData,
    claimsListLoading: state.claimsListLoading,
    claimsListSearch: state.claimsListSearch,
    sort: state.sort,
    sortData: state.sortData,
  }))


  useEffect(() => {
    if (activeTab === RevenueCycleTab.Claim) {      
      claimsListSearch({})
    }
  }, [activeTab])

  if (claimsListLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={claimsListData?.claims ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { ClaimListTable }

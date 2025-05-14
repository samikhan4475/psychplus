'use client'

import React from 'react'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { WaitlistResponse } from '@/types'
import FilterForm from './filter-form'
import { useStore } from './store'
import { getWaitlistColumns as column } from './table-columns'

const WaitlistTable = ({
  isQuickNote,
  waitlists,
}: {
  isQuickNote: boolean
  waitlists: WaitlistResponse[]
}) => {
  const { loading } = useStore()

  return (
    <Flex direction="column" className="gap-1">
      <FilterForm isQuickNote={isQuickNote} />
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-40 h-full" />
      ) : (
        <ScrollArea className={ScrollAreaClassName} scrollbars="horizontal">
          <Box className="min-w-max">
            <DataTable
              columns={column(isQuickNote)}
              data={waitlists}
              isRowSpan
              tableRowClass="relative"
            />
          </Box>
        </ScrollArea>
      )}
    </Flex>
  )
}

const ScrollAreaClassName =
  'bg-white max-w-[calc(100vw_-_190px)] overflow-x-auto p-2'

export default WaitlistTable

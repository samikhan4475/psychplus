'use client'

import { Box, Flex } from '@radix-ui/themes'
import { PageHeader } from './components/header'
import { Filters } from './components/filters'

const QuickNotesWidgetClient = () => {
  return (
    <Box className="bg-[#EBF3FC] p-2">
      <PageHeader title="Quick Notess" />
      <Filters />
    </Box>
  )
}

export { QuickNotesWidgetClient }

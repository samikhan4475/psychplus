'use client'

import { Box, Flex } from '@radix-ui/themes'
import { ContentBlock } from './components/content-block'
import { Filters } from './components/filters'
import { PageHeader } from './components/header'

const QuickNotesWidgetClient = () => {
  return (
    <Box className="bg-[#EBF3FC] p-2">
      <PageHeader title="Quick Notess" />
      <Filters />
      <ContentBlock />
    </Box>
  )
}

export { QuickNotesWidgetClient }

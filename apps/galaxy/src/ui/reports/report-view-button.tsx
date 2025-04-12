'use client'

import { Button, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useStore } from './store'
import { VIEW_TYPE } from './types'

const ReportViewButton = () => {
  const { viewType, setViewType, resetScheduledReportPageCache } = useStore()

  return (
    <Button
      type="button"
      variant="outline"
      color="gray"
      size="2"
      onClick={() => {
        setViewType(VIEW_TYPE.REPORT)
        resetScheduledReportPageCache()
      }}
      className={cn(
        'tw-fit text-black flex h-[24px] items-center justify-center px-2 py-1',
        { 'bg-pp-link-text text-white': viewType === VIEW_TYPE.REPORT },
      )}
    >
      <Text className="text-[12px] font-regular ">Reports View</Text>
    </Button>
  )
}

export { ReportViewButton }

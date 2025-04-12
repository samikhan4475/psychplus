'use client'

import { Button, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useStore } from './store'
import { VIEW_TYPE } from './types'

const ScheduleViewButton = () => {
  const { viewType, setViewType } = useStore()

  return (
    <Button
      type="button"
      variant="outline"
      color="gray"
      size="2"
      onClick={() => setViewType(VIEW_TYPE.SCHEDULE)}
      className={cn(
        'tw-fit text-black flex h-[24px] items-center justify-center px-2 py-1',
        { 'bg-pp-link-text text-white': viewType === VIEW_TYPE.SCHEDULE },
      )}
    >
      <Text className="text-[12px] font-regular ">Schedules View</Text>
    </Button>
  )
}

export { ScheduleViewButton }

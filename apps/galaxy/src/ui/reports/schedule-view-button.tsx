'use client'

import { cn } from '@/utils'
import { Button, Text } from '@radix-ui/themes'

interface ScheduleViewButtonProps {
  isActive?: boolean
}
const ScheduleViewButton = ({ isActive }: ScheduleViewButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      color="gray"
      size="2"
      className={cn(
        'tw-fit h-[24px] py-1 px-2 flex items-center justify-center text-black',
        { 'bg-pp-link-text text-white': isActive },
      )}
    >
      <Text className="text-[12px] font-regular ">Schedules View</Text>
    </Button>
  )
}

export { ScheduleViewButton }

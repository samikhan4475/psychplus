'use client'

import { cn } from '@/utils'
import { Button, Text } from '@radix-ui/themes'

interface ReportViewButtonProps {
  isActive?: boolean
}
const ReportViewButton = ({ isActive }: ReportViewButtonProps) => {
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
      <Text className="text-[12px] font-regular ">Reports View</Text>
    </Button>
  )
}

export { ReportViewButton }

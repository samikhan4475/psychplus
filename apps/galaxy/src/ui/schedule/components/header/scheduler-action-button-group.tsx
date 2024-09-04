import { Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { DownloadIcon, Plus } from 'lucide-react'
import { PrinterIcon } from '@/components/icons'

const SchedulerActionButtonGroup = () => {
  return (
    <Flex align="center" className="gap-x-2">
      <Button
        variant="outline"
        className="bg-pp-black-2 text-white h-6 rounded-[2px] px-1.5 [box-shadow:none]"
      >
        <Plus width={16} height={16} />
        <Text weight={'medium'} size={'2'}>Add Visit</Text>
      </Button>
      <IconButton
        variant="outline"
        className="h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        <PrinterIcon />
      </IconButton>
      <IconButton
        variant="outline"
        className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        <DownloadIcon width={16} height={16} />
      </IconButton>
    </Flex>
  )
}

export { SchedulerActionButtonGroup }

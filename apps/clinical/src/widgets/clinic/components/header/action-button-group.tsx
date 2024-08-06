import { Button, Flex, IconButton } from '@radix-ui/themes'
import { DownloadIcon, Plus } from 'lucide-react'
import { PrinterIcon } from '@/components/icons'

const ActionButtonGroup = () => {
  return (
    <Flex align="center" className="gap-x-2">
      <Button
        variant="outline"
        className="h-6 rounded-[2px] bg-[#101D46] px-1.5 font-[500] text-[#FFF] [box-shadow:none]"
      >
        <Plus width={16} height={16} />
        Add Visit
      </Button>
      <IconButton
        variant="outline"
        className="h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        <PrinterIcon />
      </IconButton>
      <IconButton
        variant="outline"
        className="h-6 rounded-[2px] text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
      >
        <DownloadIcon width={16} height={16} />
      </IconButton>
    </Flex>
  )
}

export { ActionButtonGroup }

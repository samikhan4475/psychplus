import { Button, Flex, IconButton } from '@radix-ui/themes'
import { DownloadIcon, Plus } from 'lucide-react'
import { PrinterIcon } from '@/components/icons'
import { AddVisit } from '@/ui/visit/add-visit'
import { useDropdownContext } from '../../context'

const SchedulerActionButtonGroup = () => {
  const { usStates } = useDropdownContext()
  return (
    <Flex align="center" className="gap-x-2">
      <AddVisit states={usStates}>
        <Button
          variant="outline"
          className="bg-pp-black-2 text-white h-6 rounded-[2px] px-1.5 font-[500] [box-shadow:none]"
        >
          <Plus width={16} height={16} />
          Add Visit
        </Button>
      </AddVisit>

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

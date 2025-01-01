import { useState } from 'react'
import { Button, Flex, IconButton } from '@radix-ui/themes'
import { DownloadIcon, Plus } from 'lucide-react'
import { PrinterIcon } from '@/components/icons'
import { useHasPermission } from '@/hooks'
import { AddVisit } from '@/ui/visit/add-visit'
import { CLICK_DOWNLOAD_OR_PRINT_BUTTON } from '../../constants'
import { PermissionAlert } from '../../shared'

const SchedulerActionButtonGroup = () => {
  const hasPermissionToDownloadOrPrint = useHasPermission('clickDownloadButton')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={CLICK_DOWNLOAD_OR_PRINT_BUTTON}
        onClose={() => setIsOpen(false)}
      />
      <Flex align="center" className="gap-x-2">
        <AddVisit>
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
          onClick={
            hasPermissionToDownloadOrPrint ? undefined : () => setIsOpen(true)
          }
          className="h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
        >
          <PrinterIcon />
        </IconButton>

        <IconButton
          variant="outline"
          onClick={
            hasPermissionToDownloadOrPrint ? undefined : () => setIsOpen(true)
          }
          className="text-black h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
        >
          <DownloadIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </>
  )
}

export { SchedulerActionButtonGroup }

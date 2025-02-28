import { useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Button, Flex, IconButton } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { PrinterIcon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FileTypes } from '@/types'
import { AddVisit } from '@/ui/visit/add-visit'
import { sanitizeFormData } from '@/utils'
import { downloadAppointmentsAction } from '../../client-actions'
import { CLICK_DOWNLOAD_OR_PRINT_BUTTON } from '../../constants'
import { useStore as useListViewStore } from '../../list-view/store'
import { PermissionAlert } from '../../shared'
import { getDateString } from '../../utils'
import { DownloadButton } from './download-button'

const SchedulerActionButtonGroup = () => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )
  const hasPermissionToDownloadOrPrint = useHasPermission('clickDownloadButton')
  const { formData } = useListViewStore((state) => ({
    formData: state.formData,
  }))
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleDownload = () => {
    if (hasPermissionToDownloadOrPrint) {
      const body = {
        ...formData,
        startingDate:
          formData?.startingDate ?? getDateString(today(getLocalTimeZone())),
      }
      const sanitizedBody = sanitizeFormData(body)
      downloadAppointmentsAction({
        type: FileTypes.Xlsx,
        params: sanitizedBody,
      })
    } else {
      setIsOpen(true)
    }
  }

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

        {isFeatureFlagEnabled && (
          <IconButton
            variant="outline"
            onClick={
              hasPermissionToDownloadOrPrint ? undefined : () => setIsOpen(true)
            }
            className="h-6 rounded-[2px] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
          >
            <PrinterIcon />
          </IconButton>
        )}
        <DownloadButton onClick={handleDownload} />
      </Flex>
    </>
  )
}

export { SchedulerActionButtonGroup }

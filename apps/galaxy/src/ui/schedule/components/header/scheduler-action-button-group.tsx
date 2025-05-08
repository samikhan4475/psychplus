import { useState } from 'react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Box, Button, Flex, IconButton, Tabs } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { ClockIcon, PrinterIcon } from '@/components/icons'
import { FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { FileTypes } from '@/types'
import { AddVisit } from '@/ui/visit/add-visit'
import { cn, sanitizeFormData } from '@/utils'
import { downloadAppointmentsAction } from '../../client-actions'
import { CLICK_DOWNLOAD_OR_PRINT_BUTTON, TIMEZONE_TYPES } from '../../constants'
import { useStore as useListViewStore } from '../../list-view/store'
import { PermissionAlert } from '../../shared'
import { useStore as useScheduleStore } from '../../store/store'
import { TabValue } from '../../types'
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
  const { timezoneType, activeTab, setTimezoneType } = useScheduleStore(
    (state) => ({
      timezoneType: state.timezoneType,
      setTimezoneType: state.setTimezoneType,
      activeTab: state.activeTab,
    }),
  )
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isTimedDependent =
    activeTab === TabValue.List ||
    activeTab === TabValue.Scheduler ||
    activeTab === TabValue.Calendar

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
        {isTimedDependent && (
          <Box>
            <Button
              variant="outline"
              size="1"
              color="gray"
              className={cn(
                'text-black rounded-[0] border-0',
                timezoneType === TIMEZONE_TYPES.LOCATION_PREFERRED &&
                  'bg-pp-focus-bg',
              )}
              onClick={() => setTimezoneType(TIMEZONE_TYPES.LOCATION_PREFERRED)}
            >
              <ClockIcon />
              Location
            </Button>
            <Button
              variant="outline"
              size="1"
              color="gray"
              className={cn(
                'text-black rounded-[0]  border-0',
                timezoneType === TIMEZONE_TYPES.PROVIDER_PREFERRED &&
                  'bg-pp-focus-bg',
              )}
              onClick={() => setTimezoneType(TIMEZONE_TYPES.PROVIDER_PREFERRED)}
            >
              <ClockIcon />
              Preferred
            </Button>
          </Box>
        )}
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

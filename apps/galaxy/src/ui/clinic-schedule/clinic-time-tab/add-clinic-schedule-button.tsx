import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { useStore } from '@/store'
import { PermissionAlert } from '@/ui/schedule/shared'
import { isPrescriber } from '@/utils'
import { AddClinicScheduleDialog } from '../dialogs/clinic-schedule-dialog'
import { ClinicAlertMessages } from './constants'
import { PropsWithStaffId } from './types'

const AddClinicScheduleButton = ({ staffId }: PropsWithStaffId) => {
  const loggedInStaff = useStore((state) => state.staffResource)
  const hasPermission = useHasPermission('clickAddClinicTimeTab')
  const [showAlertMessage, setShowAlertMessage] = useState(false)
  const isProvider = isPrescriber(loggedInStaff)

  const showAddSchedule = isProvider
    ? loggedInStaff?.id.toString() === staffId
    : true

  if (!showAddSchedule) return null

  return (
    <>
      {hasPermission ? (
        <AddClinicScheduleDialog staffId={staffId}>
          <Button variant="solid" highContrast size="1">
            <Plus width={16} height={16} />
            Add Clinic Schedule
          </Button>
        </AddClinicScheduleDialog>
      ) : (
        <Button
          variant="solid"
          highContrast
          size="1"
          onClick={() => setShowAlertMessage(true)}
        >
          <Plus width={16} height={16} />
          Add Clinic Schedule
        </Button>
      )}
      <PermissionAlert
        isOpen={showAlertMessage}
        message={ClinicAlertMessages.CLICK_ADD_CLINIC_SCHEDULE}
        onClose={() => setShowAlertMessage(false)}
      />
    </>
  )
}

export { AddClinicScheduleButton }

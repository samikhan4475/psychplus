import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { PermissionAlert } from '@/ui/schedule/shared'
import { AddClinicScheduleDialog } from '../dialogs/clinic-schedule-dialog'
import { ClinicAlertMessages } from './constants'
import { PropsWithStaffId } from './types'

const AddClinicScheduleButton = ({ staffId }: PropsWithStaffId) => {
  const canAddSchedule = useHasPermission('clickAddClinicTimeTab')
  const [showAlertMessage, setShowAlertMessage] = useState(false)

  return (
    <>
      {canAddSchedule ? (
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

import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { useStore } from '@/store'
import { isPrescriber } from '@/utils'
import { AddClinicScheduleDialog } from '../dialogs/clinic-schedule-dialog'
import { PropsWithStaffId } from './types'

const AddClinicScheduleButton = ({ staffId }: PropsWithStaffId) => {
  const loggedInStaff = useStore((state) => state.staffResource)
  const hasPermission = useHasPermission('clickAddClinicTimeTab')
  const isProvider = isPrescriber(loggedInStaff)
  const canAddSchedule = isProvider
    ? loggedInStaff?.id.toString() === staffId && hasPermission
    : hasPermission

  if (!canAddSchedule) return null

  return (
    <AddClinicScheduleDialog staffId={staffId}>
      <Button variant="solid" highContrast size="1">
        <Plus width={16} height={16} />
        Add Clinic Schedule
      </Button>
    </AddClinicScheduleDialog>
  )
}

export { AddClinicScheduleButton }

import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { AddClinicScheduleDialog } from '../dialogs/clinic-schedule-dialog'

const AddClinicScheduleButton = () => {
  return (
    <AddClinicScheduleDialog>
      <Button variant="solid" highContrast size="1">
        <Plus width={16} height={16} />
        Add Clinic Schedule
      </Button>
    </AddClinicScheduleDialog>
  )
}

export { AddClinicScheduleButton }

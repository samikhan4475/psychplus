import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'

const AddClinicScheduleButton = () => {
  return (
    <Button variant="solid" highContrast size="1">
      <Plus width={16} height={16} />
      Add Clinic Schedule
    </Button>
  )
}

export { AddClinicScheduleButton }

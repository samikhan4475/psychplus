import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { AddPatientDialog } from './add-patient-dialog'

const AddPatient = () => {
  return (
    <AddPatientDialog>
      <Button size="1" variant="solid" highContrast>
        <Plus size={14} />
        No Email Add Patient
      </Button>
    </AddPatientDialog>
  )
}

export { AddPatient }

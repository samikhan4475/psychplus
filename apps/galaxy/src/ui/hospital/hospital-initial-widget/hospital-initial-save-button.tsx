import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'

const HospitalInitialSaveButton = () => {
  return (
    <Button size="1" highContrast type="submit">
      <SaveIcon height={14} width={14} strokeWidth={2} />
      Save
    </Button>
  )
}

export { HospitalInitialSaveButton }

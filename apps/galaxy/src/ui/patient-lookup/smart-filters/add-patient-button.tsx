'use client'

import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'

const AddPatientButton = () => {
  return (
    <Button size="1" variant="solid" highContrast>
      <Plus size={14} />
      No Email Add Patient
    </Button>
  )
}

export { AddPatientButton }

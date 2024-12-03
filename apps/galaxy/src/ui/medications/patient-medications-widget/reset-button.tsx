'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const ResetButton = () => {
  const form = useFormContext()

  const handleReset = () => {
    form.reset({
      writtenDate: null,
      endDate: null,
      drugName: '',
      pharmacyName: '',
      providerName: '',
      prescriptionStatus: '',
    })
  }
  return (
    <Button
      size="1"
      color="gray"
      className="text-black"
      variant="outline"
      type="button"
      onClick={handleReset}
    >
      Clear
    </Button>
  )
}

export { ResetButton }

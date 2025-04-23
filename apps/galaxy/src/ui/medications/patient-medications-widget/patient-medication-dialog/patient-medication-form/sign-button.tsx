'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PatientMedicationSchemaType } from './schema'

interface SignButtonProp {
  onSubmit: (data: PatientMedicationSchemaType) => void
}
const SignButton = ({ onSubmit }: SignButtonProp) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const prescribedStatus = form.watch('prescribedStatus')
  const handleSign = () => {
    form.setValue('isSigning', true)
    form.handleSubmit(onSubmit)
  }
  if (prescribedStatus !== 'Pharmacy') {
    return null
  }
  return (
    <Button
      size="2"
      highContrast
      onClick={handleSign}
      loading={form.formState.isSubmitting && form.watch('isSigning')}
    >
      Sign
    </Button>
  )
}

export { SignButton }

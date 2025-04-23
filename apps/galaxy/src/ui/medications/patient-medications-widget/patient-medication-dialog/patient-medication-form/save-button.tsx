'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PatientMedicationSchemaType } from './schema'

const SaveButton = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  return (
    <Button
      type="submit"
      size="2"
      highContrast
      variant="outline"
      color="gray"
      className="text-black"
      loading={form.formState.isSubmitting && !form.watch('isSigning')}
    >
      Save
    </Button>
  )
}
export { SaveButton }

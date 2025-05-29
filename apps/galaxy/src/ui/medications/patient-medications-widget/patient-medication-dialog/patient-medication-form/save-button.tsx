'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { PatientMedicationSchemaType } from './schema'

const SaveButton = () => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const [drugs, isSigning, isReviewing] = useWatch({
    control: form.control,
    name: ['drugs', 'isSigning', 'isReviewing'],
  })
  return (
    <Button
      type="submit"
      size="2"
      highContrast
      variant="outline"
      color="gray"
      className="text-black"
      loading={form.formState.isSubmitting && !isSigning && !isReviewing}
      disabled={!drugs?.length}
    >
      Save
    </Button>
  )
}
export { SaveButton }

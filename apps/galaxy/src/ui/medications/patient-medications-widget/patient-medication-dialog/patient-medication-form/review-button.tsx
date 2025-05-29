'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PrescribedStatus } from '../../types'
import { Step, StepComponentProps } from '../types'
import { PatientMedicationSchemaType } from './schema'

interface ReviewButtonProps {
  onJump?: StepComponentProps['onJump']
}
const ReviewButton = ({ onJump }: ReviewButtonProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const prescribedStatus = form.watch('prescribedStatus')

  if (prescribedStatus !== PrescribedStatus.Pharmacy) {
    return null
  }
  return (
    <Button
      size="2"
      type="button"
      highContrast
      onClick={() => {
        form.setValue('isReviewing', true)
        onJump?.(Step.Review)
      }}
      disabled={!form.watch('drugs')?.length}
      loading={form.formState.isSubmitting && form.watch('isReviewing')}
    >
      Save & Review
    </Button>
  )
}

export { ReviewButton }

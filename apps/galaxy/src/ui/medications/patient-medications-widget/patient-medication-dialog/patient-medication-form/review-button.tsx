'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { useHasPermission } from '@/hooks'
import { useStore } from '../../store'
import { PrescribedStatus } from '../../types'
import { Step, StepComponentProps } from '../types'
import { PatientMedicationSchemaType } from './schema'

interface ReviewButtonProps {
  onJump?: StepComponentProps['onJump']
}
const ReviewButton = ({ onJump }: ReviewButtonProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const prescribedStatus = form.watch('prescribedStatus')
  const { hasControlledMedication } = useStore((state) => ({
    hasControlledMedication: state.hasControlledMedication,
  }))
  const signMedication = useHasPermission('signMedication')
  const drugs = form.watch('drugs') || []
  if (prescribedStatus !== PrescribedStatus.Pharmacy || drugs.length === 0) {
    return null
  }
  let buttonText = 'Save & Review'

  if (hasControlledMedication && !signMedication) {
    buttonText = 'Save & Queue'
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
      {buttonText}
    </Button>
  )
}

export { ReviewButton }

import { zodResolver } from '@hookform/resolvers/zod'
import { dequal } from 'dequal'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import {
  therapyAssessmentPlanTabSchema,
  type TherapyAssessmentPlanTabSchemaType,
} from './therapy-assessment-plan-tab-schema'

const useTherapyAssessmentPlanTabForm = (
  initialValue: TherapyAssessmentPlanTabSchemaType,
) => {
  const form = useForm<TherapyAssessmentPlanTabSchemaType>({
    resolver: zodResolver(therapyAssessmentPlanTabSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })

  useDeepCompareEffect(() => {
    const currentValues = form.getValues()
    if (!dequal(currentValues, initialValue)) {
      form.reset(initialValue, { keepDirty: true })
    }
  }, [initialValue])
  return form
}

export { useTherapyAssessmentPlanTabForm }

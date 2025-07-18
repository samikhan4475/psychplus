import { zodResolver } from '@hookform/resolvers/zod'
import { dequal } from 'dequal'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import {
  psychiatryAssessmentPlanTabSchema,
  type PsychiatryAssessmentPlanTabSchemaType,
} from './psychiatry-assessment-plan-tab-schema'

const usePsychiatryAssessmentPlanTabForm = (
  initialValue: PsychiatryAssessmentPlanTabSchemaType,
) => {
  const form = useForm<PsychiatryAssessmentPlanTabSchemaType>({
    resolver: zodResolver(psychiatryAssessmentPlanTabSchema),
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

export { usePsychiatryAssessmentPlanTabForm }

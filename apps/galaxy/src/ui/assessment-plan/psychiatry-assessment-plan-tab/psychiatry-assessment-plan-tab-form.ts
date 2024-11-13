import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  return form
}

export { usePsychiatryAssessmentPlanTabForm }

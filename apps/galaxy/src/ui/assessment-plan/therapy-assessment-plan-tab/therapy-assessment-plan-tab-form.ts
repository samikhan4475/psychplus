import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  return form
}

export { useTherapyAssessmentPlanTabForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  assessmentPlanWidgetSchema,
  type AssessmentPlanWidgetSchemaType,
} from './assessment-plan-widget-schema'

const useAssessmentPlanWidgetForm = () => {
  const form = useForm<AssessmentPlanWidgetSchemaType>({
    resolver: zodResolver(assessmentPlanWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      assessmentPlan: '',
    },
  })

  return form
}

export { useAssessmentPlanWidgetForm }

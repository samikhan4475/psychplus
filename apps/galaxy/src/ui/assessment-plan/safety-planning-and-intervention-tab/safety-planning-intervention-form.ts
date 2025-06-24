import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  safetyPlanningInterventionSchema,
  SafetyPlanningInterventionSchemaType,
} from './safety-planning-intervention-schema'

const useSafetyPlanningInterventionForm = (
  initialValue: SafetyPlanningInterventionSchemaType,
) => {
  const form = useForm<SafetyPlanningInterventionSchemaType>({
    resolver: zodResolver(safetyPlanningInterventionSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useSafetyPlanningInterventionForm }

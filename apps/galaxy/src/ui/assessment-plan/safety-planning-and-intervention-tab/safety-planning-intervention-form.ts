import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import {
  safetyPlanningInterventionSchema,
  SafetyPlanningInterventionSchemaType,
} from './safety-planning-intervention-schema'
import { dequal } from 'dequal'

const useSafetyPlanningInterventionForm = (
  initialValue: SafetyPlanningInterventionSchemaType,
) => {
  const form = useForm<SafetyPlanningInterventionSchemaType>({
    resolver: zodResolver(safetyPlanningInterventionSchema),
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

export { useSafetyPlanningInterventionForm }

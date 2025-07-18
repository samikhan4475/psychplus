import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import {
  familyInternalMedicineAssessmentPlanTabSchema,
  type FamilyInternalMedicineAssessmentPlanTabSchemaType,
} from './family-internal-medicine-assessment-plan-tab-schema'
import { dequal } from 'dequal'

const useFamilyInternalMedicineAssessmentPlanTabForm = (
  initialValue: FamilyInternalMedicineAssessmentPlanTabSchemaType,
) => {
  const form = useForm<FamilyInternalMedicineAssessmentPlanTabSchemaType>({
    resolver: zodResolver(familyInternalMedicineAssessmentPlanTabSchema),
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

export { useFamilyInternalMedicineAssessmentPlanTabForm }

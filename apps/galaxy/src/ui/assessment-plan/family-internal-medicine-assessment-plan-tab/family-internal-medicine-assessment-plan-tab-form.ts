import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  familyInternalMedicineAssessmentPlanTabSchema,
  type FamilyInternalMedicineAssessmentPlanTabSchemaType,
} from './family-internal-medicine-assessment-plan-tab-schema'

const useFamilyInternalMedicineAssessmentPlanTabForm = (
  initialValue: FamilyInternalMedicineAssessmentPlanTabSchemaType,
) => {
  const form = useForm<FamilyInternalMedicineAssessmentPlanTabSchemaType>({
    resolver: zodResolver(familyInternalMedicineAssessmentPlanTabSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useFamilyInternalMedicineAssessmentPlanTabForm }

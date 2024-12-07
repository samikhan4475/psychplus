import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { convertDateField } from '@/ui/patient-lookup/utils'
import {
  pastMedicalHxWidgetSchema,
  type PastMedicalHxWidgetSchemaType,
} from './past-medical-hx-widget-schema'

const usePastMedicalHxWidgetForm = (
  initialValue: PastMedicalHxWidgetSchemaType,
) => {
  const form = useForm<PastMedicalHxWidgetSchemaType>({
    resolver: zodResolver(pastMedicalHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...(initialValue || {}),
      pregnantDate: convertDateField(initialValue?.pregnantDate),
    },
    values: {
      ...(initialValue || {}),
      pregnantDate: convertDateField(initialValue?.pregnantDate),
    },
  })

  return form
}

export { usePastMedicalHxWidgetForm }

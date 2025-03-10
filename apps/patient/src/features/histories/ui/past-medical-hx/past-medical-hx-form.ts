import { zodResolver } from '@hookform/resolvers/zod'
import { convertDateField } from '@psychplus-v2/utils'
import { useForm } from 'react-hook-form'
import {
  pastMedicalHxSchema,
  PastMedicalHxSchemaType,
} from './past-medical-hx-schema'

const usePastMedicalHxForm = (initialValue: PastMedicalHxSchemaType) => {
  const form = useForm<PastMedicalHxSchemaType>({
    resolver: zodResolver(pastMedicalHxSchema),
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

export { usePastMedicalHxForm }

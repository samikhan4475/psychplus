import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  pastPsychHxSchema,
  PastPsychHxSchemaType,
} from './past-psych-hx-schema'

const usePastPsychHxForm = (initialValue: PastPsychHxSchemaType) => {
  const form = useForm<PastPsychHxSchemaType>({
    resolver: zodResolver(pastPsychHxSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { usePastPsychHxForm }

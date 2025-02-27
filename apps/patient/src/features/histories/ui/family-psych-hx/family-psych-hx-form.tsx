import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  familyPsychHxSchema,
  FamilyPsychHxSchemaType,
} from './family-psych-hx-schema'

const useFamilyPsychHxForm = (initialValue: FamilyPsychHxSchemaType) => {
  const form = useForm<FamilyPsychHxSchemaType>({
    resolver: zodResolver(familyPsychHxSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useFamilyPsychHxForm }

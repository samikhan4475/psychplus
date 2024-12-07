import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  familyPsychHxWidgetSchema,
  type FamilyPsychHxWidgetSchemaType,
} from './family-psych-hx-widget-schema'

const useFamilyPsychHxWidgetForm = (
  initialValue: FamilyPsychHxWidgetSchemaType,
) => {
  const form = useForm<FamilyPsychHxWidgetSchemaType>({
    resolver: zodResolver(familyPsychHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useFamilyPsychHxWidgetForm }

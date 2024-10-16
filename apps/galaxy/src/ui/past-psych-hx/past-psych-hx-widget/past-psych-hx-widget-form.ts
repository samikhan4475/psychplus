import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  pastPsychHxWidgetSchema,
  type PastPsychHxWidgetSchemaType,
} from './past-psych-hx-widget-schema'

const usePastPsychHxWidgetForm = (
  initialValue: PastPsychHxWidgetSchemaType,
) => {
  const form = useForm<PastPsychHxWidgetSchemaType>({
    resolver: zodResolver(pastPsychHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })

  return form
}

export { usePastPsychHxWidgetForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { codesWidgetSchema, CodesWidgetSchemaType } from './codes-widget-schema'

const useCodesWidgetForm = () => {
  const form = useForm<CodesWidgetSchemaType>({
    resolver: zodResolver(codesWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      primaryCode: '',
      modifier: [],
      therapy: [],
      questionnaire: [],
      injection: [],
      interactiveComplexity: [],
      psychoanalysis: [],
      tobaccoCessation: [],
      alcoholSubstanceUse: [],
      afterHours: [],
    },
  })

  return form
}

export { useCodesWidgetForm }

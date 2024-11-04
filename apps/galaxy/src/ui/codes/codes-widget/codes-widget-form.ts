import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { codesWidgetSchema, CodesWidgetSchemaType } from './codes-widget-schema'

const useCodesWidgetForm = () => {
  const form = useForm<CodesWidgetSchemaType>({
    resolver: zodResolver(codesWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      primaryCode: [],
      modifierCode: ['25', '59', '95'],
      addOns: ['96127', '96127', '96372', '90836', '99406', '99408', '99050'],
    },
  })

  return form
}

export { useCodesWidgetForm }

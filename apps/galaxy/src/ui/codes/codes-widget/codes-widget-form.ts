import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { codesWidgetSchema, CodesWidgetSchemaType } from './codes-widget-schema'

const useCodesWidgetForm = (intialValues?: CodesWidgetSchemaType) => {
  const form = useForm<CodesWidgetSchemaType>({
    resolver: zodResolver(codesWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: intialValues,
    values: intialValues,
  })

  return form
}
export { useCodesWidgetForm }

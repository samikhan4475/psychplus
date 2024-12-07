import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { mseWidgetSchema, type MseWidgetSchemaType } from './mse-widget-schema'

const useMseWidgetForm = (initialValue: MseWidgetSchemaType) => {
  const form = useForm<MseWidgetSchemaType>({
    resolver: zodResolver(mseWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useMseWidgetForm }

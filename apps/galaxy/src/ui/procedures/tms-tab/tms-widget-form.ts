import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { tmsWidgetSchema, TmsWidgetSchemaType } from './tms-widget-schema'

const useTmsWidgetForm = (initialValue: TmsWidgetSchemaType) => {
  const form = useForm<TmsWidgetSchemaType>({
    resolver: zodResolver(tmsWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })

  return form
}

export { useTmsWidgetForm }

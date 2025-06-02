import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { udsWidgetSchema, UdsWidgetSchemaType } from './uds-widget-schema'

const useUdsWidgetForm = (initialValue: UdsWidgetSchemaType) => {
  const form = useForm<UdsWidgetSchemaType>({
    reValidateMode: 'onChange',
    resolver: zodResolver(udsWidgetSchema),
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useUdsWidgetForm }

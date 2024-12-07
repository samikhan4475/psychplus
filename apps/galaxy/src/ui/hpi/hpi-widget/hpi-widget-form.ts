import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { hpiWidgetSchema, type HpiWidgetSchemaType } from './hpi-widget-schema'

const useHpiWidgetForm = (initialValue: HpiWidgetSchemaType) => {
  const form = useForm<HpiWidgetSchemaType>({
    resolver: zodResolver(hpiWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useHpiWidgetForm }

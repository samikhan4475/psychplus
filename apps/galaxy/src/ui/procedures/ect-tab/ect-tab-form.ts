import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ectWidgetSchema, type EctWidgetSchemaType } from './ect-tab-schema'

const useEctWidgetForm = (initialValue: EctWidgetSchemaType) => {
  const form = useForm<EctWidgetSchemaType>({
    resolver: zodResolver(ectWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useEctWidgetForm }

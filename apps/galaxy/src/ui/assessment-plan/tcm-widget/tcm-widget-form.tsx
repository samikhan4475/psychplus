import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TcmWidgetSchemaType, tcmWidgetSchema } from './tcm-widget-schema'
import { convertDateField } from '@/ui/patient-lookup/utils'

const useTcmWidgetForm = (
  initialValue: TcmWidgetSchemaType,
) => {
  const form = useForm<TcmWidgetSchemaType>({
    resolver: zodResolver(tcmWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...initialValue,
      dcDate: convertDateField(initialValue?.dcDate),
      tcmDate: convertDateField(initialValue?.tcmDate),
    },
  })
  return form
}

export { useTcmWidgetForm }

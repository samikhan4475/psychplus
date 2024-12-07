import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { convertDateField } from '@/ui/patient-lookup/utils'
import {
  addOnWidgetSchema,
  type AddOnWidgetSchemaType,
} from './add-on-widget-schema'

const useAddOnWidgetForm = (initialValue: AddOnWidgetSchemaType) => {
  const form = useForm<AddOnWidgetSchemaType>({
    resolver: zodResolver(addOnWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...initialValue,
      expirationDate: convertDateField(initialValue?.expirationDate),
    },
    values: {
      ...initialValue,
      expirationDate: convertDateField(initialValue?.expirationDate),
    },
  })

  return form
}

export { useAddOnWidgetForm }

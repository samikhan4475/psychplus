import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  hospitalInitialWidgetSchema,
  HospitalInitialWidgetSchemaType,
} from './hospital-initial-widget-schema'

const useHospitalInitialWidgetForm = (
  initialValue: HospitalInitialWidgetSchemaType,
) => {
  const form = useForm<HospitalInitialWidgetSchemaType>({
    resolver: zodResolver(hospitalInitialWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })

  return form
}

export { useHospitalInitialWidgetForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { hospitalDischargeWidgetSchema, HospitalDischargeWidgetSchemaType } from './hospital-discharge-widget-schema'

const useHospitalDischargeWidgetForm = (
  initialValue: HospitalDischargeWidgetSchemaType,
) => {
  const form = useForm<HospitalDischargeWidgetSchemaType>({
    resolver: zodResolver(hospitalDischargeWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })
  return form
}

export { useHospitalDischargeWidgetForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { transformIn, transformOut } from '../data'
import { LabsAndOrdersForm } from './labs-and-orders-form'
import { HospitalWidgetSchema, HospitalWidgetSchemaType } from './schema'

interface LabsOrderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const LabsAndOrderTab = ({ patientId, data }: LabsOrderProps) => {
  const initialValue = transformIn(data ?? [])
  const form = useForm<HospitalWidgetSchemaType>({
    resolver: zodResolver(HospitalWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
  })

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="Hospital_Labs_Order"
        getData={transformOut(patientId)}
        title=""
      >
        <LabsAndOrdersForm />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { LabsAndOrderTab }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  physicalExamWidgetSchema,
  type PhysicalExamWidgetSchemaType,
} from './physical-exam-widget-schema'

const usePhysicalExamWidgetForm = (
  initialValue: PhysicalExamWidgetSchemaType,
) => {
  const form = useForm<PhysicalExamWidgetSchemaType>({
    resolver: zodResolver(physicalExamWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { usePhysicalExamWidgetForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createRosWidgetSchema,
  RosWidgetSchemaType,
} from './review-of-systems-schema'

const useRosForm = (initialValue: RosWidgetSchemaType) => {
  const form = useForm<RosWidgetSchemaType>({
    resolver: zodResolver(createRosWidgetSchema()),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useRosForm }

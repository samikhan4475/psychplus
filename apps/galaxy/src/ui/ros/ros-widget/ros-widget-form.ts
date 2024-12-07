import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { rosWidgetSchema, type RosWidgetSchemaType } from './ros-widget-schema'

const useRosWidgetForm = (initialValue: RosWidgetSchemaType) => {
  const form = useForm<RosWidgetSchemaType>({
    resolver: zodResolver(rosWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useRosWidgetForm }

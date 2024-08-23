import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { rosWidgetSchema, type RosWidgetSchemaType } from './ros-widget-schema'

const useRosWidgetForm = () => {
  const form = useForm<RosWidgetSchemaType>({
    resolver: zodResolver(rosWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      constitutional: [],
      entMouth: [],
      eyes: [],
      cardiovascular: [],
      respiratory: [],
      gastrointestinal: [],
      genitourinary: [],
      skin: [],
      musculoskeletal: [],
      neuro: [],
    },
  })

  return form
}

export { useRosWidgetForm }

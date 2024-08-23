import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  interactiveComplexityWidgetSchema,
  type InteractiveComplexityWidgetSchemaType,
} from './interactive-complexity-widget-schema'

const useInteractiveComplexityWidgetForm = () => {
  const form = useForm<InteractiveComplexityWidgetSchemaType>({
    resolver: zodResolver(interactiveComplexityWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      maladaptiveCommunication: false,
      caregiverEmotions: false,
      sentinelEvent: false,
      languageBarrier: false,
    },
  })

  return form
}

export { useInteractiveComplexityWidgetForm }

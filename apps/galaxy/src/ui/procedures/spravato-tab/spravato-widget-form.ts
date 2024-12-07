import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  spravatoWidgetSchema,
  SpravatoWidgetSchemaType,
} from './spravato-widget-schema'

const useSpravatoWidgetForm = (initialValues: SpravatoWidgetSchemaType) => {
  const form = useForm<SpravatoWidgetSchemaType>({
    resolver: zodResolver(spravatoWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValues,
    values: initialValues,
  })

  return form
}

export { useSpravatoWidgetForm }

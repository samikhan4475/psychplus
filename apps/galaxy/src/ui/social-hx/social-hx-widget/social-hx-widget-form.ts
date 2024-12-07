import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  socialHxWidgetSchema,
  type SocialHxWidgetSchemaType,
} from './social-hx-widget-schema'

const useSocialHxWidgetForm = (initialValue: SocialHxWidgetSchemaType) => {
  const form = useForm<SocialHxWidgetSchemaType>({
    resolver: zodResolver(socialHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useSocialHxWidgetForm }

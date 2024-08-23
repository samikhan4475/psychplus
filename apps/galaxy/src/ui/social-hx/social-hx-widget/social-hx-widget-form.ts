import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  socialHxWidgetSchema,
  type SocialHxWidgetSchemaType,
} from './social-hx-widget-schema'

const useSocialHxWidgetForm = () => {
  const form = useForm<SocialHxWidgetSchemaType>({
    resolver: zodResolver(socialHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      relationshipStatus: undefined,
      professionalEducation: undefined,
      employed: undefined,
      legalHistory: undefined,
      living: undefined,
      traumaHx: undefined,
    },
  })

  return form
}

export { useSocialHxWidgetForm }

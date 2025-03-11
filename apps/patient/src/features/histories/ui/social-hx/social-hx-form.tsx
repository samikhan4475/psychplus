import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  socialHxSchema,
  SocialHxSchemaType,
} from './social-hx-schema'

const useSocialHxForm = (initialValue: SocialHxSchemaType) => {
  const form = useForm<SocialHxSchemaType>({
    resolver: zodResolver(socialHxSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useSocialHxForm }

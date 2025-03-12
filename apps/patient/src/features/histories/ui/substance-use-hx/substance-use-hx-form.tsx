import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  substanceUseSchema,
  SubstanceUseSchemaType,
} from './substance-use-hx-schema'

const useSubstanceUseHxForm = (initialValue: SubstanceUseSchemaType) => {
  const form = useForm<SubstanceUseSchemaType>({
    resolver: zodResolver(substanceUseSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useSubstanceUseHxForm }

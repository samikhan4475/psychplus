import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  substanceUseHxWidgetSchema,
  type SubstanceUseHxWidgetSchemaType,
} from './substance-use-hx-schema'

const useSubstanceHxWidgetForm = (
  initialValue: SubstanceUseHxWidgetSchemaType,
) => {
  const form = useForm<SubstanceUseHxWidgetSchemaType>({
    resolver: zodResolver(substanceUseHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })

  return form
}

export { useSubstanceHxWidgetForm }

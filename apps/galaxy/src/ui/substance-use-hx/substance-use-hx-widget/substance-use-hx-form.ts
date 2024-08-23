import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  substanceUseHxWidgetSchema,
  type SubstanceUseHxWidgetSchemaType,
} from './substance-use-hx-schema'

const useSubstanceHxWidgetForm = () => {
  const form = useForm<SubstanceUseHxWidgetSchemaType>({
    resolver: zodResolver(substanceUseHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      tobacco: undefined,
      tobaccoChewSmoke: undefined,
      tobaccoStartDate: '',
      tobaccoEndDate: '',
      tobaccoStatus: undefined,
      smokingCessationOption: undefined,
      counselingOption: undefined,
      smokingCessationDiscussionDuration: undefined,
      alcohol: undefined,
      drugs: undefined,
      opioids: undefined,
      opioidsDetails: undefined,
      sedative: undefined,
      sedativeDetails: undefined,
      cocaine: undefined,
      cocaineDetails: undefined,
      amphetamine: undefined,
      amphetamineDetails: undefined,
      pcp: undefined,
      pcpDetails: undefined,
      inhalants: undefined,
      inhalantsDetails: undefined,
      questionnaire: undefined,
    },
  })

  return form
}

export { useSubstanceHxWidgetForm }

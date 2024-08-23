import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  familyPsychHxWidgetSchema,
  type FamilyPsychHxWidgetSchemaType,
} from './family-psych-hx-widget-schema'

const useFamilyPsychHxWidgetForm = () => {
  const form = useForm<FamilyPsychHxWidgetSchemaType>({
    resolver: zodResolver(familyPsychHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      completedSuicide: false,
      completedSuicideRelation: '',
      anxiety: false,
      anxietyRelation: '',
      depression: false,
      depressionRelation: '',
      ocd: false,
      ocdRelation: '',
      bipolarDisorder: false,
      bipolarDisorderRelation: '',
      schizophrenia: false,
      schizophreniaRelation: '',
      alcoholUseDisorder: false,
      alcoholUseDisorderRelation: '',
      dementia: false,
      dementiaRelation: '',
    },
  })

  return form
}

export { useFamilyPsychHxWidgetForm }

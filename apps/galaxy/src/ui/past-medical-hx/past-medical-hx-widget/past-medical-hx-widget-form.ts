import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  pastMedicalHxWidgetSchema,
  type PastMedicalHxWidgetSchemaType,
} from './past-medical-hx-widget-schema'

const usePastMedicalHxWidgetForm = () => {
  const form = useForm<PastMedicalHxWidgetSchemaType>({
    resolver: zodResolver(pastMedicalHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      depression: undefined,
      depressionAge: undefined,
      anxiety: undefined,
      anxietyAge: undefined,
      schizophrenia: undefined,
      schizophreniaAge: undefined,
      bipolar: undefined,
      bipolarAge: undefined,
      disorder: undefined,
      disorderAge: undefined,
      obsessiveThinking: undefined,
      obsessiveThinkingAge: undefined,
      compulsiveBehavior: undefined,
      compulsiveBehaviorAge: undefined,
      adhd: undefined,
      adhdAge: undefined,
      autism: undefined,
      autismAge: undefined,
      eatingDisorder: undefined,
      eatingDisorderAge: undefined,
      exposureToTrauma: undefined,
      exposureToTraumaAge: undefined,
      cuttingSelfHarmBehavior: undefined,
      cuttingSelfHarmBehaviorAge: undefined,
      problemsWithSleep: undefined,
      problemsWithSleepAge: undefined,
      dementia: undefined,
      dementiaAge: undefined,
      personalityDisorder: undefined,
      personalityDisorderAge: undefined,
      intellectualDisability: undefined,
      intellectualDisabilityAge: undefined,
      other: undefined,
    },
  })

  return form
}

export { usePastMedicalHxWidgetForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  pastPsychHxWidgetSchema,
  type PastPsychHxWidgetSchemaType,
} from './past-psych-hx-widget-schema'

const usePastPsychHxWidgetForm = () => {
  const form = useForm<PastPsychHxWidgetSchemaType>({
    resolver: zodResolver(pastPsychHxWidgetSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      psychHospitalizations: undefined,
      suicideAttempts: undefined,
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

export { usePastPsychHxWidgetForm }

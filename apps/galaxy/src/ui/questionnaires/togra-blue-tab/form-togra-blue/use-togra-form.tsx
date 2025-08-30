import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { SchemaType, tograBlueSchema } from '../schema'
import { FormValues, ScoreType } from '../types'
import { calculateTotalScore, totalAttemptedQuestions } from '../utils'

const useQuestionnaireFormTograBlue = (
  initialValues: SchemaType,
): UseFormReturn<FormValues> & {
  totalScore: ScoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(tograBlueSchema),
    defaultValues: {
      ...initialValues,
      TograBlueSubmittedDate: new Date().toISOString(),
    },
  })
  const {
    TograBlueSubmittedDate,
    TograBlueCompletedDuration,
    TograBlueStartedAt,
    ...restData
  } = initialValues

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    totalAttemptedQuestions(restData as SchemaType),
  )

  const [totalScore, setTotalScore] = useState<ScoreType>(
    calculateTotalScore(initialValues as SchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as SchemaType)
      const {
        TograBlueSubmittedDate,
        TograBlueCompletedDuration,
        TograBlueStartedAt,
        ...rest
      } = values
      const filledQuestions = totalAttemptedQuestions(rest as SchemaType)

      setTotalScore(scores)
      setTotalFilledQuestions(filledQuestions)
    })

    return () => subscription.unsubscribe()
  }, [form])

  return {
    ...form,
    totalScore,
    totalFilledQuestions,
  }
}

export { useQuestionnaireFormTograBlue }

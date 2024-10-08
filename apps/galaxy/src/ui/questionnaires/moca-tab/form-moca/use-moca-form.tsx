import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { calculateTotalFilledQuestions } from '../../shared'
import { mocaSchema, MocaSchemaType } from '../moca-schema'
import { FormValues, scoreType } from '../types'
import { calculateTotalScore } from '../utils'

const useQuestionnaireFormMoca = (
  initialValues: MocaSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(mocaSchema),
    defaultValues: initialValues,
  })

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    calculateTotalFilledQuestions(initialValues as MocaSchemaType),
  )

  const [totalScore, setTotalScore] = useState<scoreType>(
    calculateTotalScore(initialValues as MocaSchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as MocaSchemaType)
      const filledQuestions = calculateTotalFilledQuestions(
        values as MocaSchemaType,
      )

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

export { useQuestionnaireFormMoca }

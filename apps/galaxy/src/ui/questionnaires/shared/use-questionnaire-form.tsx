import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  createQuestionnaireSchema,
  QuestionnaireSchemaType,
} from './questionnaires-schema'

const calculateTotalScore = (data: any): number => {
  let totalScore = 0
  Object.keys(data).forEach((key) => {
    const value = Number(data[key]) || 0
    totalScore += value
  })
  return totalScore
}

const useQuestionnaireForm = (
  initialValues: QuestionnaireSchemaType,
  totalQuestions: number,
): UseFormReturn<QuestionnaireSchemaType> & { totalScore: number } => {
  const schema = createQuestionnaireSchema(totalQuestions)

  const form = useForm<QuestionnaireSchemaType>({
    resolver: zodResolver(schema),

    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<number>(0)

  useEffect(() => {
    const scores = calculateTotalScore(initialValues)

    setTotalScore(scores)
  }, [])

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values)
      setTotalScore(scores)
    })

    return () => subscription.unsubscribe()
  }, [form])

  return {
    ...form,

    totalScore,
  }
}

export { useQuestionnaireForm }

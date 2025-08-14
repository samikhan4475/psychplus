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

const calculateTotalFilledQuestions = (data: any): number => {
  return Object.values(data).filter(
    (value) => value !== '' && value !== null && value !== undefined,
  ).length
}

const useQuestionnaireForm = (
  initialValues: QuestionnaireSchemaType,
  totalQuestions: number,
  extensiveScoreCalculation?: (score: number) => number,
): UseFormReturn<QuestionnaireSchemaType> & {
  totalScore: number
  totalFilledQuestions: number
} => {
  const schema = createQuestionnaireSchema(totalQuestions)

  const form = useForm<QuestionnaireSchemaType>({
    resolver: zodResolver(schema),

    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<number>(0)
  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(0)

  useEffect(() => {
    const scores = calculateTotalScore(initialValues)
    const filledQuestions = calculateTotalFilledQuestions(initialValues)
    const finalScore = extensiveScoreCalculation
      ? extensiveScoreCalculation(scores)
      : scores

    setTotalScore(finalScore)
    setTotalFilledQuestions(filledQuestions)
  }, [])

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values)
      const filledQuestions = calculateTotalFilledQuestions(values)
      const finalScore = extensiveScoreCalculation
        ? extensiveScoreCalculation(scores)
        : scores

      setTotalScore(finalScore)
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

export { useQuestionnaireForm, calculateTotalFilledQuestions }

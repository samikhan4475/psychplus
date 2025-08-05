import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { calculateTotalFilledQuestions } from '../../shared'
import { adultASRSSchema, AdultASRSSchemaType } from '../adult-asrs-schema'

export type FormValues = z.infer<typeof adultASRSSchema>

type scoreType = { [key: string]: number }

const calculateTotalScore = (data: AdultASRSSchemaType): scoreType => {
  let PartA = 0
  let PartB = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof AdultASRSSchemaType]) || 0
    if (key.includes('PartA')) {
      PartA += value
    }
    if (key.includes('PartB')) {
      PartB += value
    }
  })

  return { PartA, PartB }
}

const useQuestionnairesFormAdultAsrs = (
  initialValues: AdultASRSSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(adultASRSSchema),
    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<scoreType>({
    PartA: 0,
    PartB: 0,
  })

  useEffect(() => {
    const scores = calculateTotalScore(initialValues as AdultASRSSchemaType)
    setTotalScore(scores)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    calculateTotalFilledQuestions(initialValues as AdultASRSSchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as AdultASRSSchemaType)

      const filledQuestions = calculateTotalFilledQuestions(
        values as AdultASRSSchemaType,
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

export { useQuestionnairesFormAdultAsrs }

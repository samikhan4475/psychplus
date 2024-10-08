import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { calculateTotalFilledQuestions } from '../../shared'
import { snapIvSchema, SnapIvSchemaType } from '../snap-iv-schema'

export type FormValues = z.infer<typeof snapIvSchema>

type scoreType = { [key: string]: number }

const calculateTotalScore = (data: SnapIvSchemaType): scoreType => {
  let Inattention = 0
  let Hyperactivity = 0
  let Opposition = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof SnapIvSchemaType]) || 0
    if (key.includes('Inattention')) {
      Inattention += value
    }
    if (key.includes('Hyperactivity')) {
      Hyperactivity += value
    }
    if (key.includes('Opposition')) {
      Opposition += value
    }
  })

  return { Hyperactivity, Inattention, Opposition }
}

const useQuestionnaireFormSnapIv = (
  initialValues: SnapIvSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(snapIvSchema),
    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<scoreType>({
    Hyperactivity: 0,
    Inattention: 0,
    Opposition: 0,
  })

  useEffect(() => {
    const scores = calculateTotalScore(initialValues as SnapIvSchemaType)
    setTotalScore(scores)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    calculateTotalFilledQuestions(initialValues as SnapIvSchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as SnapIvSchemaType)

      const filledQuestions = calculateTotalFilledQuestions(
        values as SnapIvSchemaType,
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

export { useQuestionnaireFormSnapIv }

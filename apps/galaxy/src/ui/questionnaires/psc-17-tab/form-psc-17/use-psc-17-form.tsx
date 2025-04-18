import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { calculateTotalFilledQuestions } from '../../shared'
import { psc17Schema, Psc17SchemaType } from '../psc-17-schema'

export type FormValues = z.infer<typeof psc17Schema>

type scoreType = { [key: string]: number }

const calculateTotalScore = (data: Psc17SchemaType): scoreType => {
  let Attention = 0
  let Internalizing = 0
  let Externalizing = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof Psc17SchemaType]) || 0
    if (key.includes('Attention')) {
      Attention += value
    }
    if (key.includes('Internalizing')) {
      Internalizing += value
    }
    if (key.includes('Externalizing')) {
      Externalizing += value
    }
  })

  return { Attention, Internalizing, Externalizing }
}

const useQuestionnaireFormPsc17 = (
  initialValues: Psc17SchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(psc17Schema),
    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<scoreType>({
    Attention: 0,
    Internalizing: 0,
    Externalizing: 0,
  })

  useEffect(() => {
    const scores = calculateTotalScore(initialValues as Psc17SchemaType)
    setTotalScore(scores)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    calculateTotalFilledQuestions(initialValues as Psc17SchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as Psc17SchemaType)

      const filledQuestions = calculateTotalFilledQuestions(
        values as Psc17SchemaType,
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

export { useQuestionnaireFormPsc17 }

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { aimsSchema, AimsSchemaType } from '../aims-schema'

export type FormValues = z.infer<typeof aimsSchema>

type scoreType = { [key: string]: number }

enum ScoreCategories {
  FacialAndOralMovements = 'FacialAndOralMovements',
  ExtremityMovements = 'ExtremityMovements',
  TrunkMovements = 'TrunkMovements',
  GlobalJudgments = 'GlobalJudgments',
}

const calculateTotalScore = (data: AimsSchemaType): scoreType => {
  let FacialAndOralMovements = 0
  let ExtremityMovements = 0
  let TrunkMovements = 0
  let GlobalJudgments = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof AimsSchemaType]) || 0
    if (key.includes(ScoreCategories.FacialAndOralMovements)) {
      FacialAndOralMovements += value
    }
    if (key.includes(ScoreCategories.ExtremityMovements)) {
      ExtremityMovements += value
    }
    if (key.includes(ScoreCategories.TrunkMovements)) {
      TrunkMovements += value
    }
    if (key.includes(ScoreCategories.GlobalJudgments)) {
      GlobalJudgments += value
    }
  })

  return {
    FacialAndOralMovements,
    ExtremityMovements,
    TrunkMovements,
    GlobalJudgments,
  }
}

const useQuestionnaireFormAims = (
  initialValues: AimsSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(aimsSchema),
    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<scoreType>(
    calculateTotalScore(initialValues as AimsSchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as AimsSchemaType)
      setTotalScore(scores)
    })

    return () => subscription.unsubscribe()
  }, [form])

  return {
    ...form,
    totalScore,
  }
}

export { useQuestionnaireFormAims }

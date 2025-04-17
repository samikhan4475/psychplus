import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { calculateTotalFilledQuestions } from '../../shared'
import { cssrsSchema, CssrsSchemaType } from '../c-ssrs-schema'

export type FormValues = z.infer<typeof cssrsSchema>

type scoreType = { [key: string]: number }

enum ScoreCategories {
  suicidalIdeation = 'suicidalIdeation',
  suicidalBehaviors = 'suicidalBehaviors',
}

const calculateTotalScore = (data: CssrsSchemaType): scoreType => {
  let suicidalIdeation = 0
  let suicidalBehaviors = 0

  Object.keys(data).forEach((key) => {
    const value = Number(data[key as keyof CssrsSchemaType]) || 0

    if (key.includes(ScoreCategories.suicidalIdeation)) {
      suicidalIdeation = Math.max(suicidalIdeation, value)
    }
    if (key.includes(ScoreCategories.suicidalBehaviors)) {
      suicidalBehaviors = Math.max(suicidalBehaviors, value)
    }
  })

  return {
    suicidalIdeation,
    suicidalBehaviors,
  }
}

const useQuestionnaireFormCssrs = (
  initialValues: CssrsSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(cssrsSchema),
    defaultValues: initialValues,
  })

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(
    calculateTotalFilledQuestions(initialValues),
  )

  const [totalScore, setTotalScore] = useState<scoreType>(
    calculateTotalScore(initialValues),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as CssrsSchemaType)
      const filledQuestions = calculateTotalFilledQuestions(values)

      setTotalScore(scores)
      setTotalFilledQuestions(filledQuestions)
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return {
    ...form,
    totalScore,
    totalFilledQuestions,
  }
}

export { useQuestionnaireFormCssrs }

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'

interface Option {
  label: string
  value: number
}

interface QuestionData {
  question: string
  selectedValue: number
  options: Option[]
}

const schema = z.object({
  responses: z
    .array(
      z.object({
        question: z.string(),
        selectedValue: z.number(),
      }),
    )
    .optional(),
})

export type FormValues = z.infer<typeof schema>

const useQuestionnaireForm = (
  data: QuestionData[],
): UseFormReturn<FormValues> & { totalScore: number } => {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      responses: data.map((item) => ({
        question: item.question,
        selectedValue: item.selectedValue,
      })),
    },
  })

  const [totalScore, setTotalScore] = useState<number>(() =>
    data.reduce((acc, item) => acc + item.selectedValue, 0),
  )

  useEffect(() => {
    const subscription = formMethods.watch((values) => {
      const score = (values.responses || []).reduce(
        (acc, response) => acc + (response?.selectedValue || 0),
        0,
      )
      setTotalScore(score)
    })

    return () => subscription.unsubscribe()
  }, [formMethods.watch])

  return {
    ...formMethods,
    totalScore,
  }
}

export { useQuestionnaireForm }

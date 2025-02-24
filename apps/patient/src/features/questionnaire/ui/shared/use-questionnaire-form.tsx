import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  createQuestionnaireSchema,
  QuestionnaireSchemaType,
} from './questionnaire-schema'

const calculateTotalFilledQuestions = (data: any): number => {
  return Object.values(data).filter(
    (value) => value !== '' && value !== null && value !== undefined,
  ).length
}

const useQuestionnaireForm = (
  initialValues: QuestionnaireSchemaType,
  totalQuestions: number,
): UseFormReturn<QuestionnaireSchemaType> & {
  totalFilledQuestions: number
  isCompleted: boolean
} => {
  const schema = createQuestionnaireSchema(totalQuestions)

  const form = useForm<QuestionnaireSchemaType>({
    resolver: zodResolver(schema),

    defaultValues: initialValues,
  })

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(0)
  const [isCompleted, setIsCompleted] = useState<boolean>(
    totalQuestions === totalFilledQuestions,
  )

  useEffect(() => {
    const filledQuestions = calculateTotalFilledQuestions(initialValues)
    setIsCompleted(filledQuestions === totalQuestions)
    setTotalFilledQuestions(filledQuestions)
  }, [])

  useEffect(() => {
    const subscription = form.watch((values) => {
      const filledQuestions = calculateTotalFilledQuestions(values)

      setTotalFilledQuestions(filledQuestions)
    })

    return () => subscription.unsubscribe()
  }, [form])

  return {
    ...form,
    totalFilledQuestions,
    isCompleted,
  }
}

export { useQuestionnaireForm, calculateTotalFilledQuestions }

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  createQuestionnaireSchema,
  QuestionnaireSchemaType,
} from './questionnaires-schema'

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
} => {
  const schema = createQuestionnaireSchema(totalQuestions)

  const form = useForm<QuestionnaireSchemaType>({
    resolver: zodResolver(schema),

    defaultValues: initialValues,
  })

  const [totalFilledQuestions, setTotalFilledQuestions] = useState<number>(0)

  useEffect(() => {
    const filledQuestions = calculateTotalFilledQuestions(initialValues)

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
  }
}

export { useQuestionnaireForm, calculateTotalFilledQuestions }

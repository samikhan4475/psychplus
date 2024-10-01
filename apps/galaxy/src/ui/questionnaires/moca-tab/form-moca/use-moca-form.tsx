import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { mocaSchema, MocaSchemaType } from '../moca-schema'
import { FormValues, scoreType } from '../types'
import { calculateTotalScore } from '../utils'

const useQuestionnaireFormMoca = (
  initialValues: MocaSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: scoreType
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(mocaSchema),
    defaultValues: initialValues,
  })

  const [totalScore, setTotalScore] = useState<scoreType>(
    calculateTotalScore(initialValues as MocaSchemaType),
  )

  useEffect(() => {
    const subscription = form.watch((values) => {
      const scores = calculateTotalScore(values as MocaSchemaType)
      setTotalScore(scores)
    })

    return () => subscription.unsubscribe()
  }, [form])

  return {
    ...form,
    totalScore,
  }
}

export { useQuestionnaireFormMoca }

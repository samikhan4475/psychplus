import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { calculateTotalFilledQuestions } from '../../shared'
import { VadprsScoreType } from '../types'
import { calculateTotalScore } from '../utils'
import { VadprsSchema, VadprsSchemaType } from '../vadprs-schema'

export type FormValues = z.infer<typeof VadprsSchema>

const useQuestionnaireFormVadprs = (
  initialValues: VadprsSchemaType,
): UseFormReturn<FormValues> & {
  totalScore: VadprsScoreType
  totalFilledQuestions: number
} => {
  const form = useForm<FormValues>({
    resolver: zodResolver(VadprsSchema),
    defaultValues: initialValues,
  })

  const formValues = form.watch()

  const totalScore = useMemo(() => {
    return calculateTotalScore(formValues as VadprsSchemaType)
  }, [formValues])

  const totalFilledQuestions = useMemo(() => {
    return calculateTotalFilledQuestions(formValues)
  }, [formValues])

  return {
    ...form,
    totalScore,
    totalFilledQuestions,
  }
}

export { useQuestionnaireFormVadprs }

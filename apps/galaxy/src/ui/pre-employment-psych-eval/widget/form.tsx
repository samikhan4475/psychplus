'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { dequal } from 'dequal'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import { preEmployementEvaluationSchema, type SchemaType } from './schema'

const usePreEmploymentPsychEvalForm = (initialValue: SchemaType) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(preEmployementEvaluationSchema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',
    defaultValues: initialValue,
  })

  useDeepCompareEffect(() => {
    const currentValues = form.getValues()
    if (!dequal(currentValues, initialValue)) {
      form.reset(initialValue, { keepDirty: true })
    }
  }, [initialValue])
  return form
}

export { usePreEmploymentPsychEvalForm }

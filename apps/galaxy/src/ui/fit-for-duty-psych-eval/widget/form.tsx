import { zodResolver } from '@hookform/resolvers/zod'
import { dequal } from 'dequal'
import { useForm } from 'react-hook-form'
import { useDeepCompareEffect } from '@/hooks'
import { fitForDutyEvaluationSchema, type SchemaType } from './schema'

const useFitForDutyPsychEvalForm = (initialValue: SchemaType) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(fitForDutyEvaluationSchema),
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

export { useFitForDutyPsychEvalForm }

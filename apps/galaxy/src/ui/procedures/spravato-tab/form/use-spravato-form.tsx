import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'
import { spravatoSchema, SpravatoSchemaType } from '../spravato-schema'

export type FormValues = z.infer<typeof spravatoSchema>

const useSpravatoForm = (
  initialValues: SpravatoSchemaType,
): UseFormReturn<FormValues> => {
  const form = useForm<FormValues>({
    resolver: zodResolver(spravatoSchema),
    defaultValues: initialValues,
  })

  return {
    ...form,
  }
}

export { useSpravatoForm }

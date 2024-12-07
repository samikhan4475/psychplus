import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TherapySchema, TherapySchemaType } from './therapy-schema'

const useTherapyForm = (initialValue: TherapySchemaType) => {
  const form = useForm<TherapySchemaType>({
    resolver: zodResolver(TherapySchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useTherapyForm }

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FamilyTherapySchema, FamilyTherapySchemaType } from './therapy-schema'

const useTherapyForm = (initialValue: FamilyTherapySchemaType) => {
  const form = useForm<FamilyTherapySchemaType>({
    resolver: zodResolver(FamilyTherapySchema),
    reValidateMode: 'onChange',
    defaultValues: initialValue,
    values: initialValue,
  })
  return form
}

export { useTherapyForm }

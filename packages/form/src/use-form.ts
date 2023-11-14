import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm as useFormBase,
  type FieldValues,
  type Path,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'

interface UseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> {
  schema: Z
}

const useForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) =>
  useFormBase({
    ...formProps,
    resolver: zodResolver(schema),
  })

const registerWithoutRef = <T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
) => {
  const { ref, ...rest } = form.register(name)
  return rest
}

export { useForm, registerWithoutRef }

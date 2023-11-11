import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useFormBase, UseFormProps } from 'react-hook-form'
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

export { useForm }

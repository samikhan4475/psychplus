import { type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Button } from '@psychplus/ui/button'

interface FormSubmitButtonProps<T extends FieldValues> {
  form: UseFormReturn<T>
}
const FormSubmitButton = <T extends FieldValues>({
  form,
  children,
}: React.PropsWithChildren<FormSubmitButtonProps<T>>) => {
  return (
    <Button type="submit" disabled={form.formState.isSubmitting}>
      {children}
    </Button>
  )
}

export { FormSubmitButton }
